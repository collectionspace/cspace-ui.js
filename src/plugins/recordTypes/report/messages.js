import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.report.name',
      description: 'The name of the record type.',
      defaultMessage: 'Report',
    },
    collectionName: {
      id: 'record.report.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Reports',
    },
    invokeUnsaved: {
      id: 'record.report.invokeUnsaved',
      description: 'The message shown when a record of the type is invoked, and the context record has unsaved changes.',
      defaultMessage: 'This record has changes that have not been saved. The report will not include any unsaved data.',
    },
  }),
};
