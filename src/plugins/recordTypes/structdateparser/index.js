import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    structureddates: {
      messages,
      serviceConfig,
      deletePermType: 'hard',
    },
  },
});
