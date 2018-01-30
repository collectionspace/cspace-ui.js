import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    HierarchyInput,
    OptionPickerInput,
    TextInput,
    TermPickerInput,
    CheckboxInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    extensions,
  } = pluginContext.config;

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
        csid: {
          [config]: {
            cloneable: false,
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
          },
        },
        refName: {
          [config]: {
            cloneable: false,
          },
        },
        shortIdentifier: {
          [config]: {
            cloneable: false,
          },
        },
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
                messages: defineMessages({
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
                  name: {
                    id: 'field.concepts_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.concepts_common.termSource.fullName',
                    defaultMessage: 'Source name',
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
                  name: {
                    id: 'field.concepts_common.citationSource.name',
                    defaultMessage: 'Citation',
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
                  name: {
                    id: 'field.concepts_common.additionalSource.name',
                    defaultMessage: 'Name',
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
            additionalSourceUniqueID: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.concepts_common.additionalSourceUniqueID.name',
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
