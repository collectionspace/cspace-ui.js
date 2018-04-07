import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.contact.name',
      description: 'The name of the record type.',
      defaultMessage: 'Contact',
    },
    collectionName: {
      id: 'record.contact.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Contacts',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.contact.info',
      defaultMessage: 'Contact Information',
    },
  }),
};
