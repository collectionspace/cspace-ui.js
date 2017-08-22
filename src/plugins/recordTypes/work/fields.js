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
    StructuredDateInput,
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
            defaultChildSubpath: 'ns2:works_common',
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
                    id: 'hierarchyInput.work.parent',
                    defaultMessage: 'Broader context',
                  },
                  children: {
                    id: 'hierarchyInput.work.children',
                    defaultMessage: 'Narrower context',
                  },
                  siblings: {
                    id: 'hierarchyInput.work.siblings',
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
      'ns2:works_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/work',
          },
        },
        workTermGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.workTermGroupList.name',
                defaultMessage: 'Work term group(s)',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          workTermGroup: {
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
                    id: 'field.works_common.termDisplayName.name',
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
                    id: 'field.works_common.termName.name',
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
                    id: 'field.works_common.termType.name',
                    defaultMessage: 'Term type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            termFlag: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.termFlag.name',
                    defaultMessage: 'Term flag',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'worktermflag',
                  },
                },
              },
            },
            termStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.termStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'workTermStatuses',
                  },
                },
              },
            },
            termQualifier: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.termQualifier.name',
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
                    id: 'field.works_common.termLanguage.name',
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
                    id: 'field.works_common.termPrefForLang.name',
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
                    id: 'field.works_common.termSource.name',
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
                    id: 'field.works_common.termSourceDetail.name',
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
                    id: 'field.works_common.termSourceID.name',
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
                    id: 'field.works_common.termSourceNote.name',
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
        workHistoryNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.workHistoryNote.name',
                defaultMessage: 'History notes',
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
        workType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.workType.name',
                defaultMessage: 'Work record type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'worktype',
              },
            },
          },
        },
        workDateGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.workDateGroupList.name',
                defaultMessage: 'Work date',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          workDateGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            workDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.workDate.name',
                    defaultMessage: 'Work date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
          },
        },
        creatorGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.creatorGroupList.name',
                defaultMessage: 'Creator',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          creatorGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            creator: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.creator.name',
                    defaultMessage: 'Creator',
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
            creatorType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.creatorType.name',
                    defaultMessage: 'Creator type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'workcreatortype',
                  },
                },
              },
            },
          },
        },
        publisherGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.publisherGroupList.name',
                defaultMessage: 'Publisher',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          publisherGroup: {
            [config]: {
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
                    id: 'field.works_common.publisher.name',
                    defaultMessage: 'Publisher',
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
            publisherType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.publisherType.name',
                    defaultMessage: 'Publisher type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'workpublishertype',
                  },
                },
              },
            },
          },
        },
        addrGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.works_common.addrGroupList.name',
                defaultMessage: 'Address',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          addrGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            addressType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'addresstype',
                  },
                },
              },
            },
            addressPlace1: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressPlace1.name',
                    defaultMessage: 'Line 1',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressPlace2: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressPlace2.name',
                    defaultMessage: 'Line 2',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressMunicipality: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressMunicipality.name',
                    defaultMessage: 'Municipality',
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
            addressStateOrProvince: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressStateOrProvince.name',
                    defaultMessage: 'State/Province',
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
            addressPostCode: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressPostCode.name',
                    defaultMessage: 'Postal code',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressCountry: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.works_common.addressCountry.name',
                    defaultMessage: 'Country',
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
          },
        },
      },
    },
  };
};
