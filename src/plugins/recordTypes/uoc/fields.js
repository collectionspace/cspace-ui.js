import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_INT,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:uoc_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:uoc_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/uoc',
          },
        },
        referenceNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.referenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'uoc',
              },
            },
          },
        },
        projectId: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.projectId.name',
                defaultMessage: 'Project ID',
              },
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'proj',
              },
            },
          },
        },
        projectDescription: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.projectDescription.name',
                defaultMessage: 'Project Description',
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
        methodList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          method: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.uoc_common.method.name',
                  defaultMessage: 'Method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'uocmethods',
                },
              },
            },
          },
        },
        title: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        authorizationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          authorizationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.uoc_common.authorizationGroup.name',
                  defaultMessage: 'Authorization',
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
            authorizedBy: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.uoc_common.authorizedBy.name',
                    defaultMessage: 'Authorized by',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared',
                  },
                },
              },
            },
            authorizationDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fulName: {
                    id: 'field.uoc_common.authorizationDate.fulName',
                    defaultMessage: 'Authorization date',
                  },
                  name: {
                    id: 'field.uoc_common.authorizationDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            authorizationNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.uoc_common.authorizationNote.fullName',
                    defaultMessage: 'Authorization note',
                  },
                  name: {
                    id: 'field.uoc_common.authorizationNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            authorizationStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.uoc_common.authorizationStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'uocauthorizationstatuses',
                  },
                },
              },
            },
          },
        },
        startSingleDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          startSingleDateGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.uoc_common.startSingleDateGroup.name',
                  defaultMessage: 'Start/single dates', // FIX ME
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
            startSingleDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.uoc_common.startSingleDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            numberOfVisitors: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.uoc_common.numberOfVisitors.name',
                    defaultMessage: 'No. of vistors',
                  },
                }),
                dataType: DATA_TYPE_INT,
                view: {
                  type: TextInput,
                },
              },
            },
            hoursSpent: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.uoc_common.hoursSpent.name',
                    defaultMessage: 'Hours spent',
                  },
                }),
                dataType: DATA_TYPE_INT,
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        endDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.endDate.name',
                defaultMessage: 'End date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        userGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          userGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.uoc_common.userGroup.name',
                  defaultMessage: 'User',
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
            user: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.uoc_common.user.fullName',
                    defaultMessage: 'User name',
                  },
                  name: {
                    id: 'field.uoc_common.user.name',
                    defaultMessage: 'Name',
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
            userType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.uoc_common.userType.fullName',
                    defaultMessage: 'User type',
                  },
                  name: {
                    id: 'field.uoc_common.userType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'uocusertypes',
                  },
                },
              },
            },
            userRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.uoc_common.userRole.fullName',
                    defaultMessage: 'User role',
                  },
                  name: {
                    id: 'field.uoc_common.userRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'uocuserroles',
                  },
                },
              },
            },
            userInstitution: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.uoc_common.userInstitution.fullName',
                    defaultMessage: 'User institution',
                  },
                  name: {
                    id: 'field.uoc_common.userInstitution.name',
                    defaultMessage: 'Institution',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local,organization/all,organization/shared',
                  },
                },
              },
            },

          },
        },
        location: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.location.name',
                defaultMessage: 'Location',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'organization/local,organization/shared,place/local,place/shared,location/local',
              },
            },
          },
        },
        note: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.note.name',
                defaultMessage: 'Note',
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
        provisos: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.provisos.name',
                defaultMessage: 'Provisos',
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
        result: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.uoc_common.result.name',
                defaultMessage: 'Result',
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
    },
  };
};
