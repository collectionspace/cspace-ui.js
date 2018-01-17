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
    DATA_TYPE_DATE,
  } = pluginContext.dataTypes;

  const coreFields = pluginContext.config.fields.core;

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
                    id: 'hierarchyInput.location.parent',
                    defaultMessage: 'Broader location',
                  },
                  children: {
                    id: 'hierarchyInput.location.children',
                    defaultMessage: 'Narrower locations',
                  },
                  siblings: {
                    id: 'hierarchyInput.location.siblings',
                    defaultMessage: 'Adjacent locations',
                  },
                }),
              },
            },
          },
        },
      },
      ...coreFields,
      'ns2:locations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/location',
          },
        },
        locTermGroupList: {
          [config]: {
            messages: defineMessages({
              required: {
                id: 'field.locations_common.locTermGroupList.required',
                defaultMessage: 'At least one term display name is required. Please enter a value.',
              },
            }),
            required: true,
            view: {
              type: CompoundInput,
            },
          },
          locTermGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.locations_common.locTermGroup.name',
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
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'locationTermTypes',
                  },
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.termFlag.name',
                    defaultMessage: 'Flag',
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
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'locationTermStatuses',
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
                    id: 'field.locations_common.termSource.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.locations_common.termSource.fullName',
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
                    id: 'field.locations_common.termSourceDetail.name',
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
                    id: 'field.locations_common.termSourceID.name',
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
                    id: 'field.locations_common.termSourceNote.name',
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
        accessNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.accessNote.name',
                defaultMessage: 'Access note',
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
            view: {
              type: CompoundInput,
            },
          },
          conditionGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.persons_common.conditionGroup.name',
                  defaultMessage: 'Condition note',
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
            conditionNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.conditionNote.name',
                    defaultMessage: 'Note',
                  },
                  fullName: {
                    id: 'field.locations_common.conditionNote.fullName',
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
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.locations_common.conditionNoteDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.locations_common.conditionNoteDate.fullName',
                    defaultMessage: 'Condition note date',
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
        locationType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.locations_common.locationType.name',
                defaultMessage: 'Storage location type',
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
