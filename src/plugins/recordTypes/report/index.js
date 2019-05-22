import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';
import forms from './forms';
import fields from './fields';
import invocableName from './invocableName';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    report: {
      messages,
      serviceConfig,
      columns: columns(configContext),
      forms: forms(configContext),
      fields: fields(configContext),
      invocableName: invocableName(configContext),
      title: title(configContext),
    },
  },
});
