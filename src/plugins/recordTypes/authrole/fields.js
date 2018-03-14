import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    PermissionsInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    isNewRecord,
  } = configContext.recordDataHelpers;

  return {
    'ns2:role': {
      [config]: {
        service: {
          ns: 'http://collectionspace.org/services/authorization',
        },
        view: {
          type: CompoundInput,
        },
      },
      '@csid': {
        [config]: {
          cloneable: false,
        },
      },
      createdAt: {
        [config]: {
          cloneable: false,
        },
      },
      updatedAt: {
        [config]: {
          cloneable: false,
        },
      },
      metadataProtection: {
        [config]: {
          cloneable: false,
        },
      },
      permsProtection: {
        [config]: {
          cloneable: false,
        },
      },
      displayName: {
        [config]: {
          cloneable: false,
          messages: defineMessages({
            name: {
              id: 'field.authrole.displayName.name',
              defaultMessage: 'Name',
            },
          }),
          required: true,
          view: {
            type: TextInput,
          },
        },
      },
      description: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.authrole.description.name',
              defaultMessage: 'Description',
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
      roleName: {
        [config]: {
          compute: ({ recordData }) => {
            // Compute a name if this is a new role.

            if (isNewRecord(recordData)) {
              // What should this do? REST API requires this field, but it seems like it just needs
              // to be something unique.

              const displayName = recordData.getIn(['ns2:role', 'displayName']);

              return displayName
                .toUpperCase()
                .replace(/ /g, '_')
                .replace(/[^A-Z0-9_]/g, '')
                .replace(/__+/g, '_');
            }

            return undefined;
          },
        },
      },
      permission: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.authrole.permission.name',
              defaultMessage: 'Permissions',
            },
          }),
          view: {
            type: PermissionsInput,
          },
        },
      },
    },
  };
};
