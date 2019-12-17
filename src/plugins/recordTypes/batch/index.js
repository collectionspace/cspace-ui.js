import columns from './columns';
import fields from './fields';
import forms from './forms';
import invocableName from './invocableName';
import messages from './messages';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => (configContext) => ({
  recordTypes: {
    batch: {
      messages,
      serviceConfig,
      columns: columns(configContext),
      fields: fields(configContext),
      forms: forms(configContext),
      invocableName: invocableName(configContext),
      title: title(configContext),
    },
  },
});
