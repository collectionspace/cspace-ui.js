import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default defineMessages({
  recordNameTitle: {
    id: 'record.object.nameTitle',
    description: 'The name of the record when used as a title.',
    defaultMessage: 'Object',
  },
  resultsTitle: {
    id: 'record.object.resultsTitle',
    description: 'The name of the record when used as a title describing search results.',
    defaultMessage: 'Objects',
  },

  // Panels

  idPanel: {
    id: 'panel.object.id',
    defaultMessage: 'Object Identification Information',
  },
  descPanel: {
    id: 'panel.object.desc',
    defaultMessage: 'Object Description Information',
  },
  contentPanel: {
    id: 'panel.object.content',
    defaultMessage: 'Content',
  },
  textInscriptPanel: {
    id: 'panel.object.textInscript',
    defaultMessage: 'Textual Inscription',
  },
  nonTextInscriptPanel: {
    id: 'panel.object.nonTextInscript',
    defaultMessage: 'Non-Textual Inscription',
  },
  prodPanel: {
    id: 'panel.object.prod',
    defaultMessage: 'Object Production Information',
  },
  histPanel: {
    id: 'panel.object.hist',
    defaultMessage: 'Object History and Association Information',
  },
  assocPanel: {
    id: 'panel.object.assoc',
    defaultMessage: 'Associations',
  },
  ownerPanel: {
    id: 'panel.object.owner',
    defaultMessage: 'Object Owner\'s Contribution Information',
  },
  viewerPanel: {
    id: 'panel.object.viewer',
    defaultMessage: 'Object Viewer\'s Contribution Information',
  },
  referencePanel: {
    id: 'panel.object.reference',
    defaultMessage: 'Reference Information',
  },
  collectPanel: {
    id: 'panel.object.collect',
    defaultMessage: 'Object Collection Information',
  },

  // Fields

  objectNumber: {
    id: 'field.object.objectNumber',
    defaultMessage: 'Identification number',
  },
  numberOfObjects: {
    id: 'field.object.numberOfObjects',
    defaultMessage: 'Number of objects',
  },
  otherNumberList: {
    id: 'field.object.otherNumberList',
    defaultMessage: 'Other number',
  },
  numberValue: {
    id: 'field.object.numberValue',
    defaultMessage: 'Number',
  },
  numberType: {
    id: 'field.object.numberType',
    defaultMessage: 'Type',
  },
  responsibleDepartments: {
    id: 'field.object.responsibleDepartments',
    defaultMessage: 'Responsible department',
  },
  collection: {
    id: 'field.object.collection',
    defaultMessage: 'Collection',
  },
  recordStatus: {
    id: 'field.object.recordStatus',
    defaultMessage: 'Record status',
  },
  briefDescriptions: {
    id: 'field.object.briefDescriptions',
    defaultMessage: 'Brief description',
  },
  distinguishingFeatures: {
    id: 'field.object.distinguishingFeatures',
    defaultMessage: 'Distinguishing features',
  },
  comments: {
    id: 'field.object.comments',
    defaultMessage: 'Comment',
  },
  computedCurrentLocation: {
    id: 'field.object.computedCurrentLocation',
    defaultMessage: 'Computed current location',
  },
  titleGroupList: {
    id: 'field.object.titleGroupList',
    defaultMessage: 'Title',
  },
  title: {
    id: 'field.object.title',
    defaultMessage: 'Title',
  },
  titleLanguage: {
    id: 'field.object.titleLanguage',
    defaultMessage: 'Language',
  },
  titleType: {
    id: 'field.object.titleType',
    defaultMessage: 'Type',
  },
  titleTranslationSubGroupList: {
    id: 'field.object.titleTranslationSubGroupList',
    defaultMessage: 'Translation',
  },
  titleTranslation: {
    id: 'field.object.titleTranslation',
    defaultMessage: 'Translation',
  },
  titleTranslationLanguage: {
    id: 'field.object.titleTranslationLanguage',
    defaultMessage: 'Language',
  },
  objectNameList: {
    id: 'field.object.objectNameList',
    defaultMessage: 'Object name',
  },
  objectName: {
    id: 'field.object.objectName',
    defaultMessage: 'Name',
  },
  objectNameCurrency: {
    id: 'field.object.objectNameCurrency',
    defaultMessage: 'Currency',
  },
  objectNameLevel: {
    id: 'field.object.objectNameLevel',
    defaultMessage: 'Level',
  },
  objectNameSystem: {
    id: 'field.object.objectNameSystem',
    defaultMessage: 'System',
  },
  objectNameType: {
    id: 'field.object.objectNameType',
    defaultMessage: 'Type',
  },
  objectNameLanguage: {
    id: 'field.object.objectNameLanguage',
    defaultMessage: 'Language',
  },
  objectNameNote: {
    id: 'field.object.objectNameNote',
    defaultMessage: 'Note',
  },
  copyNumber: {
    id: 'field.object.copyNumber',
    defaultMessage: 'Copy number',
  },
  objectStatusList: {
    id: 'field.object.objectStatusList',
    defaultMessage: 'Object status',
  },
  sex: {
    id: 'field.object.sex',
    defaultMessage: 'Sex',
  },
  phase: {
    id: 'field.object.phase',
    defaultMessage: 'Phase',
  },
  forms: {
    id: 'field.object.forms',
    defaultMessage: 'Form',
  },
  editionNumber: {
    id: 'field.object.editionNumber',
    defaultMessage: 'Edition number',
  },
  ageGroup: {
    id: 'field.object.ageGroup',
    defaultMessage: 'Age',
  },
  age: {
    id: 'field.object.age',
    defaultMessage: 'Age',
  },
  ageQualifier: {
    id: 'field.object.ageQualifier',
    defaultMessage: 'Qualifier',
  },
  ageUnit: {
    id: 'field.object.ageUnit',
    defaultMessage: 'Unit',
  },
  styles: {
    id: 'field.object.styles',
    defaultMessage: 'Style',
  },
  colors: {
    id: 'field.object.colors',
    defaultMessage: 'Color',
  },
  materialGroup: {
    id: 'field.object.materialGroup',
    defaultMessage: 'Material',
  },
  material: {
    id: 'field.object.material',
    defaultMessage: 'Material',
  },
  materialComponent: {
    id: 'field.object.materialComponent',
    defaultMessage: 'Material component',
  },
  materialComponentNote: {
    id: 'field.object.materialComponentNote',
    defaultMessage: 'Material component note',
  },
  materialName: {
    id: 'field.object.materialName',
    defaultMessage: 'Material name',
  },
  materialSource: {
    id: 'field.object.materialSource',
    defaultMessage: 'Material source',
  },
  physicalDescription: {
    id: 'field.object.physicalDescription',
    defaultMessage: 'Physical description',
  },
  objectComponentGroup: {
    id: 'field.object.objectComponentGroup',
    defaultMessage: 'Object component',
  },
  objectComponentName: {
    id: 'field.object.objectComponentName',
    defaultMessage: 'Name',
  },
  objectComponentInformation: {
    id: 'field.object.objectComponentInformation',
    defaultMessage: 'Information',
  },
  technicalAttributeGroup: {
    id: 'field.object.technicalAttributeGroup',
    defaultMessage: 'Technical attribute',
  },
  technicalAttribute: {
    id: 'field.object.technicalAttribute',
    defaultMessage: 'Attribute',
  },
  technicalAttributeMeasurement: {
    id: 'field.object.technicalAttributeMeasurement',
    defaultMessage: 'Measurement',
  },
  technicalAttributeMeasurementUnit: {
    id: 'field.object.technicalAttributeMeasurementUnit',
    defaultMessage: 'Unit',
  },
  measuredPartGroupList: {
    id: 'field.object.measuredPartGroup',
    defaultMessage: 'Dimensions',
  },
  measuredPart: {
    id: 'field.object.measuredPart',
    defaultMessage: 'Part',
  },
  dimensionSummary: {
    id: 'field.object.dimensionSummary',
    defaultMessage: 'Summary',
  },
  dimensionSubGroup: {
    id: 'field.object.dimensionSubGroup',
    defaultMessage: 'Measurements',
  },
  dimension: {
    id: 'field.object.dimension',
    defaultMessage: 'Dimension',
  },
  measuredBy: {
    id: 'field.object.measuredBy',
    defaultMessage: 'Measured by',
  },
  measurementMethod: {
    id: 'field.object.measurementMethod',
    defaultMessage: 'Method',
  },
  value: {
    id: 'field.object.value',
    defaultMessage: 'Value',
  },
  measurementUnit: {
    id: 'field.object.measurementUnit',
    defaultMessage: 'Unit',
  },
  valueQualifier: {
    id: 'field.object.valueQualifier',
    defaultMessage: 'Qualifier',
  },
  valueDate: {
    id: 'field.object.valueDate',
    defaultMessage: 'Date',
  },
  contentDescription: {
    id: 'field.object.contentDescription',
    defaultMessage: 'Description',
  },
  contentLanguages: {
    id: 'field.object.contentLanguages',
    defaultMessage: 'Language',
  },
  contentActivities: {
    id: 'field.object.contentActivities',
    defaultMessage: 'Activity',
  },
  contentConcepts: {
    id: 'field.object.contentConcepts',
    defaultMessage: 'Concept',
  },
  contentDateGroup: {
    id: 'field.object.contentDateGroup',
    defaultMessage: 'Date',
  },
  contentPositions: {
    id: 'field.object.contentPositions',
    defaultMessage: 'Position',
  },
  contentObjectGroup: {
    id: 'field.object.contentObjectGroup',
    defaultMessage: 'Object',
  },
  contentObject: {
    id: 'field.object.contentObject',
    defaultMessage: 'Name',
  },
  contentObjectType: {
    id: 'field.object.contentObjectType',
    defaultMessage: 'Type',
  },
  contentPeoples: {
    id: 'field.object.contentPeoples',
    defaultMessage: 'People',
  },
  contentPersons: {
    id: 'field.object.contentPersons',
    defaultMessage: 'Person',
  },
  contentPlaces: {
    id: 'field.object.contentPlaces',
    defaultMessage: 'Place',
  },
  contentScripts: {
    id: 'field.object.contentScripts',
    defaultMessage: 'Script',
  },
  contentOrganizations: {
    id: 'field.object.contentOrganizations',
    defaultMessage: 'Organization',
  },
  contentEventNameGroup: {
    id: 'field.object.contentEventNameGroup',
    defaultMessage: 'Event',
  },
  contentEventName: {
    id: 'field.object.contentEventName',
    defaultMessage: 'Name',
  },
  contentEventNameType: {
    id: 'field.object.contentEventNameType',
    defaultMessage: 'Type',
  },
  contentOtherGroup: {
    id: 'field.object.contentOtherGroup',
    defaultMessage: 'Other',
  },
  contentOther: {
    id: 'field.object.contentOther',
    defaultMessage: 'Name',
  },
  contentOtherType: {
    id: 'field.object.contentOtherType',
    defaultMessage: 'Type',
  },
  contentNote: {
    id: 'field.object.contentNote',
    defaultMessage: 'Note',
  },
  inscriptionContent: {
    id: 'field.object.inscriptionContent',
    defaultMessage: 'Inscription content',
  },
  inscriptionContentInscriber: {
    id: 'field.object.inscriptionContentInscriber',
    defaultMessage: 'Inscriber',
  },
  inscriptionContentLanguage: {
    id: 'field.object.inscriptionContentLanguage',
    defaultMessage: 'Language',
  },
  inscriptionContentDateGroup: {
    id: 'field.object.inscriptionContentDateGroup',
    defaultMessage: 'Date',
  },
  inscriptionContentPosition: {
    id: 'field.object.inscriptionContentPosition',
    defaultMessage: 'Position',
  },
  inscriptionContentScript: {
    id: 'field.object.inscriptionContentScript',
    defaultMessage: 'Script',
  },
  inscriptionContentType: {
    id: 'field.object.inscriptionContentType',
    defaultMessage: 'Type',
  },
  inscriptionContentMethod: {
    id: 'field.object.inscriptionContentMethod',
    defaultMessage: 'Method',
  },
  inscriptionContentInterpretation: {
    id: 'field.object.inscriptionContentInterpretation',
    defaultMessage: 'Interpretation',
  },
  inscriptionContentTranslation: {
    id: 'field.object.inscriptionContentTranslation',
    defaultMessage: 'Translation',
  },
  inscriptionContentTransliteration: {
    id: 'field.object.inscriptionContentTransliteration',
    defaultMessage: 'Transliteration',
  },
  inscriptionDescription: {
    id: 'field.object.inscriptionDescription',
    defaultMessage: 'Inscription description',
  },
  inscriptionDescriptionInscriber: {
    id: 'field.object.inscriptionDescriptionInscriber',
    defaultMessage: 'Inscriber',
  },
  inscriptionDescriptionDateGroup: {
    id: 'field.object.inscriptionDescriptionDateGroup',
    defaultMessage: 'Date',
  },
  inscriptionDescriptionPosition: {
    id: 'field.object.inscriptionDescriptionPosition',
    defaultMessage: 'Position',
  },
  inscriptionDescriptionType: {
    id: 'field.object.inscriptionDescriptionType',
    defaultMessage: 'Type',
  },
  inscriptionDescriptionMethod: {
    id: 'field.object.inscriptionDescriptionMethod',
    defaultMessage: 'Method',
  },
  inscriptionDescriptionInterpretation: {
    id: 'field.object.inscriptionDescriptionInterpretation',
    defaultMessage: 'Interpretation',
  },
  objectProductionDateGroupList: {
    id: 'field.object.objectProductionDateGroupList',
    defaultMessage: 'Production date',
  },
  techniqueGroup: {
    id: 'field.object.techniqueGroup',
    defaultMessage: 'Production technique',
  },
  technique: {
    id: 'field.object.technique',
    defaultMessage: 'Technique',
  },
  techniqueType: {
    id: 'field.object.techniqueType',
    defaultMessage: 'Type',
  },
  objectProductionPlaceGroup: {
    id: 'field.object.objectProductionPlaceGroup',
    defaultMessage: 'Production place',
  },
  objectProductionPlace: {
    id: 'field.object.objectProductionPlace',
    defaultMessage: 'Place',
  },
  objectProductionPlaceRole: {
    id: 'field.object.objectProductionPlaceRole',
    defaultMessage: 'Role',
  },
  objectProductionReasons: {
    id: 'field.object.objectProductionReasons',
    defaultMessage: 'Production reason',
  },
  objectProductionPeopleGroup: {
    id: 'field.object.objectProductionPeopleGroup',
    defaultMessage: 'Production people',
  },
  objectProductionPeople: {
    id: 'field.object.objectProductionPeople',
    defaultMessage: 'People',
  },
  objectProductionPeopleRole: {
    id: 'field.object.objectProductionPeopleRole',
    defaultMessage: 'Role',
  },
  objectProductionPersonGroup: {
    id: 'field.object.objectProductionPersonGroup',
    defaultMessage: 'Production person',
  },
  objectProductionPerson: {
    id: 'field.object.objectProductionPerson',
    defaultMessage: 'Person',
  },
  objectProductionPersonRole: {
    id: 'field.object.objectProductionPersonRole',
    defaultMessage: 'Role',
  },
  objectProductionOrganizationGroup: {
    id: 'field.object.objectProductionOrganizationGroup',
    defaultMessage: 'Production organization',
  },
  objectProductionOrganization: {
    id: 'field.object.objectProductionOrganization',
    defaultMessage: 'Organization',
  },
  objectProductionOrganizationRole: {
    id: 'field.object.objectProductionOrganizationRole',
    defaultMessage: 'Role',
  },
  objectProductionNote: {
    id: 'field.object.objectProductionNote',
    defaultMessage: 'Production note',
  },
  assocActivityGroup: {
    id: 'field.object.assocActivityGroup',
    defaultMessage: 'Associated activity',
  },
  assocActivity: {
    id: 'field.object.assocActivity',
    defaultMessage: 'Activity',
  },
  assocActivityType: {
    id: 'field.object.assocActivityType',
    defaultMessage: 'Type',
  },
  assocActivityNote: {
    id: 'field.object.assocActivityNote',
    defaultMessage: 'Note',
  },
  assocObjectGroup: {
    id: 'field.object.assocObjectGroup',
    defaultMessage: 'Associated object',
  },
  assocObject: {
    id: 'field.object.assocObject',
    defaultMessage: 'Object',
  },
  assocObjectType: {
    id: 'field.object.assocObjectType',
    defaultMessage: 'Type',
  },
  assocObjectNote: {
    id: 'field.object.assocObjectNote',
    defaultMessage: 'Note',
  },
  assocConceptGroup: {
    id: 'field.object.assocConceptGroup',
    defaultMessage: 'Associated concept',
  },
  assocConcept: {
    id: 'field.object.assocConcept',
    defaultMessage: 'Concept',
  },
  assocConceptType: {
    id: 'field.object.assocConceptType',
    defaultMessage: 'Type',
  },
  assocConceptNote: {
    id: 'field.object.assocConceptNote',
    defaultMessage: 'Note',
  },
  assocCulturalContextGroup: {
    id: 'field.object.assocCulturalContextGroup',
    defaultMessage: 'Associated cultural affinity',
  },
  assocCulturalContext: {
    id: 'field.object.assocCulturalContext',
    defaultMessage: 'Cultural affinity',
  },
  assocCulturalContextType: {
    id: 'field.object.assocCulturalContextType',
    defaultMessage: 'Type',
  },
  assocCulturalContextNote: {
    id: 'field.object.assocCulturalContextNote',
    defaultMessage: 'Note',
  },
  assocOrganizationGroup: {
    id: 'field.object.assocOrganizationGroup',
    defaultMessage: 'Associated organization',
  },
  assocOrganization: {
    id: 'field.object.assocOrganization',
    defaultMessage: 'Organization',
  },
  assocOrganizationType: {
    id: 'field.object.assocOrganizationType',
    defaultMessage: 'Type',
  },
  assocOrganizationNote: {
    id: 'field.object.assocOrganizationNote',
    defaultMessage: 'Note',
  },
  assocPeopleGroup: {
    id: 'field.object.assocPeopleGroup',
    defaultMessage: 'Associated people',
  },
  assocPeople: {
    id: 'field.object.assocPeople',
    defaultMessage: 'People',
  },
  assocPeopleType: {
    id: 'field.object.assocPeopleType',
    defaultMessage: 'Type',
  },
  assocPeopleNote: {
    id: 'field.object.assocPeopleNote',
    defaultMessage: 'Note',
  },
  assocPersonGroup: {
    id: 'field.object.assocPersonGroup',
    defaultMessage: 'Associated person',
  },
  assocPerson: {
    id: 'field.object.assocPerson',
    defaultMessage: 'Person',
  },
  assocPersonType: {
    id: 'field.object.assocPersonType',
    defaultMessage: 'Type',
  },
  assocPersonNote: {
    id: 'field.object.assocPersonNote',
    defaultMessage: 'Note',
  },
  assocPlaceGroup: {
    id: 'field.object.assocPlaceGroup',
    defaultMessage: 'Associated place',
  },
  assocPlace: {
    id: 'field.object.assocPlace',
    defaultMessage: 'Place',
  },
  assocPlaceType: {
    id: 'field.object.assocPlaceType',
    defaultMessage: 'Type',
  },
  assocPlaceNote: {
    id: 'field.object.assocPlaceNote',
    defaultMessage: 'Note',
  },
  assocEventGroup: {
    id: 'field.object.assocEventGroup',
    defaultMessage: 'Associated event',
  },
  assocEventName: {
    id: 'field.object.assocEventName',
    defaultMessage: 'Event',
  },
  assocEventNameType: {
    id: 'field.object.assocEventNameType',
    defaultMessage: 'Type',
  },
  assocEventOrganizations: {
    id: 'field.object.assocEventOrganizations',
    defaultMessage: 'Associated event organization',
  },
  assocEventPeoples: {
    id: 'field.object.assocEventPeoples',
    defaultMessage: 'Associated event people',
  },
  assocEventPersons: {
    id: 'field.object.assocEventPersons',
    defaultMessage: 'Associated event person',
  },
  assocEventPlaces: {
    id: 'field.object.assocEventPlaces',
    defaultMessage: 'Associated event place',
  },
  assocEventNote: {
    id: 'field.object.assocEventNote',
    defaultMessage: 'Associated event note',
  },
  assocDateGroup: {
    id: 'field.object.assocDateGroup',
    defaultMessage: 'Associated date',
  },
  assocStructuredDateGroup: {
    id: 'field.object.assocStructuredDateGroup',
    defaultMessage: 'Date',
  },
  assocDateType: {
    id: 'field.object.assocDateType',
    defaultMessage: 'Type',
  },
  assocDateNote: {
    id: 'field.object.assocDateNote',
    defaultMessage: 'Note',
  },
  objectHistoryNote: {
    id: 'field.object.objectHistoryNote',
    defaultMessage: 'Object history note',
  },
  usageGroup: {
    id: 'field.object.usageGroup',
    defaultMessage: 'Usage',
  },
  usage: {
    id: 'field.object.usage',
    defaultMessage: 'Usage',
  },
  usageNote: {
    id: 'field.object.usageNote',
    defaultMessage: 'Usage note',
  },
  owners: {
    id: 'field.object.owners',
    defaultMessage: 'Owner',
  },
  ownershipDateGroupList: {
    id: 'field.object.ownershipDateGroupList',
    defaultMessage: 'Ownership date',
  },
  ownershipAccess: {
    id: 'field.object.ownershipAccess',
    defaultMessage: 'Ownership access',
  },
  ownershipCategory: {
    id: 'field.object.ownershipCategory',
    defaultMessage: 'Ownership category',
  },
  ownershipPlace: {
    id: 'field.object.ownershipPlace',
    defaultMessage: 'Ownership place',
  },
  ownershipExchangeGroup: {
    id: 'field.object.ownershipExchangeGroup',
    defaultMessage: 'Ownership exchange',
  },
  ownershipExchangeMethod: {
    id: 'field.object.ownershipExchangeMethod',
    defaultMessage: 'Method',
  },
  ownershipExchangeNote: {
    id: 'field.object.ownershipExchangeNote',
    defaultMessage: 'Note',
  },
  ownershipExchangePriceCurrency: {
    id: 'field.object.ownershipExchangePriceCurrency',
    defaultMessage: 'Currency',
  },
  ownershipExchangePriceValue: {
    id: 'field.object.ownershipExchangePriceValue',
    defaultMessage: 'Price',
  },
  ownersPersonalExperience: {
    id: 'field.object.ownersPersonalExperience',
    defaultMessage: 'Owner\'s personal experience',
  },
  ownersPersonalResponse: {
    id: 'field.object.ownersPersonalResponse',
    defaultMessage: 'Owner\'s personal response',
  },
  ownersReferences: {
    id: 'field.object.ownersReferences',
    defaultMessage: 'Owner\'s reference',
  },
  ownersContributionNote: {
    id: 'field.object.ownersContributionNote',
    defaultMessage: 'Owner\'s contribution note',
  },
  viewersRole: {
    id: 'field.object.viewersRole',
    defaultMessage: 'Viewer\'s role',
  },
  viewersPersonalExperience: {
    id: 'field.object.viewersPersonalExperience',
    defaultMessage: 'Viewer\'s personal experience',
  },
  viewersPersonalResponse: {
    id: 'field.object.viewersPersonalResponse',
    defaultMessage: 'Viewer\'s personal response',
  },
  viewersReferences: {
    id: 'field.object.viewersReferences',
    defaultMessage: 'Viewer\'s reference',
  },
  viewersContributionNote: {
    id: 'field.object.viewersContributionNote',
    defaultMessage: 'Viewer\'s contribution note',
  },
  referenceGroup: {
    id: 'field.object.referenceGroup',
    defaultMessage: 'Reference information',
  },
  reference: {
    id: 'field.object.reference',
    defaultMessage: 'Reference',
  },
  referenceNote: {
    id: 'field.object.referenceNote',
    defaultMessage: 'Reference note',
  },
  fieldCollectionDateGroup: {
    id: 'field.object.fieldCollectionDateGroup',
    defaultMessage: 'Field collection date',
  },
  fieldCollectionMethods: {
    id: 'field.object.fieldCollectionMethods',
    defaultMessage: 'Field collection method',
  },
  fieldCollectionNote: {
    id: 'field.object.fieldCollectionNote',
    defaultMessage: 'Field collection note',
  },
  fieldCollectionNumber: {
    id: 'field.object.fieldCollectionNumber',
    defaultMessage: 'Field collection number',
  },
  fieldCollectionPlace: {
    id: 'field.object.fieldCollectionPlace',
    defaultMessage: 'Field collection place',
  },
  fieldCollectionSources: {
    id: 'field.object.fieldCollectionSources',
    defaultMessage: 'Field collection source',
  },
  fieldCollectors: {
    id: 'field.object.fieldCollectors',
    defaultMessage: 'Field collection collector',
  },
  fieldColEventNames: {
    id: 'field.object.fieldColEventNames',
    defaultMessage: 'Field collection event name',
  },
});
