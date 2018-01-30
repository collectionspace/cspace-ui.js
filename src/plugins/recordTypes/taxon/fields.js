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
            defaultChildSubpath: 'ns2:taxon_common',
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
                    id: 'hierarchyInput.taxon.parent',
                    defaultMessage: 'Broader taxon name',
                  },
                  children: {
                    id: 'hierarchyInput.taxon.children',
                    defaultMessage: 'Narrower taxon names',
                  },
                  siblings: {
                    id: 'hierarchyInput.taxon.siblings',
                    defaultMessage: 'Adjacent taxon names',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:taxon_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/taxonomy',
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
        taxonTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.taxon_common.taxonTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          taxonTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.taxon_common.taxonTermGroup.name',
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
                    id: 'field.taxon_common.termDisplayName.name',
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
                    id: 'field.taxon_common.termName.name',
                    defaultMessage: 'Formatted Display Name',
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
                    id: 'field.taxon_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'taxonTermTypes',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'taxontermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'taxonTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.termQualifier.name',
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
                    id: 'field.taxon_common.termLanguage.name',
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
                    id: 'field.taxon_common.termPrefForLang.name',
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
                    id: 'field.taxon_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.taxon_common.termSource.fullName',
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
                    id: 'field.taxon_common.termSourceDetail.name',
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
                    id: 'field.taxon_common.termSourceID.name',
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
                    id: 'field.taxon_common.termSourceNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termFormattedDisplayName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.termFormattedDisplayName.name',
                    defaultMessage: 'Formatted display name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            taxonomicStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.taxonomicStatus.name',
                    defaultMessage: 'Taxonomic status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'taxonomicStatuses',
                  },
                },
              },
            },
          },
        },
        taxonRank: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonRank.name',
                defaultMessage: 'Rank',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'taxonRanks',
              },
            },
          },
        },
        taxonCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'taxonCurrencies',
              },
            },
          },
        },
        taxonAuthorGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          taxonAuthorGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.taxon_common.taxonAuthorGroup.name',
                  defaultMessage: 'Author',
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
            taxonAuthor: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.taxonAuthor.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.taxon_common.taxonAuthor.fullName',
                    defaultMessage: 'Author name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            taxonAuthorType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.taxonAuthorType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'taxonAuthorTypes',
                  },
                },
              },
            },
          },
        },
        taxonYear: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonYear.name',
                defaultMessage: 'Year',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        taxonCitationList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          taxonCitation: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.taxon_common.taxonCitation.name',
                  defaultMessage: 'Citation',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'citation/local,citation/shared,citation/worldcat',
                },
              },
            },
          },
        },
        taxonIsNamedHybrid: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonIsNamedHybrid.name',
                defaultMessage: 'Is named hybrid',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
        taxonNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonNote.name',
                defaultMessage: 'Note',
              },
            }),
            searchView: {
              type: TextInput,
            },
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        commonNameGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          commonNameGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.taxon_common.commonNameGroup.name',
                  defaultMessage: 'Common name',
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
            commonName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.commonName.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.taxon_common.commonName.fullName',
                    defaultMessage: 'Common name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            commonNameLanguage: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.commonNameLanguage.name',
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
            commonNameSource: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.commonNameSource.name',
                    defaultMessage: 'Source',
                  },
                  fullName: {
                    id: 'field.taxon_common.commonNameSource.fullName',
                    defaultMessage: 'Common name source',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local,citation/shared',
                  },
                },
              },
            },
            commonNameSourceDetail: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.commonNameSourceDetail.name',
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
      },
    },
  };
};
