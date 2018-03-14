import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import requestConfig from './requestConfig';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => configContext => ({
  recordTypes: {
    authrole: {
      messages,
      requestConfig,
      serviceConfig,
      columns: columns(configContext),
      fields: fields(configContext),
      forms: forms(configContext),
      title: title(configContext),
    },
  },
});
