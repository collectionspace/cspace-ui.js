import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default defineMessages({
  recordNameTitle: {
    id: 'recordNameTitle',
    description: 'The name of the record when used as a title.',
    defaultMessage: 'Object',
  },

  // Panels

  idPanel: {
    id: 'panel.idPanel.label',
    defaultMessage: 'Object Identification Information',
  },
  descPanel: {
    id: 'panel.descPanel.label',
    defaultMessage: 'Object Description Information',
  },
  contentPanel: {
    id: 'panel.contentPanel.label',
    defaultMessage: 'Content',
  },
  textInscriptPanel: {
    id: 'panel.textInscriptPanel.label',
    defaultMessage: 'Textual Inscription',
  },
  nonTextInscriptPanel: {
    id: 'panel.nonTextInscriptPanel.label',
    defaultMessage: 'Non-Textual Inscription',
  },
  prodPanel: {
    id: 'panel.prodPanel.label',
    defaultMessage: 'Object Production Information',
  },
  histPanel: {
    id: 'panel.histPanel.label',
    defaultMessage: 'Object History and Association Information',
  },
  assocPanel: {
    id: 'panel.assocPanel.label',
    defaultMessage: 'Associations',
  },
  ownerPanel: {
    id: 'panel.ownerPanel.label',
    defaultMessage: 'Object Owner\'s Contribution Information',
  },
  viewerPanel: {
    id: 'panel.viewerPanel.label',
    defaultMessage: 'Object Viewer\'s Contribution Information',
  },
  referencePanel: {
    id: 'panel.referencePanel.label',
    defaultMessage: 'Reference Information',
  },
  collectPanel: {
    id: 'panel.collectPanel.label',
    defaultMessage: 'Object Collection Information',
  },

  // Fields

  objectNumber: {
    id: 'field.objectNumber.label',
    defaultMessage: 'Identification number',
  },
  numberOfObjects: {
    id: 'field.numberOfObjects.label',
    defaultMessage: 'Number of objects',
  },
  otherNumberList: {
    id: 'field.otherNumberList.label',
    defaultMessage: 'Other number',
  },
  numberValue: {
    id: 'field.numberValue.label',
    defaultMessage: 'Number',
  },
  numberType: {
    id: 'field.numberType.label',
    defaultMessage: 'Type',
  },
  responsibleDepartments: {
    id: 'field.responsibleDepartments.label',
    defaultMessage: 'Responsible department',
  },
  collection: {
    id: 'field.collection.label',
    defaultMessage: 'Collection',
  },
  recordStatus: {
    id: 'field.recordStatus.label',
    defaultMessage: 'Record status',
  },
  briefDescriptions: {
    id: 'field.briefDescriptions.label',
    defaultMessage: 'Brief description',
  },
  distinguishingFeatures: {
    id: 'field.distinguishingFeatures.label',
    defaultMessage: 'Distinguishing features',
  },
  comments: {
    id: 'field.comments.label',
    defaultMessage: 'Comment',
  },
  computedCurrentLocation: {
    id: 'field.computedCurrentLocation.label',
    defaultMessage: 'Computed current location',
  },
  titleGroupList: {
    id: 'field.titleGroupList.label',
    defaultMessage: 'Title',
  },
  title: {
    id: 'field.title.label',
    defaultMessage: 'Title',
  },
  titleLanguage: {
    id: 'field.titleLanguage.label',
    defaultMessage: 'Language',
  },
  titleType: {
    id: 'field.titleType.label',
    defaultMessage: 'Type',
  },
  titleTranslationSubGroupList: {
    id: 'field.titleTranslationSubGroupList.label',
    defaultMessage: 'Translation',
  },
  titleTranslation: {
    id: 'field.titleTranslation.label',
    defaultMessage: 'Translation',
  },
  titleTranslationLanguage: {
    id: 'field.titleTranslationLanguage.label',
    defaultMessage: 'Language',
  },
  objectNameList: {
    id: 'field.objectNameList.label',
    defaultMessage: 'Object name',
  },
  objectName: {
    id: 'field.objectName.label',
    defaultMessage: 'Name',
  },
  objectNameCurrency: {
    id: 'field.objectNameCurrency.label',
    defaultMessage: 'Currency',
  },
  objectNameLevel: {
    id: 'field.objectNameLevel.label',
    defaultMessage: 'Level',
  },
  objectNameSystem: {
    id: 'field.objectNameSystem.label',
    defaultMessage: 'System',
  },
  objectNameType: {
    id: 'field.objectNameType.label',
    defaultMessage: 'Type',
  },
  objectNameLanguage: {
    id: 'field.objectNameLanguage.label',
    defaultMessage: 'Language',
  },
  objectNameNote: {
    id: 'field.objectNameNote.label',
    defaultMessage: 'Note',
  },
  copyNumber: {
    id: 'field.copyNumber.label',
    defaultMessage: 'Copy number',
  },
  objectStatusList: {
    id: 'field.objectStatusList.label',
    defaultMessage: 'Object status',
  },
  sex: {
    id: 'field.sex.label',
    defaultMessage: 'Sex',
  },
  phase: {
    id: 'field.phase.label',
    defaultMessage: 'Phase',
  },
  forms: {
    id: 'field.forms.label',
    defaultMessage: 'Form',
  },
  editionNumber: {
    id: 'field.editionNumber.label',
    defaultMessage: 'Edition number',
  },
  ageGroup: {
    id: 'field.ageGroup.label',
    defaultMessage: 'Age',
  },
  age: {
    id: 'field.age.label',
    defaultMessage: 'Age',
  },
  ageQualifier: {
    id: 'field.ageQualifier.label',
    defaultMessage: 'Age qualifier',
  },
  ageUnit: {
    id: 'field.ageUnit.label',
    defaultMessage: 'Unit',
  },
  styles: {
    id: 'field.styles.label',
    defaultMessage: 'Style',
  },
  colors: {
    id: 'field.colors.label',
    defaultMessage: 'Color',
  },
  materialGroup: {
    id: 'field.materialGroup.label',
    defaultMessage: 'Material',
  },
  material: {
    id: 'field.material.label',
    defaultMessage: 'Material',
  },
  materialComponent: {
    id: 'field.materialComponent.label',
    defaultMessage: 'Material component',
  },
  materialComponentNote: {
    id: 'field.materialComponentNote.label',
    defaultMessage: 'Material component note',
  },
  materialName: {
    id: 'field.materialName.label',
    defaultMessage: 'Material name',
  },
  materialSource: {
    id: 'field.materialSource.label',
    defaultMessage: 'Material source',
  },
  physicalDescription: {
    id: 'field.physicalDescription.label',
    defaultMessage: 'Physical description',
  },
  objectComponentGroup: {
    id: 'field.objectComponentGroup.label',
    defaultMessage: 'Object component',
  },
  objectComponentName: {
    id: 'field.objectComponentName.label',
    defaultMessage: 'Name',
  },
  objectComponentInformation: {
    id: 'field.objectComponentInformation.label',
    defaultMessage: 'Information',
  },
  technicalAttributeGroup: {
    id: 'field.technicalAttributeGroup.label',
    defaultMessage: 'Technical attribute',
  },
  technicalAttribute: {
    id: 'field.technicalAttribute.label',
    defaultMessage: 'Attribute',
  },
  technicalAttributeMeasurement: {
    id: 'field.technicalAttributeMeasurement.label',
    defaultMessage: 'Measurement',
  },
  technicalAttributeMeasurementUnit: {
    id: 'field.technicalAttributeMeasurementUnit.label',
    defaultMessage: 'Unit',
  },
  measuredPartGroupList: {
    id: 'field.measuredPartGroup.label',
    defaultMessage: 'Dimensions',
  },
  measuredPart: {
    id: 'field.measuredPart.label',
    defaultMessage: 'Part',
  },
  dimensionSummary: {
    id: 'field.dimensionSummary.label',
    defaultMessage: 'Summary',
  },
  dimensionSubGroup: {
    id: 'field.dimensionSubGroup.label',
    defaultMessage: 'Measurements',
  },
  dimension: {
    id: 'field.dimension.label',
    defaultMessage: 'Dimension',
  },
  measuredBy: {
    id: 'field.measuredBy.label',
    defaultMessage: 'Measured by',
  },
  measurementMethod: {
    id: 'field.measurementMethod.label',
    defaultMessage: 'Method',
  },
  value: {
    id: 'field.value.label',
    defaultMessage: 'Value',
  },
  measurementUnit: {
    id: 'field.measurementUnit.label',
    defaultMessage: 'Unit',
  },
  valueQualifier: {
    id: 'field.valueQualifier.label',
    defaultMessage: 'Qualifier',
  },
  valueDate: {
    id: 'field.valueDate.label',
    defaultMessage: 'Date',
  },
  contentDescription: {
    id: 'field.contentDescription.label',
    defaultMessage: 'Description',
  },
  contentLanguages: {
    id: 'field.contentLanguages.label',
    defaultMessage: 'Language',
  },
  contentActivities: {
    id: 'field.contentActivities.label',
    defaultMessage: 'Activity',
  },
  contentConcepts: {
    id: 'field.contentConcepts.label',
    defaultMessage: 'Concept',
  },
  contentConcept: {
    id: 'field.contentConcept.label',
    defaultMessage: 'Concept',
  },
  contentDate: {
    id: 'field.contentDate.label',
    defaultMessage: 'Date',
  },
  contentPositions: {
    id: 'field.contentPositions.label',
    defaultMessage: 'Position',
  },
  contentObjectGroup: {
    id: 'field.contentObjectGroup.label',
    defaultMessage: 'Object',
  },
  contentObject: {
    id: 'field.contentObject.label',
    defaultMessage: 'Name',
  },
  contentObjectType: {
    id: 'field.contentObjectType.label',
    defaultMessage: 'Type',
  },
  contentPeoples: {
    id: 'field.contentPeoples.label',
    defaultMessage: 'People',
  },
  contentPersons: {
    id: 'field.contentPersons.label',
    defaultMessage: 'Person',
  },
  contentPerson: {
    id: 'field.contentPerson.label',
    defaultMessage: 'Person',
  },
  contentPlaces: {
    id: 'field.contentPlaces.label',
    defaultMessage: 'Place',
  },
  contentScripts: {
    id: 'field.contentScripts.label',
    defaultMessage: 'Script',
  },
  contentOrganizations: {
    id: 'field.contentOrganizations.label',
    defaultMessage: 'Organization',
  },
  contentOrganization: {
    id: 'field.contentOrganization.label',
    defaultMessage: 'Organization',
  },
  contentEventNameGroup: {
    id: 'field.contentEventNameGroup.label',
    defaultMessage: 'Event',
  },
  contentEventName: {
    id: 'field.contentEventName.label',
    defaultMessage: 'Name',
  },
  contentEventNameType: {
    id: 'field.contentEventNameType.label',
    defaultMessage: 'Type',
  },
  contentOtherGroup: {
    id: 'field.contentOtherGroup.label',
    defaultMessage: 'Other',
  },
  contentOther: {
    id: 'field.contentOther.label',
    defaultMessage: 'Name',
  },
  contentOtherType: {
    id: 'field.contentOtherType.label',
    defaultMessage: 'Type',
  },
  contentNote: {
    id: 'field.contentNote.label',
    defaultMessage: 'Note',
  },
  inscriptionContent: {
    id: 'field.inscriptionContent.label',
    defaultMessage: 'Inscription content',
  },
  inscriptionContentInscriber: {
    id: 'field.inscriptionContentInscriber.label',
    defaultMessage: 'Inscriber',
  },
  inscriptionContentLanguage: {
    id: 'field.inscriptionContentLanguage.label',
    defaultMessage: 'Language',
  },
  inscriptionContentDateGroup: {
    id: 'field.inscriptionContentDateGroup.label',
    defaultMessage: 'Date',
  },
  inscriptionContentPosition: {
    id: 'field.inscriptionContentPosition.label',
    defaultMessage: 'Position',
  },
  inscriptionContentScript: {
    id: 'field.inscriptionContentScript.label',
    defaultMessage: 'Script',
  },
  inscriptionContentType: {
    id: 'field.inscriptionContentType.label',
    defaultMessage: 'Type',
  },
  inscriptionContentMethod: {
    id: 'field.inscriptionContentMethod.label',
    defaultMessage: 'Method',
  },
  inscriptionContentInterpretation: {
    id: 'field.inscriptionContentInterpretation.label',
    defaultMessage: 'Interpretation',
  },
  inscriptionContentTranslation: {
    id: 'field.inscriptionContentTranslation.label',
    defaultMessage: 'Translation',
  },
  inscriptionContentTransliteration: {
    id: 'field.inscriptionContentTransliteration.label',
    defaultMessage: 'Transliteration',
  },
  inscriptionDescription: {
    id: 'field.inscriptionDescription.label',
    defaultMessage: 'Inscription description',
  },
  inscriptionDescriptionInscriber: {
    id: 'field.inscriptionDescriptionInscriber.label',
    defaultMessage: 'Inscriber',
  },
  inscriptionDescriptionDateGroup: {
    id: 'field.inscriptionDescriptionDateGroup.label',
    defaultMessage: 'Date',
  },
  inscriptionDescriptionPosition: {
    id: 'field.inscriptionDescriptionPosition.label',
    defaultMessage: 'Position',
  },
  inscriptionDescriptionType: {
    id: 'field.inscriptionDescriptionType.label',
    defaultMessage: 'Type',
  },
  inscriptionDescriptionMethod: {
    id: 'field.inscriptionDescriptionMethod.label',
    defaultMessage: 'Method',
  },
  inscriptionDescriptionInterpretation: {
    id: 'field.inscriptionDescriptionInterpretation.label',
    defaultMessage: 'Interpretation',
  },
  objectProductionDateGroupList: {
    id: 'field.objectProductionDateGroupList.label',
    defaultMessage: 'Production date',
  },
  techniqueGroup: {
    id: 'field.techniqueGroup.label',
    defaultMessage: 'Production technique',
  },
  technique: {
    id: 'field.technique.label',
    defaultMessage: 'Technique',
  },
  techniqueType: {
    id: 'field.techniqueType.label',
    defaultMessage: 'Type',
  },
  objectProductionPlaceGroup: {
    id: 'field.objectProductionPlaceGroup.label',
    defaultMessage: 'Production place',
  },
  objectProductionPlace: {
    id: 'field.objectProductionPlace.label',
    defaultMessage: 'Place',
  },
  objectProductionPlaceRole: {
    id: 'field.objectProductionPlaceRole.label',
    defaultMessage: 'Role',
  },
  objectProductionReasons: {
    id: 'field.objectProductionReasons.label',
    defaultMessage: 'Production reason',
  },
  objectProductionPeopleGroup: {
    id: 'field.objectProductionPeopleGroup.label',
    defaultMessage: 'Production people',
  },
  objectProductionPeople: {
    id: 'field.objectProductionPeople.label',
    defaultMessage: 'People',
  },
  objectProductionPeopleRole: {
    id: 'field.objectProductionPeopleRole.label',
    defaultMessage: 'Role',
  },
  objectProductionPersonGroup: {
    id: 'field.objectProductionPersonGroup.label',
    defaultMessage: 'Production person',
  },
  objectProductionPerson: {
    id: 'field.objectProductionPerson.label',
    defaultMessage: 'Person',
  },
  objectProductionPersonRole: {
    id: 'field.objectProductionPersonRole.label',
    defaultMessage: 'Role',
  },
  objectProductionOrganizationGroup: {
    id: 'field.objectProductionOrganizationGroup.label',
    defaultMessage: 'Production organization',
  },
  objectProductionOrganization: {
    id: 'field.objectProductionOrganization.label',
    defaultMessage: 'Organization',
  },
  objectProductionOrganizationRole: {
    id: 'field.objectProductionOrganizationRole.label',
    defaultMessage: 'Role',
  },
  objectProductionNote: {
    id: 'field.objectProductionNote.label',
    defaultMessage: 'Production note',
  },
  assocActivityGroup: {
    id: 'field.assocActivityGroup.label',
    defaultMessage: 'Associated activity',
  },
  assocActivity: {
    id: 'field.assocActivity.label',
    defaultMessage: 'Activity',
  },
  assocActivityType: {
    id: 'field.assocActivityType.label',
    defaultMessage: 'Type',
  },
  assocActivityNote: {
    id: 'field.assocActivityNote.label',
    defaultMessage: 'Note',
  },
  assocObjectGroup: {
    id: 'field.assocObjectGroup.label',
    defaultMessage: 'Associated object',
  },
  assocObject: {
    id: 'field.assocObject.label',
    defaultMessage: 'Object',
  },
  assocObjectType: {
    id: 'field.assocObjectType.label',
    defaultMessage: 'Type',
  },
  assocObjectNote: {
    id: 'field.assocObjectNote.label',
    defaultMessage: 'Note',
  },
  assocConceptGroup: {
    id: 'field.assocConceptGroup.label',
    defaultMessage: 'Associated concept',
  },
  assocConcept: {
    id: 'field.assocConcept.label',
    defaultMessage: 'Concept',
  },
  assocConceptType: {
    id: 'field.assocConceptType.label',
    defaultMessage: 'Type',
  },
  assocConceptNote: {
    id: 'field.assocConceptNote.label',
    defaultMessage: 'Note',
  },
  assocCulturalContextGroup: {
    id: 'field.assocCulturalContextGroup.label',
    defaultMessage: 'Associated cultural affinity',
  },
  assocCulturalContext: {
    id: 'field.assocCulturalContext.label',
    defaultMessage: 'Cultural affinity',
  },
  assocCulturalContextType: {
    id: 'field.assocCulturalContextType.label',
    defaultMessage: 'Type',
  },
  assocCulturalContextNote: {
    id: 'field.assocCulturalContextNote.label',
    defaultMessage: 'Note',
  },
  assocOrganizationGroup: {
    id: 'field.assocOrganizationGroup.label',
    defaultMessage: 'Associated organization',
  },
  assocOrganization: {
    id: 'field.assocOrganization.label',
    defaultMessage: 'Organization',
  },
  assocOrganizationType: {
    id: 'field.assocOrganizationType.label',
    defaultMessage: 'Type',
  },
  assocOrganizationNote: {
    id: 'field.assocOrganizationNote.label',
    defaultMessage: 'Note',
  },
  assocPeopleGroup: {
    id: 'field.assocPeopleGroup.label',
    defaultMessage: 'Associated people',
  },
  assocPeople: {
    id: 'field.assocPeople.label',
    defaultMessage: 'People',
  },
  assocPeopleType: {
    id: 'field.assocPeopleType.label',
    defaultMessage: 'Type',
  },
  assocPeopleNote: {
    id: 'field.assocPeopleNote.label',
    defaultMessage: 'Note',
  },
  assocPersonGroup: {
    id: 'field.assocPersonGroup.label',
    defaultMessage: 'Associated person',
  },
  assocPerson: {
    id: 'field.assocPerson.label',
    defaultMessage: 'Person',
  },
  assocPersonType: {
    id: 'field.assocPersonType.label',
    defaultMessage: 'Type',
  },
  assocPersonNote: {
    id: 'field.assocPersonNote.label',
    defaultMessage: 'Note',
  },
  assocPlaceGroup: {
    id: 'field.assocPlaceGroup.label',
    defaultMessage: 'Associated place',
  },
  assocPlace: {
    id: 'field.assocPlace.label',
    defaultMessage: 'Place',
  },
  assocPlaceType: {
    id: 'field.assocPlaceType.label',
    defaultMessage: 'Type',
  },
  assocPlaceNote: {
    id: 'field.assocPlaceNote.label',
    defaultMessage: 'Note',
  },
  assocEventGroup: {
    id: 'field.assocEventGroup.label',
    defaultMessage: 'Associated event',
  },
  assocEventName: {
    id: 'field.assocEventName.label',
    defaultMessage: 'Event',
  },
  assocEventNameType: {
    id: 'field.assocEventNameType.label',
    defaultMessage: 'Type',
  },
  assocEventOrganizations: {
    id: 'field.assocEventOrganizations.label',
    defaultMessage: 'Associated event organization',
  },
  assocEventPeoples: {
    id: 'field.assocEventPeoples.label',
    defaultMessage: 'Associated event people',
  },
  assocEventPersons: {
    id: 'field.assocEventPersons.label',
    defaultMessage: 'Associated event person',
  },
  assocEventPlaces: {
    id: 'field.assocEventPlaces.label',
    defaultMessage: 'Associated event place',
  },
  assocEventNote: {
    id: 'field.assocEventNote.label',
    defaultMessage: 'Associated event note',
  },
  assocDateGroup: {
    id: 'field.assocDateGroup.label',
    defaultMessage: 'Associated date',
  },
  assocStructuredDateGroup: {
    id: 'field.assocStructuredDateGroup.label',
    defaultMessage: 'Date',
  },
  assocDateType: {
    id: 'field.assocDateType.label',
    defaultMessage: 'Type',
  },
  assocDateNote: {
    id: 'field.assocDateNote.label',
    defaultMessage: 'Note',
  },
  objectHistoryNote: {
    id: 'field.objectHistoryNote.label',
    defaultMessage: 'Object history note',
  },
  usageGroup: {
    id: 'field.usageGroup.label',
    defaultMessage: 'Usage',
  },
  usage: {
    id: 'field.usage.label',
    defaultMessage: 'Usage',
  },
  usageNote: {
    id: 'field.usageNote.label',
    defaultMessage: 'Usage note',
  },
  owners: {
    id: 'field.owners.label',
    defaultMessage: 'Owner',
  },
  ownershipDateGroupList: {
    id: 'field.ownershipDateGroupList.label',
    defaultMessage: 'Ownership date',
  },
  ownershipAccess: {
    id: 'field.ownershipAccess.label',
    defaultMessage: 'Ownership access',
  },
  ownershipCategory: {
    id: 'field.ownershipCategory.label',
    defaultMessage: 'Ownership category',
  },
  ownershipPlace: {
    id: 'field.ownershipPlace.label',
    defaultMessage: 'Ownership place',
  },
  ownershipExchangeGroup: {
    id: 'field.ownershipExchangeGroup.label',
    defaultMessage: 'Ownership exchange',
  },
  ownershipExchangeMethod: {
    id: 'field.ownershipExchangeMethod.label',
    defaultMessage: 'Method',
  },
  ownershipExchangeNote: {
    id: 'field.ownershipExchangeNote.label',
    defaultMessage: 'Note',
  },
  ownershipExchangePriceCurrency: {
    id: 'field.ownershipExchangePriceCurrency.label',
    defaultMessage: 'Currency',
  },
  ownershipExchangePriceValue: {
    id: 'field.ownershipExchangePriceValue.label',
    defaultMessage: 'Price',
  },
  ownersPersonalExperience: {
    id: 'field.ownersPersonalExperience.label',
    defaultMessage: 'Owner\'s personal experience',
  },
  ownersPersonalResponse: {
    id: 'field.ownersPersonalResponse.label',
    defaultMessage: 'Owner\'s personal response',
  },
  ownersReferences: {
    id: 'field.ownersReferences.label',
    defaultMessage: 'Owner\'s reference',
  },
  ownersContributionNote: {
    id: 'field.ownersContributionNote.label',
    defaultMessage: 'Owner\'s contribution note',
  },
  viewersRole: {
    id: 'field.viewersRole.label',
    defaultMessage: 'Viewer\'s role',
  },
  viewersPersonalExperience: {
    id: 'field.viewersPersonalExperience.label',
    defaultMessage: 'Viewer\'s personal experience',
  },
  viewersPersonalResponse: {
    id: 'field.viewersPersonalResponse.label',
    defaultMessage: 'Viewer\'s personal response',
  },
  viewersReferences: {
    id: 'field.viewersReferences.label',
    defaultMessage: 'Viewer\'s reference',
  },
  viewersContributionNote: {
    id: 'field.viewersContributionNote.label',
    defaultMessage: 'Viewer\'s contribution note',
  },
  referenceGroup: {
    id: 'field.referenceGroup.label',
    defaultMessage: 'Reference information',
  },
  reference: {
    id: 'field.reference.label',
    defaultMessage: 'Reference',
  },
  referenceNote: {
    id: 'field.referenceNote.label',
    defaultMessage: 'Reference note',
  },
  fieldCollectionDate: {
    id: 'field.fieldCollectionDate.label',
    defaultMessage: 'Field collection date',
  },
  fieldCollectionMethods: {
    id: 'field.fieldCollectionMethods.label',
    defaultMessage: 'Field collection method',
  },
  fieldCollectionNote: {
    id: 'field.fieldCollectionNote.label',
    defaultMessage: 'Field collection note',
  },
  fieldCollectionNumber: {
    id: 'field.fieldCollectionNumber.label',
    defaultMessage: 'Field collection number',
  },
  fieldCollectionPlace: {
    id: 'field.fieldCollectionPlace.label',
    defaultMessage: 'Field collection place',
  },
  fieldCollectionSources: {
    id: 'field.fieldCollectionSources.label',
    defaultMessage: 'Field collection source',
  },
  fieldCollectors: {
    id: 'field.fieldCollectors.label',
    defaultMessage: 'Field collection collector',
  },
  fieldColEventNames: {
    id: 'field.fieldColEventNames.label',
    defaultMessage: 'Field collection event name',
  },
});
