import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import serviceConfig from './serviceConfig';
import invocableName from './invocableName';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    report: {
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
