import fields from './fields';
import form from './form';

export default () => pluginContext => ({
  extensions: {
    dimension: {
      fields: fields(pluginContext),
      form: form(pluginContext),
    },
  },
});
