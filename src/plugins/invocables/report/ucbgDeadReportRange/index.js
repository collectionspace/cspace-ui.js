import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    report: {
      ucbgDeadReportRange: {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
