import fields from './fields';

export default () => pluginContext => ({
  extensions: {
    core: {
      fields: fields(pluginContext),
    },
  },
});
