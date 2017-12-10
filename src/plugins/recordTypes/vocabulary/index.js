import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    vocabulary: {
      messages,
      serviceConfig,
    },
  },
});
