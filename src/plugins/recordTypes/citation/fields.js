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
    StructuredDateInput,
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
            defaultChildSubpath: 'ns2:citations_common',
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
                    id: 'hierarchyInput.citation.parent',
                    defaultMessage: 'Broader citation',
                  },
                  children: {
                    id: 'hierarchyInput.citation.children',
                    defaultMessage: 'Narrower citations',
                  },
                  siblings: {
                    id: 'hierarchyInput.citation.siblings',
                    defaultMessage: 'Adjacent citations',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:citations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/citation',
          },
        },
        inAuthority: {
          [config]: {
            cloneable: false,
          },
        },
        shortIdentifier: {
          [config]: {
            cloneable: false,
          },
        },
        citationTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.citations_common.citationTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          citationTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationTermGroup.name',
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
                    id: 'field.citations_common.termDisplayName.name',
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
                    id: 'field.citations_common.termName.name',
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
                    id: 'field.citations_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'citationtermtype',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'citationtermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'citationTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termQualifier.name',
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
                    id: 'field.citations_common.termLanguage.name',
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
                    id: 'field.citations_common.termPrefForLang.name',
                    defaultMessage: 'Preferred for language',
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
                    id: 'field.citations_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.citations_common.termSource.fullName',
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
                    id: 'field.citations_common.termSourceDetail.name',
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
                    id: 'field.citations_common.termSourceID.name',
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
                    id: 'field.citations_common.termSourceNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termFullCitation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termFullCitation.name',
                    defaultMessage: 'Full citation',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termTitle: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termTitle.name',
                    defaultMessage: 'Title',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSubTitle: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termSubTitle.name',
                    defaultMessage: 'Subtitle',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termSectionTitle: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termSectionTitle.name',
                    defaultMessage: 'Section title',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termVolume: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termVolume.name',
                    defaultMessage: 'Volume',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termIssue: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.termIssue.name',
                    defaultMessage: 'Issue',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        citationRecordTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationRecordType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationRecordType.name',
                  defaultMessage: 'Type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'citationtermtype',
                },
              },
            },
          },
        },
        citationPublicationInfoGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationPublicationInfoGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationPublicationInfoGroup.name',
                  defaultMessage: 'Publication',
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
            publisher: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.publisher.name',
                    defaultMessage: 'Publisher',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local',
                  },
                },
              },
            },
            publicationPlace: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.publicationPlace.name',
                    defaultMessage: 'Place',
                  },
                  fullName: {
                    id: 'field.citations_common.publicationPlace.fullName',
                    defaultMessage: 'Publication place',
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
            publicationDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.publicationDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            edition: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.edition.name',
                    defaultMessage: 'Edition',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            pages: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.pages.name',
                    defaultMessage: 'Page(s)',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        citationAgentInfoGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationAgentInfoGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationAgentInfoGroup.name',
                  defaultMessage: 'Agent',
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
            agent: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.agent.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.citations_common.agent.fullName',
                    defaultMessage: 'Agent name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan,organization/local',
                  },
                },
              },
            },
            role: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.role.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'agentinfotype',
                  },
                },
              },
            },
            note: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.note.name',
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
        citationNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.citations_common.citationNote.name',
                defaultMessage: 'Citation note',
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
        citationResourceIdentGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationResourceIdentGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationResourceIdentGroup.name',
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
            resourceIdent: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.resourceIdent.name',
                    defaultMessage: 'Identifier',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            type: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.type.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'resourceidtype',
                  },
                },
              },
            },
            captureDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.captureDate.name',
                    defaultMessage: 'Capture date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
          },
        },
        citationRelatedTermsGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          citationRelatedTermsGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.citations_common.citationRelatedTermsGroup.name',
                  defaultMessage: 'Related term',
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
            relatedTerm: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.relatedTerm.name',
                    defaultMessage: 'Term',
                  },
                  fullName: {
                    id: 'field.citations_common.relatedTerm.fullName',
                    defaultMessage: 'Related term',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'concept/associated,concept/activity,concept/material',
                  },
                },
              },
            },
            relationType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.citations_common.relationType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'relationtypetype',
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
