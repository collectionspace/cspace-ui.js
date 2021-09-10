import columns from './columns';
import fields from './fields';
import messages from './messages';

export default () => (configContext) => ({
  recordTypes: {
    audit: {
      messages,
      fields: fields(configContext),
      columns: columns(configContext),
    },
  },
});
