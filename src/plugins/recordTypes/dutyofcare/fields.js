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
            defaultChildSubpath: 'ns2:dutiesofcare_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:dutiesofcare_common': {
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
                id: 'field.dutiesofcare_common.dutyOfCareNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.dutiesofcare_common.dutyOfCareNumber.name',
                defaultMessage: 'Duty of care number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'dutiesofcare_common:dutyOfCareNumber',
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
                id: 'field.dutiesofcare_common.originationDate.name',
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
              name: {
                id: 'field.dutiesofcare_common.dutyOfCareTitle.name',
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
                  id: 'field.dutiesofcare_common.note.name',
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
                  id: 'field.dutiesofcare_common.detailGroup.name',
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
                    id: 'field.dutiesofcare_common.detailType.fullName',
                    defaultMessage: 'Duty of care detail type',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.detailType.name',
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
                    id: 'field.dutiesofcare_common.detailLevel.fullName',
                    defaultMessage: 'Duty of care detail level',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.detailLevel.name',
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
                    id: 'field.dutiesofcare_common.detailDeterminedBy.fullName',
                    defaultMessage: 'Duty of care detail determined by',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.detailDeterminedBy.name',
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
                    id: 'field.dutiesofcare_common.detailDeterminationDate.fullName',
                    defaultMessage: 'Duty of care detail determination date',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.detailDeterminationDate.name',
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
                    id: 'field.dutiesofcare_common.detailNote.fullName',
                    defaultMessage: 'Duty of care detail note',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.detailNote.name',
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
                  id: 'field.dutiesofcare_common.partiesInvolvedGroup.name',
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
                    id: 'field.dutiesofcare_common.involvedParty.fullName',
                    defaultMessage: 'Parties involved person',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.involvedParty.name',
                    defaultMessage: 'Person',
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
                    id: 'field.dutiesofcare_common.involvedOnBehalfOf.fullName',
                    defaultMessage: 'Parties involved on behalf of',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.involvedOnBehalfOf.name',
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
                    id: 'field.dutiesofcare_common.involvedRole.fullName',
                    defaultMessage: 'Parties involved roles',
                  },
                  name: {
                    id: 'field.dutiesofcare_common.involvedRole.name',
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
