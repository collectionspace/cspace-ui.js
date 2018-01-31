import fields from './fields';

export default () => pluginContext => ({
  extensions: {
    structuredDate: {
      fields: fields(pluginContext),
    },
  },
});
