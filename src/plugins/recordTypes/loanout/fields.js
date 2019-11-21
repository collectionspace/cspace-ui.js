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

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:loansout_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:loansout_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/loanout',
          },
        },
        loanOutNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.loanOutNumber.name',
                defaultMessage: 'Loan out number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'loanout',
              },
            },
          },
        },
        loanPurpose: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.loanPurpose.name',
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
        lendersAuthorizer: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.loansout_common.lendersAuthorizer.fullName',
                defaultMessage: 'Lender authorizer',
              },
              name: {
                id: 'field.loansout_common.lendersAuthorizer.name',
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
        lendersContact: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.loansout_common.lendersContact.fullName',
                defaultMessage: 'Lender contact',
              },
              name: {
                id: 'field.loansout_common.lendersContact.name',
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
        lendersAuthorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.loansout_common.lendersAuthorizationDate.fullName',
                defaultMessage: 'Lender authorization date',
              },
              name: {
                id: 'field.loansout_common.lendersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        borrower: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.loansout_common.borrower.fullName',
                defaultMessage: 'Borrower name',
              },
              name: {
                id: 'field.loansout_common.borrower.name',
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
        borrowersContact: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.loansout_common.borrowersContact.fullName',
                defaultMessage: 'Borrower contact',
              },
              name: {
                id: 'field.loansout_common.borrowersContact.name',
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
                id: 'field.loansout_common.borrowersAuthorizer.fullName',
                defaultMessage: 'Borrower authorizer',
              },
              name: {
                id: 'field.loansout_common.borrowersAuthorizer.name',
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
                id: 'field.loansout_common.borrowersAuthorizationDate.fullName',
                defaultMessage: 'Borrower authorization date',
              },
              name: {
                id: 'field.loansout_common.borrowersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        specialConditionsOfLoan: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.specialConditionsOfLoan.name',
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
        loanOutNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.loanOutNote.name',
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
                  id: 'field.loansout_common.loanStatusGroup.name',
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
                    id: 'field.loansout_common.loanGroup.fullName',
                    defaultMessage: 'Loan status group',
                  },
                  name: {
                    id: 'field.loansout_common.loanGroup.name',
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
                    id: 'field.loansout_common.loanIndividual.fullName',
                    defaultMessage: 'Loan status individual',
                  },
                  name: {
                    id: 'field.loansout_common.loanIndividual.name',
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
                    id: 'field.loansout_common.loanStatus.fullName',
                    defaultMessage: 'Loan status',
                  },
                  name: {
                    id: 'field.loansout_common.loanStatus.name',
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
                    id: 'field.loansout_common.loanStatusDate.fullName',
                    defaultMessage: 'Loan status date',
                  },
                  name: {
                    id: 'field.loansout_common.loanStatusDate.name',
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
                    id: 'field.loansout_common.loanStatusNote.fullName',
                    defaultMessage: 'Loan status note',
                  },
                  name: {
                    id: 'field.loansout_common.loanStatusNote.name',
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
        loanOutDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.loanOutDate.name',
                defaultMessage: 'Loan out date',
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
                id: 'field.loansout_common.loanReturnDate.name',
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
                id: 'field.loansout_common.loanRenewalApplicationDate.name',
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
