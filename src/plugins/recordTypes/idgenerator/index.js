import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    batch: {
      messages,
      serviceConfig,
    },
  },
});
