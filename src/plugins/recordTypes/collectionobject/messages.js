import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.collectionobject.name',
      description: 'The name of the record type.',
      defaultMessage: 'Object',
    },
    collectionName: {
      id: 'record.collectionobject.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Objects',
    },
  }),
  panel: defineMessages({
    id: {
      id: 'panel.collectionobject.id',
      defaultMessage: 'Object Identification Information',
    },
    desc: {
      id: 'panel.collectionobject.desc',
      defaultMessage: 'Object Description Information',
    },
    content: {
      id: 'panel.collectionobject.content',
      defaultMessage: 'Content',
    },
    textInscript: {
      id: 'panel.collectionobject.textInscript',
      defaultMessage: 'Textual Inscription',
    },
    nonTextInscript: {
      id: 'panel.collectionobject.nonTextInscript',
      defaultMessage: 'Non-Textual Inscription',
    },
    prod: {
      id: 'panel.collectionobject.prod',
      defaultMessage: 'Object Production Information',
    },
    hist: {
      id: 'panel.collectionobject.hist',
      defaultMessage: 'Object History and Association Information',
    },
    assoc: {
      id: 'panel.collectionobject.assoc',
      defaultMessage: 'Associations',
    },
    owner: {
      id: 'panel.collectionobject.owner',
      defaultMessage: 'Object Owner\'s Contribution Information',
    },
    viewer: {
      id: 'panel.collectionobject.viewer',
      defaultMessage: 'Object Viewer\'s Contribution Information',
    },
    reference: {
      id: 'panel.collectionobject.reference',
      defaultMessage: 'Reference Information',
    },
    collect: {
      id: 'panel.collectionobject.collect',
      defaultMessage: 'Object Collection Information',
    },
    hierarchy: {
      id: 'panel.collectionobject.hierarchy',
      defaultMessage: 'Hierarchy',
    },
    software: {
      id: 'panel.collectionobject.software',
      defaultMessage: 'Technical Specifications: Software/Web',
    },
    avTechSpecs: {
      id: 'panel.collectionobject.avTechSpecs',
      defaultMessage: 'Technical Specifications: Audio/Video/Still',
    },
    rights: {
      id: 'panel.collectionobject.rights',
      defaultMessage: 'Rights Management Information',
    },
    rightsin: {
      id: 'panel.collectionobject.rightsin',
      defaultMessage: 'Rights In Management Information',
    },
  }),
  inputTable: defineMessages({
    age: {
      id: 'inputTable.collectionobject.age',
      defaultMessage: 'Age',
    },
    assocEvent: {
      id: 'inputTable.collectionobject.assocEvent',
      defaultMessage: 'Associated event',
    },
    ownershipExchange: {
      id: 'inputTable.collectionobject.ownershipExchange',
      defaultMessage: 'Ownership exchange',
    },
  }),
};
