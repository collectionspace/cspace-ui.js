import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
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

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

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
      ...extensions.core.fields,
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
              inUse: {
                id: 'field.loansin_common.loanInNumber.inUse',
                defaultMessage: 'The loan in number {value} is in use by another record.',
              },
              name: {
                id: 'field.loansin_common.loanInNumber.name',
                defaultMessage: 'Loan in number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'loansin_common:loanInNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'loanin',
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
            loanGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.loansin_common.loanGroup.fullName',
                    defaultMessage: 'Loan status group',
                  },
                  name: {
                    id: 'field.loansin_common.loanGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalgroup',
                  },
                },
              },
            },
            loanIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.loansin_common.loanIndividual.fullName',
                    defaultMessage: 'Loan status individual',
                  },
                  name: {
                    id: 'field.loansin_common.loanIndividual.name',
                    defaultMessage: 'Individual',
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
            loanStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.loansin_common.loanStatus.fullName',
                    defaultMessage: 'Loan status',
                  },
                  name: {
                    id: 'field.loansin_common.loanStatus.name',
                    defaultMessage: 'Status',
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
                  fullName: {
                    id: 'field.loansin_common.loanStatusDate.fullName',
                    defaultMessage: 'Loan status date',
                  },
                  name: {
                    id: 'field.loansin_common.loanStatusDate.name',
                    defaultMessage: 'Date',
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
                  fullName: {
                    id: 'field.loansin_common.loanStatusNote.fullName',
                    defaultMessage: 'Loan status note',
                  },
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
                  fullName: {
                    id: 'field.loansin_common.lender.fullName',
                    defaultMessage: 'Lender name',
                  },
                  name: {
                    id: 'field.loansin_common.lender.name',
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
            lendersContact: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.loansin_common.lendersContact.fullName',
                    defaultMessage: 'Lender contact',
                  },
                  name: {
                    id: 'field.loansin_common.lendersContact.name',
                    defaultMessage: 'Contact',
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
                  fullName: {
                    id: 'field.loansin_common.lendersAuthorizer.fullName',
                    defaultMessage: 'Lender authorizer',
                  },
                  name: {
                    id: 'field.loansin_common.lendersAuthorizer.name',
                    defaultMessage: 'Authorizer',
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
                  fullName: {
                    id: 'field.loansin_common.lendersAuthorizationDate.fullName',
                    defaultMessage: 'Lender authorization date',
                  },
                  name: {
                    id: 'field.loansin_common.lendersAuthorizationDate.name',
                    defaultMessage: 'Authorization date',
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
              fullName: {
                id: 'field.loansin_common.borrowersContact.fullName',
                defaultMessage: 'Borrower contact',
              },
              name: {
                id: 'field.loansin_common.borrowersContact.name',
                defaultMessage: 'Contact',
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
              fullName: {
                id: 'field.loansin_common.borrowersAuthorizer.fullName',
                defaultMessage: 'Borrower authorizer',
              },
              name: {
                id: 'field.loansin_common.borrowersAuthorizer.name',
                defaultMessage: 'Authorizer',
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
              fullName: {
                id: 'field.loansin_common.borrowersAuthorizationDate.fullName',
                defaultMessage: 'Borrower authorization date',
              },
              name: {
                id: 'field.loansin_common.borrowersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
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
        creditLine: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.creditLine.name',
                defaultMessage: 'Credit line',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
    },
  };
};
