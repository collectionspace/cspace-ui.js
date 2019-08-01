import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    report: {
      systematicInventory: {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
