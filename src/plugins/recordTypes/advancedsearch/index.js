import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => ({
  recordTypes: {
    advancedsearch: {
      serviceConfig,
      messages,
      deletePermType: 'hard',
    },
  },
});
