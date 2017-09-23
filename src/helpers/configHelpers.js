import React from 'react';
import Immutable from 'immutable';
import mergeWith from 'lodash/mergeWith';
import get from 'lodash/get';
import set from 'lodash/set';
import warning from 'warning';

import {
  ERR_MISSING_VOCABULARY,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_UNKNOWN_SUBRESOURCE,
  ERR_INVALID_CSID,
  ERR_INVALID_RELATED_TYPE,
} from '../constants/errorCodes';

import {
  DATA_TYPE_MAP,
  DATA_TYPE_STRING,
} from '../constants/dataTypes';

import {
  NS_PREFIX,
} from './recordDataHelpers';

import {
  isCsid,
  isUrnCsid,
} from './csidHelpers';

const onlyDigitsPattern = /^\d+$/;
const isNotNumeric = string => !onlyDigitsPattern.test(string);

export const configKey = '[config]';

export const dataPathToFieldDescriptorPath = dataPath =>
  dataPath.filter(isNotNumeric);

export const evaluatePlugin = (plugin, pluginContext) => {
  const pluginType = typeof plugin;

  const isValidType = plugin
    && (pluginType === 'function' || (pluginType === 'object' && !Array.isArray(plugin)));

  warning(isValidType, 'A plugin must be an object or a function.');

  if (!isValidType) {
    return {};
  }

  return (pluginType === 'object') ? plugin : plugin(pluginContext);
};

export const applyPlugin = (targetConfig, plugin, pluginContext) => {
  const pluginConfigContribution = evaluatePlugin(plugin, pluginContext);

  /* Gotta do this mutual recursion */
  /* eslint-disable no-use-before-define */
  return mergeConfig(targetConfig, pluginConfigContribution, pluginContext);
  /* eslint-enable no-use-before-define */
};

export const applyPlugins = (targetConfig, plugins, pluginContext) => {
  const isArray = Array.isArray(plugins);

  warning(isArray, 'Plugins must be an array.');

  if (!isArray) {
    return targetConfig;
  }

  return plugins.reduce((updatedConfig, plugin) =>
    applyPlugin(updatedConfig, plugin, pluginContext), targetConfig);
};

const configMerger = (objValue, srcValue) => {
  if (React.isValidElement(objValue)) {
    // Don't merge React elements. Just override with the source value.
    return srcValue;
  }

  return undefined;
};

export const mergeConfig = (targetConfig, sourceConfig, pluginContext) => {
  const pluginsAppliedConfig = (sourceConfig && ('plugins' in sourceConfig))
    ? applyPlugins(targetConfig, sourceConfig.plugins, pluginContext)
    : targetConfig;

  const mergedConfig = mergeWith({}, pluginsAppliedConfig, sourceConfig, configMerger);

  delete mergedConfig.plugins;

  return mergedConfig;
};

export const initConfig = (config, pluginContext) =>
  mergeConfig({}, config, pluginContext);

/*
 * Normalize a configuration object. This function mutates the argument configuration.
 * - Set the name property of each recordTypes entry to its key
 * - Set the name property of each vocabularies entry to its key
 */
export const normalizeConfig = (config) => {
  const recordTypes = config.recordTypes;

  Object.keys(recordTypes).forEach((recordTypeName) => {
    const recordType = recordTypes[recordTypeName];
    const vocabularies = recordType.vocabularies;

    recordType.name = recordTypeName;

    if (vocabularies) {
      Object.keys(vocabularies).forEach((vocabularyName) => {
        vocabularies[vocabularyName].name = vocabularyName;
      });
    }
  });

  return config;
};

export const getRecordTypeConfigByServiceObjectName = (config, objectName) => {
  if (!objectName) {
    return undefined;
  }

  if (!config.recordTypesByServiceObjectName) {
    const recordTypesByServiceObjectName = {};
    const { recordTypes } = config;

    Object.keys(recordTypes).forEach((recordType) => {
      const recordTypeConfig = recordTypes[recordType];

      recordTypesByServiceObjectName[recordTypeConfig.serviceConfig.objectName] = recordTypeConfig;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServiceObjectName = recordTypesByServiceObjectName;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServiceObjectName[objectName];
};

export const getRecordTypeNameByServiceObjectName = (config, objectName) => {
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, objectName);

  return (recordTypeConfig ? recordTypeConfig.name : undefined);
};

export const getRecordTypeConfigByServicePath = (config, servicePath) => {
  if (!config.recordTypesByServicePath) {
    const recordTypesByServicePath = {};
    const { recordTypes } = config;

    Object.keys(recordTypes).forEach((recordType) => {
      const recordTypeConfig = recordTypes[recordType];

      recordTypesByServicePath[recordTypeConfig.serviceConfig.servicePath] = recordTypeConfig;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServicePath = recordTypesByServicePath;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServicePath[servicePath];
};

export const getVocabularyConfigByShortID = (recordTypeConfig, shortID) => {
  if (!recordTypeConfig.vocabulariesByShortID) {
    const vocabulariesByShortID = {};
    const { vocabularies } = recordTypeConfig;

    if (vocabularies) {
      Object.keys(vocabularies).forEach((vocabulary) => {
        const vocabularyConfig = vocabularies[vocabulary];
        const { servicePath } = vocabularyConfig.serviceConfig;

        if (
          servicePath &&
          servicePath.indexOf('urn:cspace:name(') === 0 &&
          servicePath.lastIndexOf(')') === servicePath.length - 1
        ) {
          const vocabularyShortID = servicePath.substring(16, servicePath.length - 1);

          vocabulariesByShortID[vocabularyShortID] = vocabularyConfig;
        }
      });

      /* eslint-disable no-param-reassign */
      recordTypeConfig.vocabulariesByShortID = vocabulariesByShortID;
      /* eslint-enable no-param-reassign */
    }
  }

  return recordTypeConfig.vocabulariesByShortID[shortID];
};

export const getDefaultValue = (fieldDescriptor) => {
  const config = fieldDescriptor[configKey];

  if (config) {
    const { defaultValue } = config;

    if (typeof defaultValue === 'object' && !Immutable.Map.isMap(defaultValue)) {
      // If an object is supplied as a default value, convert it to an immutable map.

      return Immutable.fromJS(defaultValue);
    }

    return defaultValue;
  }

  return undefined;
};

export const getDefaults = (fieldDescriptor, currentPath = []) => {
  let results = [];

  const defaultValue = getDefaultValue(fieldDescriptor);

  if (typeof defaultValue !== 'undefined') {
    results = results.concat({
      path: currentPath,
      value: defaultValue,
    });
  }

  const childKeys = Object.keys(fieldDescriptor).filter(key => key !== configKey);

  childKeys.forEach((childKey) => {
    const childPath = currentPath.concat(childKey);
    const childfieldDescriptor = fieldDescriptor[childKey];
    const childResults = getDefaults(childfieldDescriptor, childPath);

    results = results.concat(childResults);
  });

  return results;
};

export const isFieldCloneable = (fieldDescriptor) => {
  const config = fieldDescriptor[configKey];

  if (config && 'cloneable' in config) {
    return config.cloneable;
  }

  return true;
};

export const isFieldRepeating = (fieldDescriptor) => {
  let repeating;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    repeating = fieldConfig.repeating;
  }

  return repeating;
};

export const isFieldRequired = (fieldDescriptor) => {
  let required;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    required = fieldConfig.required;
  }

  return required;
};

export const getFieldDataType = (fieldDescriptor) => {
  let type;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    type = fieldConfig.dataType;
  }

  if (!type) {
    // Check if there are child field descriptors. If so, default to map.

    const keys = Object.keys(fieldDescriptor);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== configKey) {
        type = DATA_TYPE_MAP;
        break;
      }
    }
  }

  if (!type) {
    // Default to string.

    type = DATA_TYPE_STRING;
  }

  return type;
};

export const getFieldCustomValidator = (fieldDescriptor) => {
  let validator;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    validator = fieldConfig.validate;
  }

  return validator;
};

export const isAuthority = recordTypeConfig =>
  get(recordTypeConfig, ['serviceConfig', 'serviceType']) === 'authority';

export const isUtility = recordTypeConfig =>
  get(recordTypeConfig, ['serviceConfig', 'serviceType']) === 'utility';

export const validateLocation = (config, location) => {
  const {
    recordType,
    vocabulary,
    csid,
    subresource,
    relatedRecordType,
    relatedCsid,
  } = location;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  if (!recordTypeConfig) {
    return {
      error: {
        recordType,
        code: ERR_UNKNOWN_RECORD_TYPE,
      },
    };
  }

  if (isAuthority(recordTypeConfig)) {
    if (!vocabulary) {
      return {
        error: {
          recordType,
          code: ERR_MISSING_VOCABULARY,
        },
      };
    }

    const vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);

    if (!vocabularyConfig) {
      return {
        error: {
          recordType,
          vocabulary,
          code: ERR_UNKNOWN_VOCABULARY,
        },
      };
    }
  } else if (vocabulary) {
    return {
      error: {
        recordType,
        vocabulary,
        code: ERR_UNKNOWN_VOCABULARY,
      },
    };
  }

  if (csid && !isCsid(csid) && !isUrnCsid(csid)) {
    return {
      error: {
        csid,
        code: ERR_INVALID_CSID,
      },
    };
  }

  if (subresource) {
    const subresourceConfig = get(config, ['subresources', subresource]);

    if (!subresourceConfig) {
      return {
        error: {
          subresource,
          code: ERR_UNKNOWN_SUBRESOURCE,
        },
      };
    }
  }

  if (relatedRecordType) {
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);
    const relatedServiceType = get(config, ['recordTypes', relatedRecordType, 'serviceConfig', 'serviceType']);

    if (
      (serviceType !== 'procedure' && serviceType !== 'object') ||
      (relatedServiceType !== 'procedure' && relatedServiceType !== 'object')
    ) {
      return {
        error: {
          recordType,
          relatedRecordType,
          code: ERR_INVALID_RELATED_TYPE,
        },
      };
    }
  }

  if (relatedCsid && !isCsid(relatedCsid)) {
    return {
      error: {
        csid: relatedCsid,
        code: ERR_INVALID_CSID,
      },
    };
  }

  return {};
};

export const getDefaultSearchRecordType = (config) => {
  const { recordTypes } = config;
  const names = Object.keys(recordTypes);

  let defaultSearchRecordType;

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];

    if (recordTypes[name].defaultForSearch) {
      defaultSearchRecordType = name;
      break;
    }
  }

  return (defaultSearchRecordType || names[0]);
};

export const getDefaultSearchVocabulary = (recordTypeConfig) => {
  const { vocabularies } = recordTypeConfig;
  const names = Object.keys(vocabularies);

  let defaultSearchVocabulary;

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];

    if (vocabularies[name].defaultForSearch) {
      defaultSearchVocabulary = name;
      break;
    }
  }

  return (defaultSearchVocabulary || names[0]);
};

export const findField = (parentFieldDescriptor, fieldName) => {
  const keys = Object.keys(parentFieldDescriptor);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = parentFieldDescriptor[key];

    if (key === fieldName) {
      return value;
    }

    if (key !== configKey) {
      const fieldDescriptor = findField(value, fieldName);

      if (fieldDescriptor) {
        return fieldDescriptor;
      }
    }
  }

  return null;
};

export const findFieldConfigInPart = (recordTypeConfig, partName, fieldName) => {
  const partDescriptor = get(recordTypeConfig, ['fields', 'document', `${NS_PREFIX}:${partName}`]);

  if (!partDescriptor) {
    return null;
  }

  // 1. Look for the field as a direct child of the part.

  let fieldDescriptor = partDescriptor[fieldName];

  // 2. Check for a memoized result.

  if (!fieldDescriptor) {
    fieldDescriptor = get(recordTypeConfig, ['fieldsByPart', partName, fieldName]);
  }

  // 3. Search for a nested field.

  if (typeof fieldDescriptor === 'undefined') {
    fieldDescriptor = findField(partDescriptor, fieldName);

    // Memoize the result.

    set(recordTypeConfig, ['fieldsByPart', partName, fieldName], fieldDescriptor);
  }

  return (fieldDescriptor ? fieldDescriptor[configKey] : null);
};
