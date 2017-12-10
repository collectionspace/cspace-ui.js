import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    account: {
      messages,
      serviceConfig,
    },
  },
});
