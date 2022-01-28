import columns from './columns';
import fields from './fields';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => (configContext) => ({
  recordTypes: {
    audit: {
      messages,
      serviceConfig,
      fields: fields(configContext),
      columns: columns(configContext),
    },
  },
});
