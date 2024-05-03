import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.dutyofcare.name',
      description: 'The name of the record type',
      defaultMessage: 'Duty of Care',
    },
    collectionName: {
      id: 'record.dutyofcare.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Duty of Cares',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.dutyofcare.info',
      defaultMessage: 'Duty of Care Information',
    },
  }),
};
