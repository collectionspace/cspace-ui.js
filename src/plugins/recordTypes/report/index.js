import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => configContext => ({
  recordTypes: {
    report: {
      messages,
      serviceConfig,
      columns: columns(configContext),
    },
  },
});
