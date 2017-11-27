import columns from './columns';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    report: {
      columns,
      serviceConfig,
    },
  },
});
