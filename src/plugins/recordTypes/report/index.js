import columns from './columns';
import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    report: {
      columns,
      messages,
      serviceConfig,
    },
  },
});
