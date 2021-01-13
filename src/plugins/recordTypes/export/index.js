import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => ({
  recordTypes: {
    export: {
      messages,
      serviceConfig,
      deletePermType: 'hard',
    },
  },
});
