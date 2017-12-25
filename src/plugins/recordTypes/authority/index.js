import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => pluginContext => ({
  recordTypes: {
    authority: {
      messages,
      serviceConfig,
      columns: columns(pluginContext),
    },
  },
});
