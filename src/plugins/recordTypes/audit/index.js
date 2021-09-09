import columns from './columns';
import messages from './messages';

export default () => (configContext) => ({
  recordTypes: {
    audit: {
      messages,
      columns: columns(configContext),
    },
  },
});
