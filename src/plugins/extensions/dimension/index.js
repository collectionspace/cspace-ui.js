import fields from './fields';
import form from './form';
import optionLists from './optionLists';

export default () => (configContext) => ({
  optionLists,
  extensions: {
    dimension: {
      fields: fields(configContext),
      form: form(configContext),
    },
  },
});
