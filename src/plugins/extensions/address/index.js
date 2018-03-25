import fields from './fields';
import form from './form';

export default () => configContext => ({
  extensions: {
    address: {
      fields: fields(configContext),
      form: form(configContext),
    },
  },
});
