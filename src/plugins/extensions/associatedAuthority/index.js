import fields from './fields';
import form from './form';

export default () => (configContext) => ({
  extensions: {
    associatedAuthority: {
      fields: fields(configContext),
      form: form(configContext),
    },
  },
});
