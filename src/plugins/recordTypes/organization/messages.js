import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.organization.name',
      description: 'The name of the record type.',
      defaultMessage: 'Organization',
    },
    collectionName: {
      id: 'record.organization.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Organizations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.organization.info',
      defaultMessage: 'Organization Information',
    },
    contactInfo: {
      id: 'panel.organization.contactInfo',
      defaultMessage: 'Contact Information',
    },
    hierarchy: {
      id: 'panel.organization.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
};
