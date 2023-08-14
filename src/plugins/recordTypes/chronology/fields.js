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
        primaryDateRangeStructuredDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.chronologies_common.primaryDateRangeStructuredDateGroup.name',
                defaultMessage: 'Primary date range',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        spatialCoverages: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          spatialCoverage: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.spatialCoverage.name',
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
        altDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          altDateGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.chronologies_common.altDateGroup.name',
                  defaultMessage: 'Alternative date',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            altDateRangeStructuredDateGroup: {
              [config]: {
                dataType: DATA_TYPE_STRUCTURED_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.altDateRangeStructuredDateGroup.fullName',
                    defaultMessage: 'Alternative date range',
                  },
                  name: {
                    id: 'field.chronologies_common.altDateRangeStructuredDateGroup.name',
                    defaultMessage: 'Range',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
              ...extensions.structuredDate.fields,
            },
            altDateSpatialCoverages: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              altDateSpatialCoverage: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.altDateSpatialCoverage.fullName',
                      defaultMessage: 'Alternative date spatial coverage',
                    },
                    name: {
                      id: 'field.chronologies_common.altDateSpatialCoverage.name',
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
            altDateCitations: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              altDateCitation: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.chronologies_common.altDateCitation.fullName',
                      defaultMessage: 'Alternative date citation',
                    },
                    name: {
                      id: 'field.chronologies_common.altDateCitation.name',
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
            altDateNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.chronologies_common.altDateNote.fullName',
                    defaultMessage: 'Alternative date note',
                  },
                  name: {
                    id: 'field.chronologies_common.altDateNote.name',
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
      },
    },
  };
};
