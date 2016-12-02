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

  // Panels

  idPanel: {
    id: 'panel.object.id.label',
    defaultMessage: 'Object Identification Information',
  },
  descPanel: {
    id: 'panel.object.desc.label',
    defaultMessage: 'Object Description Information',
  },
  contentPanel: {
    id: 'panel.object.content.label',
    defaultMessage: 'Content',
  },
  textInscriptPanel: {
    id: 'panel.object.textInscript.label',
    defaultMessage: 'Textual Inscription',
  },
  nonTextInscriptPanel: {
    id: 'panel.object.nonTextInscript.label',
    defaultMessage: 'Non-Textual Inscription',
  },
  prodPanel: {
    id: 'panel.object.prod.label',
    defaultMessage: 'Object Production Information',
  },
  histPanel: {
    id: 'panel.object.hist.label',
    defaultMessage: 'Object History and Association Information',
  },
  assocPanel: {
    id: 'panel.object.assoc.label',
    defaultMessage: 'Associations',
  },
  ownerPanel: {
    id: 'panel.object.owner.label',
    defaultMessage: 'Object Owner\'s Contribution Information',
  },
  viewerPanel: {
    id: 'panel.object.viewer.label',
    defaultMessage: 'Object Viewer\'s Contribution Information',
  },
  referencePanel: {
    id: 'panel.object.reference.label',
    defaultMessage: 'Reference Information',
  },
  collectPanel: {
    id: 'panel.object.collect.label',
    defaultMessage: 'Object Collection Information',
  },

  // Fields

  objectNumber: {
    id: 'field.object.objectNumber.label',
    defaultMessage: 'Identification number',
  },
  numberOfObjects: {
    id: 'field.object.numberOfObjects.label',
    defaultMessage: 'Number of objects',
  },
  otherNumberList: {
    id: 'field.object.otherNumberList.label',
    defaultMessage: 'Other number',
  },
  numberValue: {
    id: 'field.object.numberValue.label',
    defaultMessage: 'Number',
  },
  numberType: {
    id: 'field.object.numberType.label',
    defaultMessage: 'Type',
  },
  responsibleDepartments: {
    id: 'field.object.responsibleDepartments.label',
    defaultMessage: 'Responsible department',
  },
  collection: {
    id: 'field.object.collection.label',
    defaultMessage: 'Collection',
  },
  recordStatus: {
    id: 'field.object.recordStatus.label',
    defaultMessage: 'Record status',
  },
  briefDescriptions: {
    id: 'field.object.briefDescriptions.label',
    defaultMessage: 'Brief description',
  },
  distinguishingFeatures: {
    id: 'field.object.distinguishingFeatures.label',
    defaultMessage: 'Distinguishing features',
  },
  comments: {
    id: 'field.object.comments.label',
    defaultMessage: 'Comment',
  },
  computedCurrentLocation: {
    id: 'field.object.computedCurrentLocation.label',
    defaultMessage: 'Computed current location',
  },
  titleGroupList: {
    id: 'field.object.titleGroupList.label',
    defaultMessage: 'Title',
  },
  title: {
    id: 'field.object.title.label',
    defaultMessage: 'Title',
  },
  titleLanguage: {
    id: 'field.object.titleLanguage.label',
    defaultMessage: 'Language',
  },
  titleType: {
    id: 'field.object.titleType.label',
    defaultMessage: 'Type',
  },
  titleTranslationSubGroupList: {
    id: 'field.object.titleTranslationSubGroupList.label',
    defaultMessage: 'Translation',
  },
  titleTranslation: {
    id: 'field.object.titleTranslation.label',
    defaultMessage: 'Translation',
  },
  titleTranslationLanguage: {
    id: 'field.object.titleTranslationLanguage.label',
    defaultMessage: 'Language',
  },
  objectNameList: {
    id: 'field.object.objectNameList.label',
    defaultMessage: 'Object name',
  },
  objectName: {
    id: 'field.object.objectName.label',
    defaultMessage: 'Name',
  },
  objectNameCurrency: {
    id: 'field.object.objectNameCurrency.label',
    defaultMessage: 'Currency',
  },
  objectNameLevel: {
    id: 'field.object.objectNameLevel.label',
    defaultMessage: 'Level',
  },
  objectNameSystem: {
    id: 'field.object.objectNameSystem.label',
    defaultMessage: 'System',
  },
  objectNameType: {
    id: 'field.object.objectNameType.label',
    defaultMessage: 'Type',
  },
  objectNameLanguage: {
    id: 'field.object.objectNameLanguage.label',
    defaultMessage: 'Language',
  },
  objectNameNote: {
    id: 'field.object.objectNameNote.label',
    defaultMessage: 'Note',
  },
  copyNumber: {
    id: 'field.object.copyNumber.label',
    defaultMessage: 'Copy number',
  },
  objectStatusList: {
    id: 'field.object.objectStatusList.label',
    defaultMessage: 'Object status',
  },
  sex: {
    id: 'field.object.sex.label',
    defaultMessage: 'Sex',
  },
  phase: {
    id: 'field.object.phase.label',
    defaultMessage: 'Phase',
  },
  forms: {
    id: 'field.object.forms.label',
    defaultMessage: 'Form',
  },
  editionNumber: {
    id: 'field.object.editionNumber.label',
    defaultMessage: 'Edition number',
  },
  ageGroup: {
    id: 'field.object.ageGroup.label',
    defaultMessage: 'Age',
  },
  age: {
    id: 'field.object.age.label',
    defaultMessage: 'Age',
  },
  ageQualifier: {
    id: 'field.object.ageQualifier.label',
    defaultMessage: 'Age qualifier',
  },
  ageUnit: {
    id: 'field.object.ageUnit.label',
    defaultMessage: 'Unit',
  },
  styles: {
    id: 'field.object.styles.label',
    defaultMessage: 'Style',
  },
  colors: {
    id: 'field.object.colors.label',
    defaultMessage: 'Color',
  },
  materialGroup: {
    id: 'field.object.materialGroup.label',
    defaultMessage: 'Material',
  },
  material: {
    id: 'field.object.material.label',
    defaultMessage: 'Material',
  },
  materialComponent: {
    id: 'field.object.materialComponent.label',
    defaultMessage: 'Material component',
  },
  materialComponentNote: {
    id: 'field.object.materialComponentNote.label',
    defaultMessage: 'Material component note',
  },
  materialName: {
    id: 'field.object.materialName.label',
    defaultMessage: 'Material name',
  },
  materialSource: {
    id: 'field.object.materialSource.label',
    defaultMessage: 'Material source',
  },
  physicalDescription: {
    id: 'field.object.physicalDescription.label',
    defaultMessage: 'Physical description',
  },
  objectComponentGroup: {
    id: 'field.object.objectComponentGroup.label',
    defaultMessage: 'Object component',
  },
  objectComponentName: {
    id: 'field.object.objectComponentName.label',
    defaultMessage: 'Name',
  },
  objectComponentInformation: {
    id: 'field.object.objectComponentInformation.label',
    defaultMessage: 'Information',
  },
  technicalAttributeGroup: {
    id: 'field.object.technicalAttributeGroup.label',
    defaultMessage: 'Technical attribute',
  },
  technicalAttribute: {
    id: 'field.object.technicalAttribute.label',
    defaultMessage: 'Attribute',
  },
  technicalAttributeMeasurement: {
    id: 'field.object.technicalAttributeMeasurement.label',
    defaultMessage: 'Measurement',
  },
  technicalAttributeMeasurementUnit: {
    id: 'field.object.technicalAttributeMeasurementUnit.label',
    defaultMessage: 'Unit',
  },
  measuredPartGroupList: {
    id: 'field.object.measuredPartGroup.label',
    defaultMessage: 'Dimensions',
  },
  measuredPart: {
    id: 'field.object.measuredPart.label',
    defaultMessage: 'Part',
  },
  dimensionSummary: {
    id: 'field.object.dimensionSummary.label',
    defaultMessage: 'Summary',
  },
  dimensionSubGroup: {
    id: 'field.object.dimensionSubGroup.label',
    defaultMessage: 'Measurements',
  },
  dimension: {
    id: 'field.object.dimension.label',
    defaultMessage: 'Dimension',
  },
  measuredBy: {
    id: 'field.object.measuredBy.label',
    defaultMessage: 'Measured by',
  },
  measurementMethod: {
    id: 'field.object.measurementMethod.label',
    defaultMessage: 'Method',
  },
  value: {
    id: 'field.object.value.label',
    defaultMessage: 'Value',
  },
  measurementUnit: {
    id: 'field.object.measurementUnit.label',
    defaultMessage: 'Unit',
  },
  valueQualifier: {
    id: 'field.object.valueQualifier.label',
    defaultMessage: 'Qualifier',
  },
  valueDate: {
    id: 'field.object.valueDate.label',
    defaultMessage: 'Date',
  },
  contentDescription: {
    id: 'field.object.contentDescription.label',
    defaultMessage: 'Description',
  },
  contentLanguages: {
    id: 'field.object.contentLanguages.label',
    defaultMessage: 'Language',
  },
  contentActivities: {
    id: 'field.object.contentActivities.label',
    defaultMessage: 'Activity',
  },
  contentConcepts: {
    id: 'field.object.contentConcepts.label',
    defaultMessage: 'Concept',
  },
  contentConcept: {
    id: 'field.object.contentConcept.label',
    defaultMessage: 'Concept',
  },
  contentDate: {
    id: 'field.object.contentDate.label',
    defaultMessage: 'Date',
  },
  contentPositions: {
    id: 'field.object.contentPositions.label',
    defaultMessage: 'Position',
  },
  contentObjectGroup: {
    id: 'field.object.contentObjectGroup.label',
    defaultMessage: 'Object',
  },
  contentObject: {
    id: 'field.object.contentObject.label',
    defaultMessage: 'Name',
  },
  contentObjectType: {
    id: 'field.object.contentObjectType.label',
    defaultMessage: 'Type',
  },
  contentPeoples: {
    id: 'field.object.contentPeoples.label',
    defaultMessage: 'People',
  },
  contentPersons: {
    id: 'field.object.contentPersons.label',
    defaultMessage: 'Person',
  },
  contentPerson: {
    id: 'field.object.contentPerson.label',
    defaultMessage: 'Person',
  },
  contentPlaces: {
    id: 'field.object.contentPlaces.label',
    defaultMessage: 'Place',
  },
  contentScripts: {
    id: 'field.object.contentScripts.label',
    defaultMessage: 'Script',
  },
  contentOrganizations: {
    id: 'field.object.contentOrganizations.label',
    defaultMessage: 'Organization',
  },
  contentOrganization: {
    id: 'field.object.contentOrganization.label',
    defaultMessage: 'Organization',
  },
  contentEventNameGroup: {
    id: 'field.object.contentEventNameGroup.label',
    defaultMessage: 'Event',
  },
  contentEventName: {
    id: 'field.object.contentEventName.label',
    defaultMessage: 'Name',
  },
  contentEventNameType: {
    id: 'field.object.contentEventNameType.label',
    defaultMessage: 'Type',
  },
  contentOtherGroup: {
    id: 'field.object.contentOtherGroup.label',
    defaultMessage: 'Other',
  },
  contentOther: {
    id: 'field.object.contentOther.label',
    defaultMessage: 'Name',
  },
  contentOtherType: {
    id: 'field.object.contentOtherType.label',
    defaultMessage: 'Type',
  },
  contentNote: {
    id: 'field.object.contentNote.label',
    defaultMessage: 'Note',
  },
  inscriptionContent: {
    id: 'field.object.inscriptionContent.label',
    defaultMessage: 'Inscription content',
  },
  inscriptionContentInscriber: {
    id: 'field.object.inscriptionContentInscriber.label',
    defaultMessage: 'Inscriber',
  },
  inscriptionContentLanguage: {
    id: 'field.object.inscriptionContentLanguage.label',
    defaultMessage: 'Language',
  },
  inscriptionContentDateGroup: {
    id: 'field.object.inscriptionContentDateGroup.label',
    defaultMessage: 'Date',
  },
  inscriptionContentPosition: {
    id: 'field.object.inscriptionContentPosition.label',
    defaultMessage: 'Position',
  },
  inscriptionContentScript: {
    id: 'field.object.inscriptionContentScript.label',
    defaultMessage: 'Script',
  },
  inscriptionContentType: {
    id: 'field.object.inscriptionContentType.label',
    defaultMessage: 'Type',
  },
  inscriptionContentMethod: {
    id: 'field.object.inscriptionContentMethod.label',
    defaultMessage: 'Method',
  },
  inscriptionContentInterpretation: {
    id: 'field.object.inscriptionContentInterpretation.label',
    defaultMessage: 'Interpretation',
  },
  inscriptionContentTranslation: {
    id: 'field.object.inscriptionContentTranslation.label',
    defaultMessage: 'Translation',
  },
  inscriptionContentTransliteration: {
    id: 'field.object.inscriptionContentTransliteration.label',
    defaultMessage: 'Transliteration',
  },
  inscriptionDescription: {
    id: 'field.object.inscriptionDescription.label',
    defaultMessage: 'Inscription description',
  },
  inscriptionDescriptionInscriber: {
    id: 'field.object.inscriptionDescriptionInscriber.label',
    defaultMessage: 'Inscriber',
  },
  inscriptionDescriptionDateGroup: {
    id: 'field.object.inscriptionDescriptionDateGroup.label',
    defaultMessage: 'Date',
  },
  inscriptionDescriptionPosition: {
    id: 'field.object.inscriptionDescriptionPosition.label',
    defaultMessage: 'Position',
  },
  inscriptionDescriptionType: {
    id: 'field.object.inscriptionDescriptionType.label',
    defaultMessage: 'Type',
  },
  inscriptionDescriptionMethod: {
    id: 'field.object.inscriptionDescriptionMethod.label',
    defaultMessage: 'Method',
  },
  inscriptionDescriptionInterpretation: {
    id: 'field.object.inscriptionDescriptionInterpretation.label',
    defaultMessage: 'Interpretation',
  },
  objectProductionDateGroupList: {
    id: 'field.object.objectProductionDateGroupList.label',
    defaultMessage: 'Production date',
  },
  techniqueGroup: {
    id: 'field.object.techniqueGroup.label',
    defaultMessage: 'Production technique',
  },
  technique: {
    id: 'field.object.technique.label',
    defaultMessage: 'Technique',
  },
  techniqueType: {
    id: 'field.object.techniqueType.label',
    defaultMessage: 'Type',
  },
  objectProductionPlaceGroup: {
    id: 'field.object.objectProductionPlaceGroup.label',
    defaultMessage: 'Production place',
  },
  objectProductionPlace: {
    id: 'field.object.objectProductionPlace.label',
    defaultMessage: 'Place',
  },
  objectProductionPlaceRole: {
    id: 'field.object.objectProductionPlaceRole.label',
    defaultMessage: 'Role',
  },
  objectProductionReasons: {
    id: 'field.object.objectProductionReasons.label',
    defaultMessage: 'Production reason',
  },
  objectProductionPeopleGroup: {
    id: 'field.object.objectProductionPeopleGroup.label',
    defaultMessage: 'Production people',
  },
  objectProductionPeople: {
    id: 'field.object.objectProductionPeople.label',
    defaultMessage: 'People',
  },
  objectProductionPeopleRole: {
    id: 'field.object.objectProductionPeopleRole.label',
    defaultMessage: 'Role',
  },
  objectProductionPersonGroup: {
    id: 'field.object.objectProductionPersonGroup.label',
    defaultMessage: 'Production person',
  },
  objectProductionPerson: {
    id: 'field.object.objectProductionPerson.label',
    defaultMessage: 'Person',
  },
  objectProductionPersonRole: {
    id: 'field.object.objectProductionPersonRole.label',
    defaultMessage: 'Role',
  },
  objectProductionOrganizationGroup: {
    id: 'field.object.objectProductionOrganizationGroup.label',
    defaultMessage: 'Production organization',
  },
  objectProductionOrganization: {
    id: 'field.object.objectProductionOrganization.label',
    defaultMessage: 'Organization',
  },
  objectProductionOrganizationRole: {
    id: 'field.object.objectProductionOrganizationRole.label',
    defaultMessage: 'Role',
  },
  objectProductionNote: {
    id: 'field.object.objectProductionNote.label',
    defaultMessage: 'Production note',
  },
  assocActivityGroup: {
    id: 'field.object.assocActivityGroup.label',
    defaultMessage: 'Associated activity',
  },
  assocActivity: {
    id: 'field.object.assocActivity.label',
    defaultMessage: 'Activity',
  },
  assocActivityType: {
    id: 'field.object.assocActivityType.label',
    defaultMessage: 'Type',
  },
  assocActivityNote: {
    id: 'field.object.assocActivityNote.label',
    defaultMessage: 'Note',
  },
  assocObjectGroup: {
    id: 'field.object.assocObjectGroup.label',
    defaultMessage: 'Associated object',
  },
  assocObject: {
    id: 'field.object.assocObject.label',
    defaultMessage: 'Object',
  },
  assocObjectType: {
    id: 'field.object.assocObjectType.label',
    defaultMessage: 'Type',
  },
  assocObjectNote: {
    id: 'field.object.assocObjectNote.label',
    defaultMessage: 'Note',
  },
  assocConceptGroup: {
    id: 'field.object.assocConceptGroup.label',
    defaultMessage: 'Associated concept',
  },
  assocConcept: {
    id: 'field.object.assocConcept.label',
    defaultMessage: 'Concept',
  },
  assocConceptType: {
    id: 'field.object.assocConceptType.label',
    defaultMessage: 'Type',
  },
  assocConceptNote: {
    id: 'field.object.assocConceptNote.label',
    defaultMessage: 'Note',
  },
  assocCulturalContextGroup: {
    id: 'field.object.assocCulturalContextGroup.label',
    defaultMessage: 'Associated cultural affinity',
  },
  assocCulturalContext: {
    id: 'field.object.assocCulturalContext.label',
    defaultMessage: 'Cultural affinity',
  },
  assocCulturalContextType: {
    id: 'field.object.assocCulturalContextType.label',
    defaultMessage: 'Type',
  },
  assocCulturalContextNote: {
    id: 'field.object.assocCulturalContextNote.label',
    defaultMessage: 'Note',
  },
  assocOrganizationGroup: {
    id: 'field.object.assocOrganizationGroup.label',
    defaultMessage: 'Associated organization',
  },
  assocOrganization: {
    id: 'field.object.assocOrganization.label',
    defaultMessage: 'Organization',
  },
  assocOrganizationType: {
    id: 'field.object.assocOrganizationType.label',
    defaultMessage: 'Type',
  },
  assocOrganizationNote: {
    id: 'field.object.assocOrganizationNote.label',
    defaultMessage: 'Note',
  },
  assocPeopleGroup: {
    id: 'field.object.assocPeopleGroup.label',
    defaultMessage: 'Associated people',
  },
  assocPeople: {
    id: 'field.object.assocPeople.label',
    defaultMessage: 'People',
  },
  assocPeopleType: {
    id: 'field.object.assocPeopleType.label',
    defaultMessage: 'Type',
  },
  assocPeopleNote: {
    id: 'field.object.assocPeopleNote.label',
    defaultMessage: 'Note',
  },
  assocPersonGroup: {
    id: 'field.object.assocPersonGroup.label',
    defaultMessage: 'Associated person',
  },
  assocPerson: {
    id: 'field.object.assocPerson.label',
    defaultMessage: 'Person',
  },
  assocPersonType: {
    id: 'field.object.assocPersonType.label',
    defaultMessage: 'Type',
  },
  assocPersonNote: {
    id: 'field.object.assocPersonNote.label',
    defaultMessage: 'Note',
  },
  assocPlaceGroup: {
    id: 'field.object.assocPlaceGroup.label',
    defaultMessage: 'Associated place',
  },
  assocPlace: {
    id: 'field.object.assocPlace.label',
    defaultMessage: 'Place',
  },
  assocPlaceType: {
    id: 'field.object.assocPlaceType.label',
    defaultMessage: 'Type',
  },
  assocPlaceNote: {
    id: 'field.object.assocPlaceNote.label',
    defaultMessage: 'Note',
  },
  assocEventGroup: {
    id: 'field.object.assocEventGroup.label',
    defaultMessage: 'Associated event',
  },
  assocEventName: {
    id: 'field.object.assocEventName.label',
    defaultMessage: 'Event',
  },
  assocEventNameType: {
    id: 'field.object.assocEventNameType.label',
    defaultMessage: 'Type',
  },
  assocEventOrganizations: {
    id: 'field.object.assocEventOrganizations.label',
    defaultMessage: 'Associated event organization',
  },
  assocEventPeoples: {
    id: 'field.object.assocEventPeoples.label',
    defaultMessage: 'Associated event people',
  },
  assocEventPersons: {
    id: 'field.object.assocEventPersons.label',
    defaultMessage: 'Associated event person',
  },
  assocEventPlaces: {
    id: 'field.object.assocEventPlaces.label',
    defaultMessage: 'Associated event place',
  },
  assocEventNote: {
    id: 'field.object.assocEventNote.label',
    defaultMessage: 'Associated event note',
  },
  assocDateGroup: {
    id: 'field.object.assocDateGroup.label',
    defaultMessage: 'Associated date',
  },
  assocStructuredDateGroup: {
    id: 'field.object.assocStructuredDateGroup.label',
    defaultMessage: 'Date',
  },
  assocDateType: {
    id: 'field.object.assocDateType.label',
    defaultMessage: 'Type',
  },
  assocDateNote: {
    id: 'field.object.assocDateNote.label',
    defaultMessage: 'Note',
  },
  objectHistoryNote: {
    id: 'field.object.objectHistoryNote.label',
    defaultMessage: 'Object history note',
  },
  usageGroup: {
    id: 'field.object.usageGroup.label',
    defaultMessage: 'Usage',
  },
  usage: {
    id: 'field.object.usage.label',
    defaultMessage: 'Usage',
  },
  usageNote: {
    id: 'field.object.usageNote.label',
    defaultMessage: 'Usage note',
  },
  owners: {
    id: 'field.object.owners.label',
    defaultMessage: 'Owner',
  },
  ownershipDateGroupList: {
    id: 'field.object.ownershipDateGroupList.label',
    defaultMessage: 'Ownership date',
  },
  ownershipAccess: {
    id: 'field.object.ownershipAccess.label',
    defaultMessage: 'Ownership access',
  },
  ownershipCategory: {
    id: 'field.object.ownershipCategory.label',
    defaultMessage: 'Ownership category',
  },
  ownershipPlace: {
    id: 'field.object.ownershipPlace.label',
    defaultMessage: 'Ownership place',
  },
  ownershipExchangeGroup: {
    id: 'field.object.ownershipExchangeGroup.label',
    defaultMessage: 'Ownership exchange',
  },
  ownershipExchangeMethod: {
    id: 'field.object.ownershipExchangeMethod.label',
    defaultMessage: 'Method',
  },
  ownershipExchangeNote: {
    id: 'field.object.ownershipExchangeNote.label',
    defaultMessage: 'Note',
  },
  ownershipExchangePriceCurrency: {
    id: 'field.object.ownershipExchangePriceCurrency.label',
    defaultMessage: 'Currency',
  },
  ownershipExchangePriceValue: {
    id: 'field.object.ownershipExchangePriceValue.label',
    defaultMessage: 'Price',
  },
  ownersPersonalExperience: {
    id: 'field.object.ownersPersonalExperience.label',
    defaultMessage: 'Owner\'s personal experience',
  },
  ownersPersonalResponse: {
    id: 'field.object.ownersPersonalResponse.label',
    defaultMessage: 'Owner\'s personal response',
  },
  ownersReferences: {
    id: 'field.object.ownersReferences.label',
    defaultMessage: 'Owner\'s reference',
  },
  ownersContributionNote: {
    id: 'field.object.ownersContributionNote.label',
    defaultMessage: 'Owner\'s contribution note',
  },
  viewersRole: {
    id: 'field.object.viewersRole.label',
    defaultMessage: 'Viewer\'s role',
  },
  viewersPersonalExperience: {
    id: 'field.object.viewersPersonalExperience.label',
    defaultMessage: 'Viewer\'s personal experience',
  },
  viewersPersonalResponse: {
    id: 'field.object.viewersPersonalResponse.label',
    defaultMessage: 'Viewer\'s personal response',
  },
  viewersReferences: {
    id: 'field.object.viewersReferences.label',
    defaultMessage: 'Viewer\'s reference',
  },
  viewersContributionNote: {
    id: 'field.object.viewersContributionNote.label',
    defaultMessage: 'Viewer\'s contribution note',
  },
  referenceGroup: {
    id: 'field.object.referenceGroup.label',
    defaultMessage: 'Reference information',
  },
  reference: {
    id: 'field.object.reference.label',
    defaultMessage: 'Reference',
  },
  referenceNote: {
    id: 'field.object.referenceNote.label',
    defaultMessage: 'Reference note',
  },
  fieldCollectionDate: {
    id: 'field.object.fieldCollectionDate.label',
    defaultMessage: 'Field collection date',
  },
  fieldCollectionMethods: {
    id: 'field.object.fieldCollectionMethods.label',
    defaultMessage: 'Field collection method',
  },
  fieldCollectionNote: {
    id: 'field.object.fieldCollectionNote.label',
    defaultMessage: 'Field collection note',
  },
  fieldCollectionNumber: {
    id: 'field.object.fieldCollectionNumber.label',
    defaultMessage: 'Field collection number',
  },
  fieldCollectionPlace: {
    id: 'field.object.fieldCollectionPlace.label',
    defaultMessage: 'Field collection place',
  },
  fieldCollectionSources: {
    id: 'field.object.fieldCollectionSources.label',
    defaultMessage: 'Field collection source',
  },
  fieldCollectors: {
    id: 'field.object.fieldCollectors.label',
    defaultMessage: 'Field collection collector',
  },
  fieldColEventNames: {
    id: 'field.object.fieldColEventNames.label',
    defaultMessage: 'Field collection event name',
  },
});
