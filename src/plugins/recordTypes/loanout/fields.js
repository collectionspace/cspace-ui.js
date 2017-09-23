import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

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

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
                idGeneratorName: 'loanout',
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
              name: {
                id: 'field.loansout_common.lendersAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
              fullName: {
                id: 'field.loansout_common.lendersAuthorizer.fullName',
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
        lendersContact: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.lendersContact.name',
                defaultMessage: 'Contact',
              },
              fullName: {
                id: 'field.loansout_common.lendersContact.fullName',
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
        lendersAuthorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.loansout_common.lendersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
              },
              fullName: {
                id: 'field.loansout_common.lendersAuthorizationDate.fullName',
                defaultMessage: 'Lender authorization date',
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
              name: {
                id: 'field.loansout_common.borrower.name',
                defaultMessage: 'Name',
              },
              fullName: {
                id: 'field.loansout_common.borrower.fullName',
                defaultMessage: 'Borrower name',
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
              name: {
                id: 'field.loansout_common.borrowersContact.name',
                defaultMessage: 'Contact',
              },
              fullName: {
                id: 'field.loansout_common.borrowersContact.fullName',
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
                id: 'field.loansout_common.borrowersAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
              fullName: {
                id: 'field.loansout_common.borrowersAuthorizer.fullName',
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
                id: 'field.loansout_common.borrowersAuthorizationDate.name',
                defaultMessage: 'Authorization date',
              },
              fullName: {
                id: 'field.loansout_common.borrowersAuthorizationDate.fullName',
                defaultMessage: 'Borrower authorization date',
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
            loanStatus: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.loansout_common.loanStatus.name',
                    defaultMessage: 'Status',
                  },
                  fullName: {
                    id: 'field.loansout_common.loanStatus.fullName',
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
                    id: 'field.loansout_common.loanStatusDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.loansout_common.loanStatusDate.fullName',
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
