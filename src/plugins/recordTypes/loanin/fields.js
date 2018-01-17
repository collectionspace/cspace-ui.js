import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
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
            defaultChildSubpath: 'ns2:loansin_common',
          },
        },
      },
      ...coreFields,
      'ns2:loansin_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/loanin',
          },
        },
        loanInNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanInNumber.name',
                defaultMessage: 'Loan in number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'loanin',
              },
            },
          },
        },
        loanPurpose: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanPurpose.name',
                defaultMessage: 'Loan purpose',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'loanPurposes',
              },
            },
          },
        },
        loanStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          loanStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.loansin_common.loanStatusGroup.name',
                  defaultMessage: 'Loan status',
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
            loanStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.loanStatus.name',
                    defaultMessage: 'Status',
                  },
                  fullName: {
                    id: 'field.loansin_common.loanStatus.fullName',
                    defaultMessage: 'Loan status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'loanoutstatus',
                  },
                },
              },
            },
            loanStatusDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.loanStatusDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.loansin_common.loanStatusDate.fullName',
                    defaultMessage: 'Loan status date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            loanStatusNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.loanStatusNote.name',
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
        lenderGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          lenderGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.loansin_common.lenderGroup.name',
                  defaultMessage: 'Lender',
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
            lender: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lender.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.loansin_common.lender.fullName',
                    defaultMessage: 'Lender name',
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
            lendersContact: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lendersContact.name',
                    defaultMessage: 'Contact',
                  },
                  fullName: {
                    id: 'field.loansin_common.lendersContact.fullName',
                    defaultMessage: 'Lender contact',
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
            lendersAuthorizer: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lendersAuthorizer.name',
                    defaultMessage: 'Authorizer',
                  },
                  fullName: {
                    id: 'field.loansin_common.lendersAuthorizer.fullName',
                    defaultMessage: 'Lender authorizer',
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
            lendersAuthorizationDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lendersAuthorizationDate.name',
                    defaultMessage: 'Authorization date',
                  },
                  fullName: {
                    id: 'field.loansin_common.lendersAuthorizationDate.fullName',
                    defaultMessage: 'Lender authorization date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        borrowersContact: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.borrowersContact.name',
                defaultMessage: 'Contact',
              },
              fullName: {
                id: 'field.loansin_common.borrowersContact.fullName',
                defaultMessage: 'Borrower contact',
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
        borrowersAuthorizer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.borrowersAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
              fullName: {
                id: 'field.loansin_common.borrowersAuthorizer.fullName',
                defaultMessage: 'Borrower authorizer',
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
        borrowersAuthorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.borrowersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
              },
              fullName: {
                id: 'field.loansin_common.borrowersAuthorizationDate.fullName',
                defaultMessage: 'Borrower authorization date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        loanInConditions: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanInConditions.name',
                defaultMessage: 'Conditions of loan',
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
        loanInNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanInNote.name',
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
        loanInDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanInDate.name',
                defaultMessage: 'Loan in date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        loanReturnDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanReturnDate.name',
                defaultMessage: 'Loan return date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        loanRenewalApplicationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanRenewalApplicationDate.name',
                defaultMessage: 'Loan renewal application date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
      },
    },
  };
};
