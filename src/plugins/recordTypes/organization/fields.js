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
            defaultChildSubpath: 'ns2:organizations_common',
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
                    id: 'hierarchyInput.organization.parent',
                    defaultMessage: 'Broader organization',
                  },
                  children: {
                    id: 'hierarchyInput.organization.children',
                    defaultMessage: 'Narrower organizations',
                  },
                  siblings: {
                    id: 'hierarchyInput.organization.siblings',
                    defaultMessage: 'Adjacent organizations',
                  },
                }),
              },
            },
          },
        },
      },
      ...extensions.core.fields,
      'ns2:organizations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/organization',
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
        orgTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.organizations_common.orgTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          orgTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.orgTermGroup.name',
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
                    id: 'field.organizations_common.termDisplayName.name',
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
                    id: 'field.organizations_common.termName.name',
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
                    id: 'field.organizations_common.termType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'orgTermTypes',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.organizations_common.termFlag.fullName',
                    defaultMessage: 'Term flag',
                  },
                  name: {
                    id: 'field.organizations_common.termFlag.name',
                    defaultMessage: 'Flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'orgtermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.organizations_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'orgTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.organizations_common.termQualifier.name',
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
                    id: 'field.organizations_common.termLanguage.fullName',
                    defaultMessage: 'Term language',
                  },
                  name: {
                    id: 'field.organizations_common.termLanguage.name',
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
                    id: 'field.organizations_common.termPrefForLang.name',
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
                    id: 'field.organizations_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.organizations_common.termSource.fullName',
                    defaultMessage: 'Source name',
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
            termSourceDetail: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.organizations_common.termSourceDetail.name',
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
                    id: 'field.organizations_common.termSourceID.name',
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
                    id: 'field.organizations_common.termSourceNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            mainBodyName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.organizations_common.mainBodyName.name',
                    defaultMessage: 'Main body name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            additionsToName: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.organizations_common.additionsToName.name',
                    defaultMessage: 'Addition',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        organizationRecordTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          organizationRecordType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.organizationRecordType.name',
                  defaultMessage: 'Organization type',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'organizationtype',
                },
              },
            },
          },
        },
        foundingDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.foundingDateGroup.name',
                defaultMessage: 'Foundation date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        dissolutionDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.dissolutionDateGroup.name',
                defaultMessage: 'Dissolution date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        foundingPlace: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.foundingPlace.name',
                defaultMessage: 'Foundation place',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        groups: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          group: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.group.name',
                  defaultMessage: 'Group',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        functions: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          function: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.function.name',
                  defaultMessage: 'Function',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
        historyNotes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          historyNote: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.historyNote.name',
                  defaultMessage: 'History',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
          },
        },
        contactNames: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          contactName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.contactName.name',
                  defaultMessage: 'Contact name',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local',
                },
              },
            },
          },
        },
      },
    },
  };
};
