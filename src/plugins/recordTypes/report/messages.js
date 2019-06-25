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
    singleTargetMissing: {
      id: 'record.report.singleTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in single mode.',
      defaultMessage: 'Select a record on which to run this report.',
    },
    listTargetMissing: {
      id: 'record.report.listTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in list mode.',
      defaultMessage: 'Select one or more records on which to run this report.',
    },
    groupTargetMissing: {
      id: 'record.report.groupTargetMissing',
      description: 'The message shown when a record of the type is invoked, and the invocation target has not been supplied in group mode.',
      defaultMessage: 'Select a group on which to run this report.',
    },
  }),
  panel: defineMessages({
    mode: {
      id: 'panel.report.mode',
      defaultMessage: 'Runs on',
    },
  }),
};
