import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

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
  }),
  field: defineMessages({
    objectNumber: {
      id: 'field.collectionobject.objectNumber',
      defaultMessage: 'Identification number',
    },
    numberOfObjects: {
      id: 'field.collectionobject.numberOfObjects',
      defaultMessage: 'Number of objects',
    },
    otherNumberList: {
      id: 'field.collectionobject.otherNumberList',
      defaultMessage: 'Other number',
    },
    numberValue: {
      id: 'field.collectionobject.numberValue',
      defaultMessage: 'Number',
    },
    numberType: {
      id: 'field.collectionobject.numberType',
      defaultMessage: 'Type',
    },
    responsibleDepartments: {
      id: 'field.collectionobject.responsibleDepartments',
      defaultMessage: 'Responsible department',
    },
    collection: {
      id: 'field.collectionobject.collection',
      defaultMessage: 'Collection',
    },
    recordStatus: {
      id: 'field.collectionobject.recordStatus',
      defaultMessage: 'Record status',
    },
    briefDescriptions: {
      id: 'field.collectionobject.briefDescriptions',
      defaultMessage: 'Brief description',
    },
    distinguishingFeatures: {
      id: 'field.collectionobject.distinguishingFeatures',
      defaultMessage: 'Distinguishing features',
    },
    comments: {
      id: 'field.collectionobject.comments',
      defaultMessage: 'Comment',
    },
    computedCurrentLocation: {
      id: 'field.collectionobject.computedCurrentLocation',
      defaultMessage: 'Computed current location',
    },
    titleGroupList: {
      id: 'field.collectionobject.titleGroupList',
      defaultMessage: 'Title',
    },
    title: {
      id: 'field.collectionobject.title',
      defaultMessage: 'Title',
    },
    titleLanguage: {
      id: 'field.collectionobject.titleLanguage',
      defaultMessage: 'Language',
    },
    titleType: {
      id: 'field.collectionobject.titleType',
      defaultMessage: 'Type',
    },
    titleTranslationSubGroupList: {
      id: 'field.collectionobject.titleTranslationSubGroupList',
      defaultMessage: 'Translation',
    },
    titleTranslation: {
      id: 'field.collectionobject.titleTranslation',
      defaultMessage: 'Translation',
    },
    titleTranslationLanguage: {
      id: 'field.collectionobject.titleTranslationLanguage',
      defaultMessage: 'Language',
    },
    objectNameList: {
      id: 'field.collectionobject.objectNameList',
      defaultMessage: 'Object name',
    },
    objectName: {
      id: 'field.collectionobject.objectName',
      defaultMessage: 'Name',
    },
    objectNameCurrency: {
      id: 'field.collectionobject.objectNameCurrency',
      defaultMessage: 'Currency',
    },
    objectNameLevel: {
      id: 'field.collectionobject.objectNameLevel',
      defaultMessage: 'Level',
    },
    objectNameSystem: {
      id: 'field.collectionobject.objectNameSystem',
      defaultMessage: 'System',
    },
    objectNameType: {
      id: 'field.collectionobject.objectNameType',
      defaultMessage: 'Type',
    },
    objectNameLanguage: {
      id: 'field.collectionobject.objectNameLanguage',
      defaultMessage: 'Language',
    },
    objectNameNote: {
      id: 'field.collectionobject.objectNameNote',
      defaultMessage: 'Note',
    },
    copyNumber: {
      id: 'field.collectionobject.copyNumber',
      defaultMessage: 'Copy number',
    },
    objectStatusList: {
      id: 'field.collectionobject.objectStatusList',
      defaultMessage: 'Object status',
    },
    sex: {
      id: 'field.collectionobject.sex',
      defaultMessage: 'Sex',
    },
    phase: {
      id: 'field.collectionobject.phase',
      defaultMessage: 'Phase',
    },
    forms: {
      id: 'field.collectionobject.forms',
      defaultMessage: 'Form',
    },
    editionNumber: {
      id: 'field.collectionobject.editionNumber',
      defaultMessage: 'Edition number',
    },
    ageGroup: {
      id: 'field.collectionobject.ageGroup',
      defaultMessage: 'Age',
    },
    age: {
      id: 'field.collectionobject.age',
      defaultMessage: 'Age',
    },
    ageQualifier: {
      id: 'field.collectionobject.ageQualifier',
      defaultMessage: 'Qualifier',
    },
    ageUnit: {
      id: 'field.collectionobject.ageUnit',
      defaultMessage: 'Unit',
    },
    styles: {
      id: 'field.collectionobject.styles',
      defaultMessage: 'Style',
    },
    colors: {
      id: 'field.collectionobject.colors',
      defaultMessage: 'Color',
    },
    materialGroup: {
      id: 'field.collectionobject.materialGroup',
      defaultMessage: 'Material',
    },
    material: {
      id: 'field.collectionobject.material',
      defaultMessage: 'Material',
    },
    materialComponent: {
      id: 'field.collectionobject.materialComponent',
      defaultMessage: 'Material component',
    },
    materialComponentNote: {
      id: 'field.collectionobject.materialComponentNote',
      defaultMessage: 'Material component note',
    },
    materialName: {
      id: 'field.collectionobject.materialName',
      defaultMessage: 'Material name',
    },
    materialSource: {
      id: 'field.collectionobject.materialSource',
      defaultMessage: 'Material source',
    },
    physicalDescription: {
      id: 'field.collectionobject.physicalDescription',
      defaultMessage: 'Physical description',
    },
    objectComponentGroup: {
      id: 'field.collectionobject.objectComponentGroup',
      defaultMessage: 'Object component',
    },
    objectComponentName: {
      id: 'field.collectionobject.objectComponentName',
      defaultMessage: 'Name',
    },
    objectComponentInformation: {
      id: 'field.collectionobject.objectComponentInformation',
      defaultMessage: 'Information',
    },
    technicalAttributeGroup: {
      id: 'field.collectionobject.technicalAttributeGroup',
      defaultMessage: 'Technical attribute',
    },
    technicalAttribute: {
      id: 'field.collectionobject.technicalAttribute',
      defaultMessage: 'Attribute',
    },
    technicalAttributeMeasurement: {
      id: 'field.collectionobject.technicalAttributeMeasurement',
      defaultMessage: 'Measurement',
    },
    technicalAttributeMeasurementUnit: {
      id: 'field.collectionobject.technicalAttributeMeasurementUnit',
      defaultMessage: 'Unit',
    },
    measuredPartGroupList: {
      id: 'field.collectionobject.measuredPartGroup',
      defaultMessage: 'Dimensions',
    },
    measuredPart: {
      id: 'field.collectionobject.measuredPart',
      defaultMessage: 'Part',
    },
    dimensionSummary: {
      id: 'field.collectionobject.dimensionSummary',
      defaultMessage: 'Summary',
    },
    dimensionSubGroup: {
      id: 'field.collectionobject.dimensionSubGroup',
      defaultMessage: 'Measurements',
    },
    dimension: {
      id: 'field.collectionobject.dimension',
      defaultMessage: 'Dimension',
    },
    measuredBy: {
      id: 'field.collectionobject.measuredBy',
      defaultMessage: 'Measured by',
    },
    measurementMethod: {
      id: 'field.collectionobject.measurementMethod',
      defaultMessage: 'Method',
    },
    value: {
      id: 'field.collectionobject.value',
      defaultMessage: 'Value',
    },
    measurementUnit: {
      id: 'field.collectionobject.measurementUnit',
      defaultMessage: 'Unit',
    },
    valueQualifier: {
      id: 'field.collectionobject.valueQualifier',
      defaultMessage: 'Qualifier',
    },
    valueDate: {
      id: 'field.collectionobject.valueDate',
      defaultMessage: 'Date',
    },
    contentDescription: {
      id: 'field.collectionobject.contentDescription',
      defaultMessage: 'Description',
    },
    contentLanguages: {
      id: 'field.collectionobject.contentLanguages',
      defaultMessage: 'Language',
    },
    contentActivities: {
      id: 'field.collectionobject.contentActivities',
      defaultMessage: 'Activity',
    },
    contentConcepts: {
      id: 'field.collectionobject.contentConcepts',
      defaultMessage: 'Concept',
    },
    contentConcept: {
      id: 'field.collectionobject.contentConcept',
      defaultMessage: 'Concept',
    },
    contentDateGroup: {
      id: 'field.collectionobject.contentDateGroup',
      defaultMessage: 'Date',
    },
    contentPositions: {
      id: 'field.collectionobject.contentPositions',
      defaultMessage: 'Position',
    },
    contentObjectGroup: {
      id: 'field.collectionobject.contentObjectGroup',
      defaultMessage: 'Object',
    },
    contentObject: {
      id: 'field.collectionobject.contentObject',
      defaultMessage: 'Name',
    },
    contentObjectType: {
      id: 'field.collectionobject.contentObjectType',
      defaultMessage: 'Type',
    },
    contentPeoples: {
      id: 'field.collectionobject.contentPeoples',
      defaultMessage: 'People',
    },
    contentPersons: {
      id: 'field.collectionobject.contentPersons',
      defaultMessage: 'Person',
    },
    contentPerson: {
      id: 'field.collectionobject.contentPerson',
      defaultMessage: 'Person',
    },
    contentPlaces: {
      id: 'field.collectionobject.contentPlaces',
      defaultMessage: 'Place',
    },
    contentScripts: {
      id: 'field.collectionobject.contentScripts',
      defaultMessage: 'Script',
    },
    contentOrganizations: {
      id: 'field.collectionobject.contentOrganizations',
      defaultMessage: 'Organization',
    },
    contentOrganization: {
      id: 'field.collectionobject.contentOrganization',
      defaultMessage: 'Organization',
    },
    contentEventNameGroup: {
      id: 'field.collectionobject.contentEventNameGroup',
      defaultMessage: 'Event',
    },
    contentEventName: {
      id: 'field.collectionobject.contentEventName',
      defaultMessage: 'Name',
    },
    contentEventNameType: {
      id: 'field.collectionobject.contentEventNameType',
      defaultMessage: 'Type',
    },
    contentOtherGroup: {
      id: 'field.collectionobject.contentOtherGroup',
      defaultMessage: 'Other',
    },
    contentOther: {
      id: 'field.collectionobject.contentOther',
      defaultMessage: 'Name',
    },
    contentOtherType: {
      id: 'field.collectionobject.contentOtherType',
      defaultMessage: 'Type',
    },
    contentNote: {
      id: 'field.collectionobject.contentNote',
      defaultMessage: 'Note',
    },
    inscriptionContent: {
      id: 'field.collectionobject.inscriptionContent',
      defaultMessage: 'Inscription content',
    },
    inscriptionContentInscriber: {
      id: 'field.collectionobject.inscriptionContentInscriber',
      defaultMessage: 'Inscriber',
    },
    inscriptionContentLanguage: {
      id: 'field.collectionobject.inscriptionContentLanguage',
      defaultMessage: 'Language',
    },
    inscriptionContentDateGroup: {
      id: 'field.collectionobject.inscriptionContentDateGroup',
      defaultMessage: 'Date',
    },
    inscriptionContentPosition: {
      id: 'field.collectionobject.inscriptionContentPosition',
      defaultMessage: 'Position',
    },
    inscriptionContentScript: {
      id: 'field.collectionobject.inscriptionContentScript',
      defaultMessage: 'Script',
    },
    inscriptionContentType: {
      id: 'field.collectionobject.inscriptionContentType',
      defaultMessage: 'Type',
    },
    inscriptionContentMethod: {
      id: 'field.collectionobject.inscriptionContentMethod',
      defaultMessage: 'Method',
    },
    inscriptionContentInterpretation: {
      id: 'field.collectionobject.inscriptionContentInterpretation',
      defaultMessage: 'Interpretation',
    },
    inscriptionContentTranslation: {
      id: 'field.collectionobject.inscriptionContentTranslation',
      defaultMessage: 'Translation',
    },
    inscriptionContentTransliteration: {
      id: 'field.collectionobject.inscriptionContentTransliteration',
      defaultMessage: 'Transliteration',
    },
    inscriptionDescription: {
      id: 'field.collectionobject.inscriptionDescription',
      defaultMessage: 'Inscription description',
    },
    inscriptionDescriptionInscriber: {
      id: 'field.collectionobject.inscriptionDescriptionInscriber',
      defaultMessage: 'Inscriber',
    },
    inscriptionDescriptionDateGroup: {
      id: 'field.collectionobject.inscriptionDescriptionDateGroup',
      defaultMessage: 'Date',
    },
    inscriptionDescriptionPosition: {
      id: 'field.collectionobject.inscriptionDescriptionPosition',
      defaultMessage: 'Position',
    },
    inscriptionDescriptionType: {
      id: 'field.collectionobject.inscriptionDescriptionType',
      defaultMessage: 'Type',
    },
    inscriptionDescriptionMethod: {
      id: 'field.collectionobject.inscriptionDescriptionMethod',
      defaultMessage: 'Method',
    },
    inscriptionDescriptionInterpretation: {
      id: 'field.collectionobject.inscriptionDescriptionInterpretation',
      defaultMessage: 'Interpretation',
    },
    objectProductionDateGroupList: {
      id: 'field.collectionobject.objectProductionDateGroupList',
      defaultMessage: 'Production date',
    },
    techniqueGroup: {
      id: 'field.collectionobject.techniqueGroup',
      defaultMessage: 'Production technique',
    },
    technique: {
      id: 'field.collectionobject.technique',
      defaultMessage: 'Technique',
    },
    techniqueType: {
      id: 'field.collectionobject.techniqueType',
      defaultMessage: 'Type',
    },
    objectProductionPlaceGroup: {
      id: 'field.collectionobject.objectProductionPlaceGroup',
      defaultMessage: 'Production place',
    },
    objectProductionPlace: {
      id: 'field.collectionobject.objectProductionPlace',
      defaultMessage: 'Place',
    },
    objectProductionPlaceRole: {
      id: 'field.collectionobject.objectProductionPlaceRole',
      defaultMessage: 'Role',
    },
    objectProductionReasons: {
      id: 'field.collectionobject.objectProductionReasons',
      defaultMessage: 'Production reason',
    },
    objectProductionPeopleGroup: {
      id: 'field.collectionobject.objectProductionPeopleGroup',
      defaultMessage: 'Production people',
    },
    objectProductionPeople: {
      id: 'field.collectionobject.objectProductionPeople',
      defaultMessage: 'People',
    },
    objectProductionPeopleRole: {
      id: 'field.collectionobject.objectProductionPeopleRole',
      defaultMessage: 'Role',
    },
    objectProductionPersonGroup: {
      id: 'field.collectionobject.objectProductionPersonGroup',
      defaultMessage: 'Production person',
    },
    objectProductionPerson: {
      id: 'field.collectionobject.objectProductionPerson',
      defaultMessage: 'Person',
    },
    objectProductionPersonRole: {
      id: 'field.collectionobject.objectProductionPersonRole',
      defaultMessage: 'Role',
    },
    objectProductionOrganizationGroup: {
      id: 'field.collectionobject.objectProductionOrganizationGroup',
      defaultMessage: 'Production organization',
    },
    objectProductionOrganization: {
      id: 'field.collectionobject.objectProductionOrganization',
      defaultMessage: 'Organization',
    },
    objectProductionOrganizationRole: {
      id: 'field.collectionobject.objectProductionOrganizationRole',
      defaultMessage: 'Role',
    },
    objectProductionNote: {
      id: 'field.collectionobject.objectProductionNote',
      defaultMessage: 'Production note',
    },
    assocActivityGroup: {
      id: 'field.collectionobject.assocActivityGroup',
      defaultMessage: 'Associated activity',
    },
    assocActivity: {
      id: 'field.collectionobject.assocActivity',
      defaultMessage: 'Activity',
    },
    assocActivityType: {
      id: 'field.collectionobject.assocActivityType',
      defaultMessage: 'Type',
    },
    assocActivityNote: {
      id: 'field.collectionobject.assocActivityNote',
      defaultMessage: 'Note',
    },
    assocObjectGroup: {
      id: 'field.collectionobject.assocObjectGroup',
      defaultMessage: 'Associated object',
    },
    assocObject: {
      id: 'field.collectionobject.assocObject',
      defaultMessage: 'Object',
    },
    assocObjectType: {
      id: 'field.collectionobject.assocObjectType',
      defaultMessage: 'Type',
    },
    assocObjectNote: {
      id: 'field.collectionobject.assocObjectNote',
      defaultMessage: 'Note',
    },
    assocConceptGroup: {
      id: 'field.collectionobject.assocConceptGroup',
      defaultMessage: 'Associated concept',
    },
    assocConcept: {
      id: 'field.collectionobject.assocConcept',
      defaultMessage: 'Concept',
    },
    assocConceptType: {
      id: 'field.collectionobject.assocConceptType',
      defaultMessage: 'Type',
    },
    assocConceptNote: {
      id: 'field.collectionobject.assocConceptNote',
      defaultMessage: 'Note',
    },
    assocCulturalContextGroup: {
      id: 'field.collectionobject.assocCulturalContextGroup',
      defaultMessage: 'Associated cultural affinity',
    },
    assocCulturalContext: {
      id: 'field.collectionobject.assocCulturalContext',
      defaultMessage: 'Cultural affinity',
    },
    assocCulturalContextType: {
      id: 'field.collectionobject.assocCulturalContextType',
      defaultMessage: 'Type',
    },
    assocCulturalContextNote: {
      id: 'field.collectionobject.assocCulturalContextNote',
      defaultMessage: 'Note',
    },
    assocOrganizationGroup: {
      id: 'field.collectionobject.assocOrganizationGroup',
      defaultMessage: 'Associated organization',
    },
    assocOrganization: {
      id: 'field.collectionobject.assocOrganization',
      defaultMessage: 'Organization',
    },
    assocOrganizationType: {
      id: 'field.collectionobject.assocOrganizationType',
      defaultMessage: 'Type',
    },
    assocOrganizationNote: {
      id: 'field.collectionobject.assocOrganizationNote',
      defaultMessage: 'Note',
    },
    assocPeopleGroup: {
      id: 'field.collectionobject.assocPeopleGroup',
      defaultMessage: 'Associated people',
    },
    assocPeople: {
      id: 'field.collectionobject.assocPeople',
      defaultMessage: 'People',
    },
    assocPeopleType: {
      id: 'field.collectionobject.assocPeopleType',
      defaultMessage: 'Type',
    },
    assocPeopleNote: {
      id: 'field.collectionobject.assocPeopleNote',
      defaultMessage: 'Note',
    },
    assocPersonGroup: {
      id: 'field.collectionobject.assocPersonGroup',
      defaultMessage: 'Associated person',
    },
    assocPerson: {
      id: 'field.collectionobject.assocPerson',
      defaultMessage: 'Person',
    },
    assocPersonType: {
      id: 'field.collectionobject.assocPersonType',
      defaultMessage: 'Type',
    },
    assocPersonNote: {
      id: 'field.collectionobject.assocPersonNote',
      defaultMessage: 'Note',
    },
    assocPlaceGroup: {
      id: 'field.collectionobject.assocPlaceGroup',
      defaultMessage: 'Associated place',
    },
    assocPlace: {
      id: 'field.collectionobject.assocPlace',
      defaultMessage: 'Place',
    },
    assocPlaceType: {
      id: 'field.collectionobject.assocPlaceType',
      defaultMessage: 'Type',
    },
    assocPlaceNote: {
      id: 'field.collectionobject.assocPlaceNote',
      defaultMessage: 'Note',
    },
    assocEventGroup: {
      id: 'field.collectionobject.assocEventGroup',
      defaultMessage: 'Associated event',
    },
    assocEventName: {
      id: 'field.collectionobject.assocEventName',
      defaultMessage: 'Event',
    },
    assocEventNameType: {
      id: 'field.collectionobject.assocEventNameType',
      defaultMessage: 'Type',
    },
    assocEventOrganizations: {
      id: 'field.collectionobject.assocEventOrganizations',
      defaultMessage: 'Associated event organization',
    },
    assocEventOrganization: {
      id: 'field.collectionobject.assocEventOrganization',
      defaultMessage: 'Associated event organization',
    },
    assocEventPeoples: {
      id: 'field.collectionobject.assocEventPeoples',
      defaultMessage: 'Associated event people',
    },
    assocEventPersons: {
      id: 'field.collectionobject.assocEventPersons',
      defaultMessage: 'Associated event person',
    },
    assocEventPerson: {
      id: 'field.collectionobject.assocEventPerson',
      defaultMessage: 'Associated event person',
    },
    assocEventPlaces: {
      id: 'field.collectionobject.assocEventPlaces',
      defaultMessage: 'Associated event place',
    },
    assocEventNote: {
      id: 'field.collectionobject.assocEventNote',
      defaultMessage: 'Associated event note',
    },
    assocDateGroup: {
      id: 'field.collectionobject.assocDateGroup',
      defaultMessage: 'Associated date',
    },
    assocStructuredDateGroup: {
      id: 'field.collectionobject.assocStructuredDateGroup',
      defaultMessage: 'Date',
    },
    assocDateType: {
      id: 'field.collectionobject.assocDateType',
      defaultMessage: 'Type',
    },
    assocDateNote: {
      id: 'field.collectionobject.assocDateNote',
      defaultMessage: 'Note',
    },
    objectHistoryNote: {
      id: 'field.collectionobject.objectHistoryNote',
      defaultMessage: 'Object history note',
    },
    usageGroup: {
      id: 'field.collectionobject.usageGroup',
      defaultMessage: 'Usage',
    },
    usage: {
      id: 'field.collectionobject.usage',
      defaultMessage: 'Usage',
    },
    usageNote: {
      id: 'field.collectionobject.usageNote',
      defaultMessage: 'Usage note',
    },
    owners: {
      id: 'field.collectionobject.owners',
      defaultMessage: 'Owner',
    },
    owner: {
      id: 'field.collectionobject.owner',
      defaultMessage: 'Owner',
    },
    ownershipDateGroupList: {
      id: 'field.collectionobject.ownershipDateGroupList',
      defaultMessage: 'Ownership date',
    },
    ownershipAccess: {
      id: 'field.collectionobject.ownershipAccess',
      defaultMessage: 'Ownership access',
    },
    ownershipCategory: {
      id: 'field.collectionobject.ownershipCategory',
      defaultMessage: 'Ownership category',
    },
    ownershipPlace: {
      id: 'field.collectionobject.ownershipPlace',
      defaultMessage: 'Ownership place',
    },
    ownershipExchangeGroup: {
      id: 'field.collectionobject.ownershipExchangeGroup',
      defaultMessage: 'Ownership exchange',
    },
    ownershipExchangeMethod: {
      id: 'field.collectionobject.ownershipExchangeMethod',
      defaultMessage: 'Method',
    },
    ownershipExchangeNote: {
      id: 'field.collectionobject.ownershipExchangeNote',
      defaultMessage: 'Note',
    },
    ownershipExchangePriceCurrency: {
      id: 'field.collectionobject.ownershipExchangePriceCurrency',
      defaultMessage: 'Currency',
    },
    ownershipExchangePriceValue: {
      id: 'field.collectionobject.ownershipExchangePriceValue',
      defaultMessage: 'Price',
    },
    ownersPersonalExperience: {
      id: 'field.collectionobject.ownersPersonalExperience',
      defaultMessage: 'Owner\'s personal experience',
    },
    ownersPersonalResponse: {
      id: 'field.collectionobject.ownersPersonalResponse',
      defaultMessage: 'Owner\'s personal response',
    },
    ownersReferences: {
      id: 'field.collectionobject.ownersReferences',
      defaultMessage: 'Owner\'s reference',
    },
    ownersContributionNote: {
      id: 'field.collectionobject.ownersContributionNote',
      defaultMessage: 'Owner\'s contribution note',
    },
    viewersRole: {
      id: 'field.collectionobject.viewersRole',
      defaultMessage: 'Viewer\'s role',
    },
    viewersPersonalExperience: {
      id: 'field.collectionobject.viewersPersonalExperience',
      defaultMessage: 'Viewer\'s personal experience',
    },
    viewersPersonalResponse: {
      id: 'field.collectionobject.viewersPersonalResponse',
      defaultMessage: 'Viewer\'s personal response',
    },
    viewersReferences: {
      id: 'field.collectionobject.viewersReferences',
      defaultMessage: 'Viewer\'s reference',
    },
    viewersContributionNote: {
      id: 'field.collectionobject.viewersContributionNote',
      defaultMessage: 'Viewer\'s contribution note',
    },
    referenceGroup: {
      id: 'field.collectionobject.referenceGroup',
      defaultMessage: 'Reference information',
    },
    reference: {
      id: 'field.collectionobject.reference',
      defaultMessage: 'Reference',
    },
    referenceNote: {
      id: 'field.collectionobject.referenceNote',
      defaultMessage: 'Reference note',
    },
    fieldCollectionDateGroup: {
      id: 'field.collectionobject.fieldCollectionDateGroup',
      defaultMessage: 'Field collection date',
    },
    fieldCollectionMethods: {
      id: 'field.collectionobject.fieldCollectionMethods',
      defaultMessage: 'Field collection method',
    },
    fieldCollectionNote: {
      id: 'field.collectionobject.fieldCollectionNote',
      defaultMessage: 'Field collection note',
    },
    fieldCollectionNumber: {
      id: 'field.collectionobject.fieldCollectionNumber',
      defaultMessage: 'Field collection number',
    },
    fieldCollectionPlace: {
      id: 'field.collectionobject.fieldCollectionPlace',
      defaultMessage: 'Field collection place',
    },
    fieldCollectionSources: {
      id: 'field.collectionobject.fieldCollectionSources',
      defaultMessage: 'Field collection source',
    },
    fieldCollectionSource: {
      id: 'field.collectionobject.fieldCollectionSource',
      defaultMessage: 'Field collection source',
    },
    fieldCollectors: {
      id: 'field.collectionobject.fieldCollectors',
      defaultMessage: 'Field collection collector',
    },
    fieldCollector: {
      id: 'field.collectionobject.fieldCollector',
      defaultMessage: 'Field collection collector',
    },
    fieldColEventNames: {
      id: 'field.collectionobject.fieldColEventNames',
      defaultMessage: 'Field collection event name',
    },
  }),
};
