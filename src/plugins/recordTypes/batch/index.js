import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => pluginContext => ({
  recordTypes: {
    batch: {
      messages,
      serviceConfig,
      columns: columns(pluginContext),
    },
  },
});
