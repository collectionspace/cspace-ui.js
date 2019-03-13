import forms from './forms';
import fields from './fields';

export default () => configContext => ({
  invocables: {
    report: {
      keyinfobyloc: {
        forms: forms(configContext),
        fields: fields(configContext),
      },
    },
  },
});
