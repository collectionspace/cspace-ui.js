import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    batch: {
      columns,
      messages,
      serviceConfig,
    },
  },
});
