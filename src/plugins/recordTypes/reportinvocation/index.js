import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => ({
  recordTypes: {
    reportinvocation: {
      messages,
      serviceConfig,
      deletePermType: 'hard',
    },
  },
});
