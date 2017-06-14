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
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

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
      // TODO: Define core fields in one place.
      'ns2:collectionspace_core': {
        createdAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            view: {
              type: DateInput,
            },
          },
        },
        createdBy: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedAt.name',
                defaultMessage: 'Last updated time',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedBy.name',
                defaultMessage: 'Last updated by',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      'ns2:loansin_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/loanin',
          },
        },
        loanInNumber: {
          [config]: {
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
        lenderGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.lenderGroupList.name',
                defaultMessage: 'Lender',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          lenderGroup: {
            [config]: {
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
                    defaultMessage: 'Lender',
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
            lendersAuthorizer: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lendersAuthorizer.name',
                    defaultMessage: 'Lender\'s authorizer',
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
                  name: {
                    id: 'field.loansin_common.lendersContact.name',
                    defaultMessage: 'Lender\'s contact',
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
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.lendersAuthorizationDate.name',
                    defaultMessage: 'Lender\'s authorization date',
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
                defaultMessage: 'Borrower\'s contact',
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
                defaultMessage: 'Borrower\'s authorizer',
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
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.borrowersAuthorizationDate.name',
                defaultMessage: 'Borrower\'s authorization date',
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
                id: 'field.loansin_common.specialConditionsOfLoan.name',
                defaultMessage: 'Loan in conditions',
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
                defaultMessage: 'Loan in note',
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
            messages: defineMessages({
              name: {
                id: 'field.loansin_common.loanStatusGroupList.name',
                defaultMessage: 'Loan status',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          loanStatusGroup: {
            [config]: {
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
                messages: defineMessages({
                  name: {
                    id: 'field.loansin_common.loanStatusDate.name',
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
                    defaultMessage: 'Loan status note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        loanInDate: {
          [config]: {
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
