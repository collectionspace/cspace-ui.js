import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.deaccession.name',
      description: 'The name of the record type',
      defaultMessage: 'Deaccession',
    },
    collectionName: {
      id: 'record.deaccession.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Deaccessions',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.deaccession.info',
      defaultMessage: 'Deaccession Information',
    },
    exit: {
      id: 'panel.deaccession.exit',
      defaultMessage: 'Proposed Exit Details',
    },
  }),
};
