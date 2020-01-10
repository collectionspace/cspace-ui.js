import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    TextInput,
  } = configContext.inputComponents;

  return {
    csid: {
      [config]: {
        cloneable: false,
        messages: defineMessages({
          name: {
            id: 'field.ext.authItem.csid.name',
            defaultMessage: 'System CSID',
          },
        }),
        // This is a sythesized field, so it can't be searched.
        searchDisabled: true,
        view: {
          type: TextInput,
        },
      },
    },
    inAuthority: {
      [config]: {
        cloneable: false,
        messages: defineMessages({
          name: {
            id: 'field.ext.authItem.inAuthority.name',
            defaultMessage: 'System authority CSID',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    refName: {
      [config]: {
        cloneable: false,
        messages: defineMessages({
          name: {
            id: 'field.ext.authItem.refName.name',
            defaultMessage: 'System ref name',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    shortIdentifier: {
      [config]: {
        cloneable: false,
        messages: defineMessages({
          name: {
            id: 'field.ext.authItem.shortIdentifier.name',
            defaultMessage: 'System short ID',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
  };
};
