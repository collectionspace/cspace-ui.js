import columns from './columns';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    batch: {
      columns,
      serviceConfig,
    },
  },
});
