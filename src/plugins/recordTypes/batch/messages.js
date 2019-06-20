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
    singleTargetMissing: {
      id: 'record.batch.singleTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in single mode.',
      defaultMessage: 'Select a record on which to run this data update.',
    },
    listTargetMissing: {
      id: 'record.batch.listTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in list mode.',
      defaultMessage: 'Select one or more records on which to run this data update.',
    },
    groupTargetMissing: {
      id: 'record.batch.groupTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in group mode.',
      defaultMessage: 'Select a group on which to run this data update.',
    },
  }),
};
