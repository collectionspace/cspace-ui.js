import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    HierarchyInput,
    DateInput,
    TextInput,
    TermPickerInput,
    CheckboxInput,
    StructuredDateInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
    DATA_TYPE_DATE,
    DATA_TYPE_STRUCTURED_DATE,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:chronologies_common',
          },
        },
      },
      'rel:relations-common-list': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/relation',
          },
        },
        'relation-list-item': {
          [config]: {
            view: {
              type: HierarchyInput,
              props: {
                messages: defineMessages({
                  parent: {
                    id: 'hierarchyInput.chronology.parent',
                    defaultMessage: 'Broader chronology',
                  },
                  children: {
                    id: 'hierarchyInput.chronology.children',
                    defaultMessage: 'Narrower chronologies',
                  },
                  siblings: {
                    id: 'hierarchyInput.chronology.siblings',
                    defaultMessage: 'Adjacent chronologies',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:chronologies_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/chronology',
          },
        },
        ...extensions.authItem.fields,
        chronologyTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.chronologies_common.chronologyTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          chronologyTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.chronologyTermGroup.name',
                  defaultMessage: 'Term',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            termDisplayName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termDisplayName.fullName',
                    defaultMessage: 'Term display name',
                  },
                  name: {
                    id: 'field.chronologies_common.termDisplayName.name',
                    defaultMessage: 'Display name',
                  },
                }),
                required: true,
                view: {
                  type: TextInput,
                },
              },
            },
            termName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termName.fullName',
                    defaultMessage: 'Term name',
                  },
                  name: {
                    id: 'field.chronologies_common.termName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termType.fullName',
                    defaultMessage: 'Term type',
                  },
                  name: {
                    id: 'field.chronologies_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologytermtype',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termFlag.fullName',
                    defaultMessage: 'Term flag',
                  },
                  name: {
                    id: 'field.chronologies_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologytermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termStatus.fullName',
                    defaultMessage: 'Term status',
                  },
                  name: {
                    id: 'field.chronologies_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologytermstatus',
                  },
                },
              },
            },
            historicalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.historicalStatus.fullName',
                    defaultMessage: 'Term historical status',
                  },
                  name: {
                    id: 'field.chronologies_common.historicalStatus.name',
                    defaultMessage: 'Historical status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologyhistoricalstatus',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termQualifier.fullName',
                    defaultMessage: 'Term qualifier',
                  },
                  name: {
                    id: 'field.chronologies_common.termQualifier.name',
                    defaultMessage: 'Qualifier',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termLanguage: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termLanguage.fullName',
                    defaultMessage: 'Term language',
                  },
                  name: {
                    id: 'field.chronologies_common.termLanguage.name',
                    defaultMessage: 'Language',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'languages',
                  },
                },
              },
            },
            termPrefForLang: {
              [config]: {
                dataType: DATA_TYPE_BOOL,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termPrefForLang.fullName',
                    defaultMessage: 'Term preferred for lang',
                  },
                  name: {
                    id: 'field.chronologies_common.termPrefForLang.name',
                    defaultMessage: 'Preferred for lang',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            termSource: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termSource.fullName',
                    defaultMessage: 'Term source name',
                  },
                  groupName: {
                    id: 'field.chronologies_common.termSource.groupName',
                    defaultMessage: 'Source name',
                  },
                  name: {
                    id: 'field.chronologies_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/shared,citation/worldcat',
                  },
                },
              },
            },
            termSourceDetail: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termSourceDetail.fullName',
                    defaultMessage: 'Term source detail',
                  },
                  groupName: {
                    id: 'field.chronologies_common.termSourceDetail.groupName',
                    defaultMessage: 'Source detail',
                  },
                  name: {
                    id: 'field.chronologies_common.termSourceDetail.name',
                    defaultMessage: 'Detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSourceID: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termSourceID.fullName',
                    defaultMessage: 'Term source ID',
                  },
                  groupName: {
                    id: 'field.chronologies_common.termSourceID.groupName',
                    defaultMessage: 'Source ID',
                  },
                  name: {
                    id: 'field.chronologies_common.termSourceID.name',
                    defaultMessage: 'ID',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSourceNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.termSourceNote.fullName',
                    defaultMessage: 'Term source note',
                  },
                  groupName: {
                    id: 'field.chronologies_common.termSourceNote.groupName',
                    defaultMessage: 'Source note',
                  },
                  name: {
                    id: 'field.chronologies_common.termSourceNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        chronologyDateStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.chronologies_common.chronologyDateStructuredDateGroup.name',
                defaultMessage: 'Primary date range',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        chronologyPlaces: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          chronologyPlace: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.chronologyPlaces.name',
                  defaultMessage: 'Spatial coverage',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'place/local,place/tgn',
                },
              },
            },
          },
        },
        chronologyType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.chronologies_common.chronologyType.name',
                defaultMessage: 'Chronology type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'chronologytypes',
              },
            },
          },
        },
        chronologyNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.chronologies_common.chronologyNote.name',
                defaultMessage: 'Chronology note',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        chronologyDescription: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.chronologies_common.chronologyDescription.name',
                defaultMessage: 'Chronology description',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        identifierGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          identifierGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.identifierGroup.name',
                  defaultMessage: 'Resource identifier',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            identifierValue: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.identifierValue.fullName',
                    defaultMessage: 'Resource identifier value',
                  },
                  name: {
                    id: 'field.chronologies_common.identifierValue.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            identifierCitation: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.identifierCitation.fullName',
                    defaultMessage: 'Resource identifier citation',
                  },
                  name: {
                    id: 'field.chronologies_common.identifierCitation.name',
                    defaultMessage: 'Citation',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/worldcat',
                  },
                },
              },
            },
            identifierDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.identifierDate.fullName',
                    defaultMessage: 'Resource identifier date',
                  },
                  name: {
                    id: 'field.chronologies_common.identifierDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        otherDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          otherDateGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.otherDateGroup.name',
                  defaultMessage: 'Alternative date',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            otherDateStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.otherDateStructuredDateGroup.fullName',
                    defaultMessage: 'Alternative date range',
                  },
                  name: {
                    id: 'field.chronologies_common.otherDateStructuredDateGroup.name',
                    defaultMessage: 'Range',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            otherDatePlaces: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              otherDatePlace: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.otherDatePlace.fullName',
                      defaultMessage: 'Alternative date spacial coverage',
                    },
                    name: {
                      id: 'field.chronologies_common.otherDatePlace.name',
                      defaultMessage: 'Spatial coverage',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'place/local,place/tgn',
                    },
                  },
                },
              },
            },
            otherDateCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              otherDateCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.otherDateCitation.fullName',
                      defaultMessage: 'Alternative date citation',
                    },
                    name: {
                      id: 'field.chronologies_common.otherDateCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            otherDateNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.otherDateNote.fullName',
                    defaultMessage: 'Alternative date note',
                  },
                  name: {
                    id: 'field.chronologies_common.otherDateNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
          },
        },
        personGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          personGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.personGroup.name',
                  defaultMessage: 'Person',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            person: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.person.fullName',
                    defaultMessage: 'Person associated',
                  },
                  name: {
                    id: 'field.chronologies_common.person.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan',
                  },
                },
              },
            },
            personType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.personType.fullName',
                    defaultMessage: 'Person relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.personType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologypersonrelations',
                  },
                },
              },
            },
            personStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.personStructuredDateGroup.fullName',
                    defaultMessage: 'Person date',
                  },
                  name: {
                    id: 'field.chronologies_common.personStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            personCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              personCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.personCitation.fullName',
                      defaultMessage: 'Person citation',
                    },
                    name: {
                      id: 'field.chronologies_common.personCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            personNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.personNote.fullName',
                    defaultMessage: 'Person note',
                  },
                  name: {
                    id: 'field.chronologies_common.personNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        peopleGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          peopleGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.peopleGroup.name',
                  defaultMessage: 'People',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            people: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.people.fullName',
                    defaultMessage: 'People associated',
                  },
                  name: {
                    id: 'field.chronologies_common.people.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/associated',
                  },
                },
              },
            },
            peopleType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.peopleType.fullName',
                    defaultMessage: 'People relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.peopleType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologypeoplerelations',
                  },
                },
              },
            },
            peopleStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.peopleStructuredDateGroup.fullName',
                    defaultMessage: 'People date',
                  },
                  name: {
                    id: 'field.chronologies_common.peopleStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            peopleCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              peopleCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.peopleCitation.fullName',
                      defaultMessage: 'People citation',
                    },
                    name: {
                      id: 'field.chronologies_common.peopleCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            peopleNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.peopleNote.fullName',
                    defaultMessage: 'People note',
                  },
                  name: {
                    id: 'field.chronologies_common.peopleNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        organizationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          organizationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.organizationGroup.name',
                  defaultMessage: 'Organization',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            organization: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.organization.fullName',
                    defaultMessage: 'Organization associated',
                  },
                  name: {
                    id: 'field.chronologies_common.organization.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local,organization/ulan',
                  },
                },
              },
            },
            organizationType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.organizationType.fullName',
                    defaultMessage: 'Organization relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.organizationType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologyorganizationrelations',
                  },
                },
              },
            },
            organizationStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.organizationStructuredDateGroup.fullName',
                    defaultMessage: 'Organization date',
                  },
                  name: {
                    id: 'field.chronologies_common.organizationStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            organizationCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              organizationCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.organizationCitation.fullName',
                      defaultMessage: 'Organization citation',
                    },
                    name: {
                      id: 'field.chronologies_common.organizationCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            organizationNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.organizationNote.fullName',
                    defaultMessage: 'Organization note',
                  },
                  name: {
                    id: 'field.chronologies_common.organizationNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        conceptGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conceptGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.conceptGroup.name',
                  defaultMessage: 'Concept',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            concept: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.concept.fullName',
                    defaultMessage: 'Concept associated',
                  },
                  name: {
                    id: 'field.chronologies_common.concept.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/activity,concept/associated,concept/material,concept/nomenclature,concept/occasion',
                  },
                },
              },
            },
            conceptType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.conceptType.fullName',
                    defaultMessage: 'Concept relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.conceptType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologyconceptrelations',
                  },
                },
              },
            },
            conceptStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.conceptStructuredDateGroup.fullName',
                    defaultMessage: 'Concept date',
                  },
                  name: {
                    id: 'field.chronologies_common.conceptStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            conceptCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              conceptCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.conceptCitation.fullName',
                      defaultMessage: 'Concept citation',
                    },
                    name: {
                      id: 'field.chronologies_common.conceptCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            conceptNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.conceptNote.fullName',
                    defaultMessage: 'Concept note',
                  },
                  name: {
                    id: 'field.chronologies_common.conceptNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        placeGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          placeGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.placeGroup.name',
                  defaultMessage: 'Place',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            place: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.place.fullName',
                    defaultMessage: 'Place associated',
                  },
                  name: {
                    id: 'field.chronologies_common.place.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'place/local,place/tgn',
                  },
                },
              },
            },
            placeType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.placeType.fullName',
                    defaultMessage: 'Place relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.placeType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologyplacerelations',
                  },
                },
              },
            },
            placeStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.placeStructuredDateGroup.fullName',
                    defaultMessage: 'Place date',
                  },
                  name: {
                    id: 'field.chronologies_common.placeStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            placeCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              placeCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.placeCitation.fullName',
                      defaultMessage: 'Place citation',
                    },
                    name: {
                      id: 'field.chronologies_common.placeCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            placeNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.placeNote.fullName',
                    defaultMessage: 'Place note',
                  },
                  name: {
                    id: 'field.chronologies_common.placeNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        relatedPeriodGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          relatedPeriodGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.relatedPeriodGroup.name',
                  defaultMessage: 'Related period',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            relatedPeriod: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.relatedPeriod.fullName',
                    defaultMessage: 'Related period associated',
                  },
                  name: {
                    id: 'field.chronologies_common.relatedPeriod.name',
                    defaultMessage: 'Associated',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'chronology/era,chronology/event,chronology/fieldcollection',
                  },
                },
              },
            },
            relatedPeriodType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.relatedPeriodType.fullName',
                    defaultMessage: 'Related period relationship/type',
                  },
                  name: {
                    id: 'field.chronologies_common.relatedPeriodType.name',
                    defaultMessage: 'Relationship/Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'chronologyrelations',
                  },
                },
              },
            },
            relatedPeriodStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.relatedPeriodStructuredDateGroup.fullName',
                    defaultMessage: 'Related period date',
                  },
                  name: {
                    id: 'field.chronologies_common.relatedPeriodStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            relatedPeriodCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              relatedPeriodCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.relatedPeriodCitation.fullName',
                      defaultMessage: 'Related period citation',
                    },
                    name: {
                      id: 'field.chronologies_common.relatedPeriodCitation.name',
                      defaultMessage: 'Citation',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'citation/local,citation/worldcat',
                    },
                  },
                },
              },
            },
            relatedPeriodNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.relatedPeriodNote.fullName',
                    defaultMessage: 'Related period note',
                  },
                  name: {
                    id: 'field.chronologies_common.relatedPeriodNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
