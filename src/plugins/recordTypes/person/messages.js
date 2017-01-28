import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.person.name',
      description: 'The name of the record type.',
      defaultMessage: 'Person',
    },
    collectionName: {
      id: 'record.person.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Persons',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.person.info',
      defaultMessage: 'Person Information',
    },
  }),
  field: defineMessages({
    personTermGroupList: {
      id: 'field.person.personTermGroupList',
      defaultMessage: 'Terms',
    },
    termDisplayName: {
      id: 'field.person.termDisplayName',
      defaultMessage: 'Display name',
    },
    termSource: {
      id: 'field.person.termSource',
      defaultMessage: 'Source',
    },
  }),
};
