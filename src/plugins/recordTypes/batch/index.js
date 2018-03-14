import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => configContext => ({
  recordTypes: {
    batch: {
      messages,
      serviceConfig,
      columns: columns(configContext),
    },
  },
});
