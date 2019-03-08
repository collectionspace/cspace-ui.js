import fields from './fields';
import forms from './forms';

export default () => configContext => ({
  invocables: {
    batch: {
      'Update Object And Crate Location': {
        fields: fields(configContext),
        forms: forms(configContext),
      },
    },
  },
});
