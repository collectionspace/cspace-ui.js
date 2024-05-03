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
                defaultMessage: 'Duty of care ID',
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
        title: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.dutyofcares_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
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
                  id: 'field.dutyofcares_common.note.name',
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
        detailGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          detailGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.dutyofcares_common.detailGroup.name',
                  defaultMessage: 'Duty of care detail',
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
                    defaultMessage: 'Duty of care detail type',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagpratype',
                  },
                },
              },
            },
            detailLevel: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailLevel.fullName',
                    defaultMessage: 'Duty of care detail level',
                  },
                  name: {
                    id: 'field.dutyofcares_common.detailLevel.name',
                    defaultMessage: 'Level',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'nagpralevel',
                  },
                },
              },
            },
            detailDeterminedBy: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.dutyofcares_common.detailDeterminedBy.fullName',
                    defaultMessage: 'Duty of care detail determined by',
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
                    defaultMessage: 'Duty of care detail determination date',
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
                  defaultMessage: 'Party involved',
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
                    defaultMessage: 'Party involved name',
                  },
                  name: {
                    id: 'field.dutyofcares_common.involvedParty.name',
                    defaultMessage: 'Name',
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
                    defaultMessage: 'Party involved on behalf of',
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
                    defaultMessage: 'Party involved roles',
                  },
                  name: {
                    id: 'field.dutyofcares_common.involvedRole.name',
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
      },
    },
  };
};
