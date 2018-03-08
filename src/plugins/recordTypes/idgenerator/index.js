import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    idgenerator: {
      messages,
      serviceConfig,
    },
  },
});
