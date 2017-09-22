import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

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

  const coreFields = getCoreFields(pluginContext);

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
      'ns2:relations-common-list': {
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
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.concept.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.concept.siblings',
                    defaultMessage: 'Equivalent context',
                  },
                }),
              },
            },
          },
        },
      },
      // Define core fields
      ...coreFields,
      'ns2:concepts_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/concept',
          },
        },
        conceptTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.concepts_common.conceptTermGroupList.name',
                defaultMessage: 'Concept term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conceptTermGroup: {
            [config]: {
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
                    defaultMessage: 'Term',
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
                    defaultMessage: 'Term type',
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
                    defaultMessage: 'Term flag',
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
                    defaultMessage: 'Pref for lang',
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
                    defaultMessage: 'Source',
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
                    defaultMessage: 'Source detail',
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
                    defaultMessage: 'Source ID',
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
                    defaultMessage: 'Source note',
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
            messages: defineMessages({
              name: {
                id: 'field.concepts_common.conceptRecordTypes.name',
                defaultMessage: 'Concept record type',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conceptRecordType: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.concepts_common.conceptType.name',
                  defaultMessage: 'Concept record type',
                },
              }),
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
                defaultMessage: 'Scope note',
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
                defaultMessage: 'Scope note source',
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
                defaultMessage: 'Scope note source detail',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        citationGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.concepts_common.citationGroupList.name',
                defaultMessage: 'Citations',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          citationGroup: {
            [config]: {
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
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/worldcat',
                  },
                },
              },
            },
            citationSourceDetail: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.concepts_common.citationSourceDetail.name',
                    defaultMessage: 'Citation source detail',
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
            messages: defineMessages({
              name: {
                id: 'field.concepts_common.additionalSourceGroupList.name',
                defaultMessage: 'Additional sources',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          additionalSourceGroup: {
            [config]: {
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
                    defaultMessage: 'Additional source',
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
                    defaultMessage: 'Additional source detail',
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
                    defaultMessage: 'Additional source unique ID',
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
                    defaultMessage: 'Additional source note',
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
