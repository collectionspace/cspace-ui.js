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
            defaultChildSubpath: 'ns2:dutyofcares_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:dutyofcares_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/dutyofcare',
          },
        },
        dutyOfCareNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.dutyofcares_common.dutyOfCareNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.dutyofcares_common.dutyOfCareNumber.name',
                defaultMessage: 'Duty of care id',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'dutyofcares_common:dutyOfCareNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'dutyofcare',
              },
            },
          },
        },
        originationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.dutyofcares_common.originationDate.name',
                defaultMessage: 'Origination date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        dutyOfCareTitle: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.dutyofcares_common.dutyOfCareTitle.fullName',
                defaultMessage: 'Duty of care title',
              },
              name: {
                id: 'field.dutyofcares_common.dutyOfCareTitle.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        dutyOfCareNotes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          dutyOfCareNote: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.dutyofcares_common.dutyOfCareNote.name',
                  defaultMessage: 'Note',
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
        dutyOfCareDetailsGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          dutyOfCareDetailsGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.dutyofcares_common.dutyOfCareDetailsGroup.name',
                  defaultMessage: 'Duty of care details',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            detailType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailType.fullName',
                    defaultMessage: 'Duty of care details type',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'dutyofcaretype',
                  },
                },
              },
            },
            detailLevel: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.procedure.detailLevel.fullName',
                    defaultMessage: 'Duty of care details level',
                  },
                  name: {
                    id: 'field.procedure.detailLevel.name',
                    defaultMessage: 'Level',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'dutyofcarelevel',
                  },
                },
              },
            },
            detailDeterminedBy: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailDeterminedBy.fullName',
                    defaultMessage: 'Duty of care details determined by',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailDeterminedBy.name',
                    defaultMessage: 'Determined by',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,organization/local',
                  },
                },
              },
            },
            detailDeterminationDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailDeterminationDate.fullName',
                    defaultMessage: 'Duty of care details determination date',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailDeterminationDate.name',
                    defaultMessage: 'Determination date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            detailNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailNote.fullName',
                    defaultMessage: 'Duty of care detail note',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailNote.name',
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
                  id: 'field.dutyofcares_common.partiesInvolvedGroup.name',
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
                    id: 'field.dutyofcares_common.involvedParty.fullName',
                    defaultMessage: 'Parties involved',
                  },
                  name: {
                    id: 'field.dutyofcares_common.involvedParty.name',
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
                    id: 'field.dutyofcares_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Parties involved on behalf of',
                  },
                  name: {
                    id: 'field.dutyofcares_common.involvedOnBehalfOf.name',
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
                    id: 'field.dutyofcares_common.involvedRole.fullName',
                    defaultMessage: 'Parties involved roles',
                  },
                  name: {
                    id: 'field.dutyofcares_common.involvedRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'dutyofcarerole',
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
