import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    report: {
      ComponentCheckSubReport: {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
