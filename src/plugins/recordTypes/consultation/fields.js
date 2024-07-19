import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TextInput,
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

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:consultations_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:consultations_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/consultation',
          },
        },
        consultationNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.consultations_common.consultationNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.consultations_common.consultationNumber.name',
                defaultMessage: 'Consultation number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'consultations_common:consultationNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'consultation',
              },
            },
          },
        },
        consultationDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.consultations_common.consultationDate.name',
                defaultMessage: 'Initial consultation date',
              },
            }),
            dataType: DATA_TYPE_DATE,
            view: {
              type: DateInput,
            },
          },
        },
        reason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.consultations_common.reason.name',
                defaultMessage: 'Consultation reason',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'consultationreason',
              },
            },
          },
        },
        notes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          note: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.consultations_common.note.name',
                  defaultMessage: 'Consultation note',
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
        partiesInvolvedGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          partiesInvolvedGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.consultations_common.partiesInvolvedGroup.name',
                  defaultMessage: 'Parties involved',
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
            involvedParty: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.involvedParty.fullName',
                    defaultMessage: 'Parties involved party',
                  },
                  name: {
                    id: 'field.consultations_common.involvedParty.name',
                    defaultMessage: 'Party',
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
            involvedOnBehalfOf: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Parties involved on behalf of',
                  },
                  name: {
                    id: 'field.consultations_common.involvedOnBehalfOf.name',
                    defaultMessage: 'On behalf of',
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
            involvedRole: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.involvedRole.fullName',
                    defaultMessage: 'Parties involved role',
                  },
                  name: {
                    id: 'field.consultations_common.involvedRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagprainvolvedrole',
                  },
                },
              },
            },
          },
        },
        consultationLogGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          consultationLogGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.consultations_common.consultationLogGroup.name',
                  defaultMessage: 'Consultation log',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            consultType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.consultType.fullName',
                    defaultMessage: 'Consultation log type',
                  },
                  name: {
                    id: 'field.consultations_common.consultType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'consultationtype',
                  },
                },
              },
            },
            consultParties: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              consultParty: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.consultations_common.consultParty.fullName',
                      defaultMessage: 'Consultation log party',
                    },
                    name: {
                      id: 'field.consultations_common.consultParty.name',
                      defaultMessage: 'Party',
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
            consultStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.consultStatus.fullName',
                    defaultMessage: 'Consultation log status',
                  },
                  name: {
                    id: 'field.consultations_common.consultStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'consultationstatus',
                  },
                },
              },
            },
            consultDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.consultDate.fullName',
                    defaultMessage: 'Consultation log date',
                  },
                  name: {
                    id: 'field.consultations_common.consultDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                dataType: DATA_TYPE_DATE,
                view: {
                  type: DateInput,
                },
              },
            },
            consultNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.consultations_common.consultNote.fullName',
                    defaultMessage: 'Consultation log note',
                  },
                  name: {
                    id: 'field.consultations_common.consultNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    height: 46,
                    multiline: true,
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
