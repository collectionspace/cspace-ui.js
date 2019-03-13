import forms from './forms';
import fields from './fields';

export default () => configContext => ({
  invocables: {
    report: {
      ComponentCheck: {
        forms: forms(configContext),
        fields: fields(configContext),
      },
    },
  },
});
