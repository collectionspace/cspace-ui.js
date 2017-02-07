import deepAssign from 'deep-assign';
import warning from 'warning';

export const fieldDescriptorKeys = {
  config: Symbol.for('fieldDescriptorKeys.config'),
};

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

  /* eslint-disable no-use-before-define */ // Gotta do this mutual recursion
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

export const mergeConfig = (targetConfig, sourceConfig, pluginContext) => {
  const pluginsAppliedConfig = (sourceConfig && ('plugins' in sourceConfig))
    ? applyPlugins(targetConfig, sourceConfig.plugins, pluginContext)
    : targetConfig;

  const mergedConfig = deepAssign({}, pluginsAppliedConfig, sourceConfig);

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
