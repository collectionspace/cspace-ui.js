import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    OptionPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:contacts_common',
          },
        },
      },
      'ns2:contacts_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/contact',
          },
        },
        emailGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          emailGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.contacts_common.emailGroup.name',
                  defaultMessage: 'Email',
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
            email: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.email.name',
                    defaultMessage: 'Address',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            emailType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.emailType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'emailTypes',
                  },
                },
              },
            },
          },
        },
        telephoneNumberGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          telephoneNumberGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.contacts_common.telephoneNumberGroup.name',
                  defaultMessage: 'Phone',
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
            telephoneNumber: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.telephoneNumber.name',
                    defaultMessage: 'Number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            telephoneNumberType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.telephoneNumberType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'telephoneNumberTypes',
                  },
                },
              },
            },
          },
        },
        faxNumberGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          faxNumberGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.contacts_common.faxNumberGroup.name',
                  defaultMessage: 'Fax',
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
            faxNumber: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.faxNumber.name',
                    defaultMessage: 'Number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            faxNumberType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.faxNumberType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'faxNumberTypes',
                  },
                },
              },
            },
          },
        },
        webAddressGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          webAddressGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.contacts_common.webAddressGroup.name',
                  defaultMessage: 'Web site',
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
            webAddress: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.webAddress.name',
                    defaultMessage: 'URL',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            webAddressType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.webAddressTypeType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'webAddressTypes',
                  },
                },
              },
            },
          },
        },
        addressGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          addressGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.contacts_common.addressGroup.name',
                  defaultMessage: 'Address',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            addressType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'addressTypes',
                  },
                },
              },
            },
            addressPlace1: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressPlace1.name',
                    defaultMessage: 'Line 1',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressPlace2: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressPlace2.name',
                    defaultMessage: 'Line 2',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressMunicipality: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressMunicipality.name',
                    defaultMessage: 'Municipality',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            addressStateOrProvince: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressStateOrProvince.name',
                    defaultMessage: 'State/province',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-state',
                  },
                },
              },
            },
            addressPostCode: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressPostCode.name',
                    defaultMessage: 'Postal code',
                  },
                }),
                view: {
                  type: TextInput,
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-postcode',
                  },
                },
              },
            },
            addressCountry: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.contacts_common.addressCountry.name',
                    defaultMessage: 'Country',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    // Suppress Chrome autofill
                    autoComplete: 'cspace-country',
                    source: 'addressCountries',
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
