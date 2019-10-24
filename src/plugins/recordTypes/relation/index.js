import messages from './messages';
import serviceConfig from './serviceConfig';

export default () => () => ({
  recordTypes: {
    relation: {
      messages,
      serviceConfig,
      // Relation records are soft deletable, but for now the UI issues hard deletes, for
      // consistency with pre-5.0 behavior. Map delete perms to both soft and hard delete
      // in case the UI switches to soft-deleting in the future.
      deletePermType: 'all',
    },
  },
});
