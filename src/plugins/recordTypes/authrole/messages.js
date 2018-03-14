import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// configContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  record: defineMessages({
    name: {
      id: 'record.authrole.name',
      description: 'The name of the record type.',
      defaultMessage: 'Role',
    },
    collectionName: {
      id: 'record.authrole.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Roles',
    },
  }),
};
