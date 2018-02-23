import fields from './fields';
import form from './form';
import optionLists from './optionLists';

export default () => pluginContext => ({
  optionLists,
  extensions: {
    dimension: {
      fields: fields(pluginContext),
      form: form(pluginContext),
    },
  },
});
