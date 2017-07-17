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
    DateInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:locations_common',
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
                    id: 'hierarchyInput.location.parent',
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.location.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.location.siblings',
                    defaultMessage: 'Equivalent context',
                  },
                }),
              },
            },
          },
        },
      },
      // TODO: Define core fields in one place.
      'ns2:collectionspace_core': {
        createdAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            view: {
              type: DateInput,
            },
          },
        },
        createdBy: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedAt.name',
                defaultMessage: 'Last updated time',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedBy.name',
                defaultMessage: 'Last updated by',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      'ns2:locations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/location',
          },
        },
        locTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.locTermGroupList.name',
                defaultMessage: 'Location term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          locTermGroup: {
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
                    id: 'field.locations_common.termDisplayName.name',
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
                    id: 'field.locations_common.termName.name',
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
                    id: 'field.locations_common.termType.name',
                    defaultMessage: 'Term type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'termType',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.termFlag.name',
                    defaultMessage: 'Term flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'locationtermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.termStatus.name',
                    defaultMessage: 'Term status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'termStatus',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.termQualifier.name',
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
                    id: 'field.locations_common.termLanguage.name',
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
                    id: 'field.locations_common.termPrefForLang.name',
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
                    id: 'field.locations_common.termSource.name',
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
                    id: 'field.locations_common.termSourceDetail.name',
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
                    id: 'field.locations_common.termSourceID.name',
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
                    id: 'field.locations_common.termSourceNote.name',
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
        accessNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.accessNote.name',
                defaultMessage: 'Access note',
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
        address: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.address.name',
                defaultMessage: 'Address',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        conditionGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.persons_common.conditionGroupList.name',
                defaultMessage: 'Condition note',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conditionGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            conditionNote: {
              [config]: {
                message: defineMessages({
                  name: {
                    id: 'field.locations_common.conditionNote.name',
                    defaultMessage: 'Condition note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            conditionNoteDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.conditionNoteDate.name',
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
        securityNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.securityNote.name',
                defaultMessage: 'Security note',
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
        locationType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.locationType.name',
                defaultMessage: 'Storage location record type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'locationtype',
              },
            },
          },
        },
      },
    },
  };
};
