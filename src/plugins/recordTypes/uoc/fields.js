import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    // OptionPickerInput,
    TextInput,
    AutocompleteInput,
    // IDGeneratorInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
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
            view: {
              type: TextInput,
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
        authorizedBy: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.uoc_common.authorizedBy.fullName',
                defaultMessage: 'Authorized by',
              },
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
              fullName: {
                id: 'field.uoc_common.authorizationDate.fullName',
                defaultMessage: 'Use of Collections authorization date',
              },
              name: {
                id: 'field.uoc_common.authorizationDate.name',
                defaultMessage: 'Authorization date',
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
              name: {
                id: 'field.uoc_common.authorizationNote.name',
                defaultMessage: 'Authorization Note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        startSingleDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.uoc_common.startSingleDate.fullName',
                defaultMessage: 'Use of Collections start/single date',
              },
              name: {
                id: 'field.uoc_common.startSingleDate.name',
                defaultMessage: 'Start/single date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        endDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.uoc_common.endDate.fullName',
                defaultMessage: 'Use of Collections end date',
              },
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
                  name: {
                    id: 'field.uoc_common.user.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.uoc_common.user.fullName',
                    defaultMessage: 'User name',
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
                  name: {
                    id: 'field.uoc_common.userType.name',
                    defaultMessage: 'User Type',
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
