import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => ({
  recordTypes: {
    batchinvocation: {
      messages,
      serviceConfig,
      deletePermType: 'hard',
    },
  },
});
