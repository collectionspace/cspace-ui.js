import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    report: {
      ucbgDiedInLocation: {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
