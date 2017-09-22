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
    StructuredDateInput,
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
            defaultChildSubpath: 'ns2:organizations_common',
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
                    id: 'hierarchyInput.organization.parent',
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.organization.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.organization.siblings',
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
      'ns2:organizations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/organization',
          },
        },
        orgTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.orgTermGroupList.name',
                defaultMessage: 'organization term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          orgTermGroup: {
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
                    id: 'field.organizations_common.termType.name',
                    defaultMessage: 'Term type',
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
                  name: {
                    id: 'field.organizations_common.termFlag.name',
                    defaultMessage: 'Term flag',
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
                    id: 'field.organizations_common.termSource.name',
                    defaultMessage: 'Source',
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
                    id: 'field.organizations_common.termSourceID.name',
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
                    id: 'field.organizations_common.termSourceNote.name',
                    defaultMessage: 'Source note',
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
                    defaultMessage: 'Additions to name',
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
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.organizationRecordTypes.name',
                defaultMessage: 'Organization record type',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          organizationRecordType: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.organizationRecordType.name',
                  defaultMessage: 'Organization record type',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.groups.name',
                defaultMessage: 'Group',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          group: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.group.name',
                  defaultMessage: 'Group',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
        },
        functions: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.functions.name',
                defaultMessage: 'Function',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          function: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.function.name',
                  defaultMessage: 'Function',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
        },
        historyNotes: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.historyNotes.name',
                defaultMessage: 'History',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          historyNote: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.historyNote.name',
                  defaultMessage: 'History',
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
        contactNames: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.organizations_common.contactNames.name',
                defaultMessage: 'Contact name',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          contactName: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.organizations_common.contactName.name',
                  defaultMessage: 'Contact name',
                },
              }),
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
