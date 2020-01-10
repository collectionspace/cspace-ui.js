import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    HierarchyInput,
    OptionPickerInput,
    TextInput,
    TermPickerInput,
    CheckboxInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
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
            defaultChildSubpath: 'ns2:concepts_common',
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
                    id: 'hierarchyInput.concept.parent',
                    defaultMessage: 'Broader concept',
                  },
                  children: {
                    id: 'hierarchyInput.concept.children',
                    defaultMessage: 'Narrower concepts',
                  },
                  siblings: {
                    id: 'hierarchyInput.concept.siblings',
                    defaultMessage: 'Adjacent concepts',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:concepts_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/concept',
          },
        },
        ...extensions.authItem.fields,
        conceptTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.concepts_common.conceptTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          conceptTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.concepts_common.conceptTermGroup.name',
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
                    id: 'field.concepts_common.termDisplayName.fullName',
                    defaultMessage: 'Term display name',
                  },
                  name: {
                    id: 'field.concepts_common.termDisplayName.name',
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
                    id: 'field.concepts_common.termName.fullName',
                    defaultMessage: 'Term name',
                  },
                  name: {
                    id: 'field.concepts_common.termName.name',
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
                    id: 'field.concepts_common.termType.fullName',
                    defaultMessage: 'Term type',
                  },
                  name: {
                    id: 'field.concepts_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'conceptTermTypes',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.termFlag.fullName',
                    defaultMessage: 'Term flag',
                  },
                  name: {
                    id: 'field.concepts_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'concepttermflag',
                  },
                },
              },
            },
            historicalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.historicalStatus.fullName',
                    defaultMessage: 'Term historical status',
                  },
                  name: {
                    id: 'field.concepts_common.historicalStatus.name',
                    defaultMessage: 'Historical status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'conceptHistoricalStatuses',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.termStatus.fullName',
                    defaultMessage: 'Term status',
                  },
                  name: {
                    id: 'field.concepts_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'conceptTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.termQualifier.fullName',
                    defaultMessage: 'Term qualifier',
                  },
                  name: {
                    id: 'field.concepts_common.termQualifier.name',
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
                    id: 'field.concepts_common.termLanguage.fullName',
                    defaultMessage: 'Term language',
                  },
                  name: {
                    id: 'field.concepts_common.termLanguage.name',
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
                    id: 'field.concepts_common.termPrefForLang.fullName',
                    defaultMessage: 'Term preferred for lang',
                  },
                  name: {
                    id: 'field.concepts_common.termPrefForLang.name',
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
                    id: 'field.concepts_common.termSource.fullName',
                    defaultMessage: 'Term source name',
                  },
                  groupName: {
                    id: 'field.concepts_common.termSource.groupName',
                    defaultMessage: 'Source name',
                  },
                  name: {
                    id: 'field.concepts_common.termSource.name',
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
                    id: 'field.concepts_common.termSourceDetail.fullName',
                    defaultMessage: 'Term source detail',
                  },
                  groupName: {
                    id: 'field.concepts_common.termSourceDetail.groupName',
                    defaultMessage: 'Source detail',
                  },
                  name: {
                    id: 'field.concepts_common.termSourceDetail.name',
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
                    id: 'field.concepts_common.termSourceID.fullName',
                    defaultMessage: 'Term source ID',
                  },
                  groupName: {
                    id: 'field.concepts_common.termSourceID.groupName',
                    defaultMessage: 'Source ID',
                  },
                  name: {
                    id: 'field.concepts_common.termSourceID.name',
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
                    id: 'field.concepts_common.termSourceNote.fullName',
                    defaultMessage: 'Term source note',
                  },
                  groupName: {
                    id: 'field.concepts_common.termSourceNote.groupName',
                    defaultMessage: 'Source note',
                  },
                  name: {
                    id: 'field.concepts_common.termSourceNote.name',
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
        conceptRecordTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conceptRecordType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.concepts_common.conceptRecordType.name',
                  defaultMessage: 'Concept type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'concepttype',
                },
              },
            },
          },
        },
        scopeNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.concepts_common.scopeNote.fullName',
                defaultMessage: 'Scope note',
              },
              name: {
                id: 'field.concepts_common.scopeNote.name',
                defaultMessage: 'Note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        scopeNoteSource: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.concepts_common.scopeNoteSource.fullName',
                defaultMessage: 'Scope note source',
              },
              name: {
                id: 'field.concepts_common.scopeNoteSource.name',
                defaultMessage: 'Source',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        scopeNoteSourceDetail: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.concepts_common.scopeNoteSourceDetail.fullName',
                defaultMessage: 'Scope note source detail',
              },
              name: {
                id: 'field.concepts_common.scopeNoteSourceDetail.name',
                defaultMessage: 'Source detail',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        citationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.concepts_common.citationGroup.name',
                  defaultMessage: 'Citation',
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
            citationSource: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.citationSource.fullName',
                    defaultMessage: 'Citation source',
                  },
                  name: {
                    id: 'field.concepts_common.citationSource.name',
                    defaultMessage: 'Source',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            citationSourceDetail: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.citationSourceDetail.fullName',
                    defaultMessage: 'Citation source detail',
                  },
                  name: {
                    id: 'field.concepts_common.citationSourceDetail.name',
                    defaultMessage: 'Source detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        additionalSourceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          additionalSourceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.concepts_common.additionalSourceGroup.name',
                  defaultMessage: 'Additional source',
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
            additionalSource: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.additionalSource.fullName',
                    defaultMessage: 'Additional source',
                  },
                  name: {
                    id: 'field.concepts_common.additionalSource.name',
                    defaultMessage: 'Source',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            additionalSourceDetail: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.additionalSourceDetail.fullName',
                    defaultMessage: 'Additional source detail',
                  },
                  name: {
                    id: 'field.concepts_common.additionalSourceDetail.name',
                    defaultMessage: 'Detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            additionalSourceID: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.additionalSourceID.fullName',
                    defaultMessage: 'Additional source ID',
                  },
                  name: {
                    id: 'field.concepts_common.additionalSourceID.name',
                    defaultMessage: 'ID',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            additionalSourceNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.concepts_common.additionalSourceNote.fullName',
                    defaultMessage: 'Additional source note',
                  },
                  name: {
                    id: 'field.concepts_common.additionalSourceNote.name',
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
