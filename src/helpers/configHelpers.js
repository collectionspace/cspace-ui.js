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
