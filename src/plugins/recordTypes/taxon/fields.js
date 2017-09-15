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
            defaultChildSubpath: 'ns2:taxon_common',
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
                    id: 'hierarchyInput.taxon.parent',
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.taxon.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.taxon.siblings',
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
      'ns2:taxon_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/taxonomy',
          },
        },
        taxonTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonTermGroupList.name',
                defaultMessage: 'Taxon term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          taxonTermGroup: {
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
                    defaultMessage: 'Term type',
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
                    defaultMessage: 'Term flag',
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
                    id: 'field.taxon_common.termSource.name',
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
                    id: 'field.taxon_common.termSourceDetail.name',
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
                    id: 'field.taxon_common.termSourceID.name',
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
                    id: 'field.taxon_common.termSourceNote.name',
                    defaultMessage: 'Source note',
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
                defaultMessage: 'Taxon rank',
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
                defaultMessage: 'Taxon rank',
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
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonAuthorGroupList.name',
                defaultMessage: 'Taxon authors',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          taxonAuthorGroup: {
            [config]: {
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
                    defaultMessage: 'Author Type',
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
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.taxonCitationList.name',
                defaultMessage: 'Citations',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          taxonCitation: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.taxon_common.taxonCitation.fullName',
                  defaultMessage: 'Citation',
                },
                name: {
                  id: 'field.taxon_common.taxonCitation.name',
                  defaultMessage: 'Concept',
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
                defaultMessage: 'Notes',
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
        commonNameGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.taxon_common.commonNameGroupList.name',
                defaultMessage: 'Taxon authors',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          commonNameGroup: {
            [config]: {
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
                    defaultMessage: 'Common Name',
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
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'citation/local, citation/shared',
                  },
                },
              },
            },
            commonNameSourceDetail: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.taxon_common.commonNameSourceDetail.name',
                    defaultMessage: 'Source Detail',
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
