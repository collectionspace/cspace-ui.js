import merge from 'lodash/merge';
import warning from 'warning';

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

  const mergedConfig = merge({}, pluginsAppliedConfig, sourceConfig);

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

export const getRecordTypeByServiceObjectName = (config, objectName) => {
  if (!config.recordTypesByServiceObjectName) {
    const recordTypesByServiceObjectName = {};

    const {
      recordTypes,
    } = config;

    Object.keys(recordTypes).forEach((recordTypeName) => {
      const recordType = recordTypes[recordTypeName];
      const serviceObjectName = recordType.serviceConfig.objectName;

      recordTypesByServiceObjectName[serviceObjectName] = recordType;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServiceObjectName = recordTypesByServiceObjectName;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServiceObjectName[objectName];
};
