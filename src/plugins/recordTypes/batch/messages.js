import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.batch.name',
      description: 'The name of the record type.',
      defaultMessage: 'Data Update',
    },
    collectionName: {
      id: 'record.batch.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Data Updates',
    },
    invokeUnsaved: {
      id: 'record.batch.invokeUnsaved',
      description: 'The message shown when a record of the type is invoked, and the context record has unsaved changes.',
      defaultMessage: 'This record has changes that have not been saved. The data update will not include any unsaved data.',
    },
  }),
};
