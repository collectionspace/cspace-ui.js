import columns from './columns';
import fields from './fields';
import forms from './forms';
import title from './title';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => (configContext) => ({
  recordTypes: {
    audit: {
      messages,
      serviceConfig,
      fields: fields(configContext),
      forms: forms(configContext),
      columns: columns(configContext),
      title: title(configContext),
    },
  },
});
