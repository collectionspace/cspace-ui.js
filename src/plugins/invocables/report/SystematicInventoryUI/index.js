import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    report: {
      SystematicInventoryUI: {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
