import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    TextInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    addrGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      addrGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.address.addrGroup.name',
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
              fullName: {
                id: 'field.ext.address.addressType.fullName',
                defaultMessage: 'Address type',
              },
              name: {
                id: 'field.ext.address.addressType.name',
                defaultMessage: 'Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'addresstype',
              },
            },
          },
        },
        addressPlace1: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.ext.address.addressPlace1.name',
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
                id: 'field.ext.address.addressPlace2.name',
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
                id: 'field.ext.address.addressMunicipality.name',
                defaultMessage: 'Municipality',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'place/local,place/tgn',
              },
            },
          },
        },
        addressStateOrProvince: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.ext.address.addressStateOrProvince.name',
                defaultMessage: 'State/Province',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'place/local,place/tgn',
              },
            },
          },
        },
        addressPostCode: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.ext.address.addressPostCode.name',
                defaultMessage: 'Postal code',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        addressCountry: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.ext.address.addressCountry.name',
                defaultMessage: 'Country',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'place/local,place/tgn',
              },
            },
          },
        },
      },
    },
  };
};
