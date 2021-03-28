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
            defaultChildSubpath: 'ns2:hits_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:hits_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/hit',
          },
        },
        hitNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.hitNumber.name',
                defaultMessage: 'Held-in-Trust number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'hit',
              },
            },
          },
        },
        entryDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.entryDate.name',
                defaultMessage: 'Entry date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        hitDepositorGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          hitDepositorGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.hitDepositorGroup.name',
                  defaultMessage: 'Depositor',
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
            depositor: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositor.fullName',
                    defaultMessage: 'Depositor',
                  },
                  name: {
                    id: 'field.hits_common.depositor.name',
                    defaultMessage: 'Depositor',
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
            depositorContact: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorContact.fullName',
                    defaultMessage: 'Depositor contact',
                  },
                  name: {
                    id: 'field.hits_common.depositorContact.name',
                    defaultMessage: 'Depositor contact',
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
            depositorContactType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorContactType.fullName',
                    defaultMessage: 'Depositor Contact type',
                  },
                  name: {
                    id: 'field.hits_common.depositorContactType.name',
                    defaultMessage: 'Contact type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'depositorcontacttypes',
                  },
                },
              },
            },
            depositorNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorNote.fullName',
                    defaultMessage: 'Depositor note',
                  },
                  name: {
                    id: 'field.hits_common.depositorNote.name',
                    defaultMessage: 'Depositor note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
