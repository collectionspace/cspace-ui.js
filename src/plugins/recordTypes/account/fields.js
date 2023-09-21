import { defineMessages } from 'react-intl';
import Immutable from 'immutable';
import { isExistingRecord, isNewRecord } from '../../../helpers/recordDataHelpers';
import { isValidPassword } from '../../../helpers/passwordHelpers';
import { isValidEmail } from '../../../helpers/validationHelpers';

import {
  ERR_INVALID_EMAIL,
  ERR_INVALID_PW,
  ERR_PW_NOT_CONFIRMED,
} from '../../../constants/errorCodes';

const isMetadataImmutable = ({ recordData }) => (
  recordData.getIn(['ns2:accounts_common', 'metadataProtection']) === 'immutable'
);

const areRolesImmutable = ({ recordData }) => (
  recordData.getIn(['ns2:accounts_common', 'rolesProtection']) === 'immutable'
);

export default (configContext) => {
  const {
    CheckboxInput,
    CompoundInput,
    OptionPickerInput,
    RolesInput,
    TextInput,
    PasswordInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
  } = configContext.dataTypes;

  return {
    'ns2:accounts_common': {
      [config]: {
        messages: defineMessages({
          errorNotConfirmed: {
            id: 'field.accounts_common.errorNotConfirmed',
            description: 'Message to display when the password confirmation does not match the password on a user account record.',
            defaultMessage: 'Password and confirm password must be identical.',
          },
        }),
        service: {
          ns: 'http://collectionspace.org/services/account',
        },
        validate: ({ data, fieldDescriptor }) => {
          const password = data.get('password');
          const confirmPassword = data.get('confirmPassword');

          if (password !== confirmPassword) {
            return {
              code: ERR_PW_NOT_CONFIRMED,
              message: fieldDescriptor[config].messages.errorNotConfirmed,
            };
          }

          return undefined;
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
      rolesProtection: {
        [config]: {
          cloneable: false,
        },
      },
      screenName: {
        [config]: {
          cloneable: false,
          messages: defineMessages({
            name: {
              id: 'field.accounts_common.screenName.name',
              defaultMessage: 'Full name',
            },
          }),
          required: true,
          view: {
            type: TextInput,
            props: {
              // Suppress Chrome autofill
              autoComplete: 'cspace-name',
              readOnly: isMetadataImmutable,
            },
          },
        },
      },
      email: {
        [config]: {
          cloneable: false,
          messages: defineMessages({
            errorInvalidEmail: {
              id: 'field.accounts_common.email.errorInvalidEmail',
              description: 'Message to display when the email is invalid on the user account form.',
              defaultMessage: 'Email is not a valid address. Correct the value {value}.',
            },
            name: {
              id: 'field.accounts_common.email.name',
              defaultMessage: 'Email address',
            },
          }),
          required: true,
          validate: ({ data, fieldDescriptor }) => {
            if (!isValidEmail(data)) {
              return {
                code: ERR_INVALID_EMAIL,
                message: fieldDescriptor[config].messages.errorInvalidEmail,
                value: data,
              };
            }

            return undefined;
          },
          view: {
            type: TextInput,
            props: {
              // Suppress Chrome autofill
              autoComplete: 'cspace-email',
              readOnly: isMetadataImmutable,
            },
          },
        },
      },
      requireSSO: {
        [config]: {
          cloneable: false,
          dataType: DATA_TYPE_BOOL,
          defaultValue: false,
          messages: defineMessages({
            name: {
              id: 'field.accounts_common.requireSSO.name',
              defaultMessage: 'Require single sign-on (if available)',
            },
          }),
          view: {
            type: CheckboxInput,
            props: {
              readOnly: isMetadataImmutable,
            },
          },
        },
      },
      password: {
        [config]: {
          cloneable: false,
          messages: defineMessages({
            errorInvalidPassword: {
              id: 'field.accounts_common.password.errorInvalidPassword',
              description: 'Message to display when the password is invalid on the user account form.',
              defaultMessage: 'Password must be between 8 and 24 characters.',
            },
            name: {
              id: 'field.accounts_common.password.name',
              defaultMessage: 'Password',
            },
          }),
          required: ({ recordData }) => (
            isNewRecord(recordData)
            && recordData.getIn(['ns2:accounts_common', 'requireSSO']) === false
          ),
          validate: ({ data, fieldDescriptor }) => {
            if (data && !isValidPassword(data)) {
              return {
                code: ERR_INVALID_PW,
                message: fieldDescriptor[config].messages.errorInvalidPassword,
              };
            }

            return undefined;
          },
          view: {
            type: PasswordInput,
            props: {
              autoComplete: 'new-password',
              readOnly: isMetadataImmutable,
            },
          },
        },
      },
      confirmPassword: {
        [config]: {
          cloneable: false,
          messages: defineMessages({
            name: {
              id: 'field.accounts_common.passwordConfirmation.name',
              defaultMessage: 'Confirm password',
            },
          }),
          required: ({ recordData }) => (
            isNewRecord(recordData)
            && recordData.getIn(['ns2:accounts_common', 'requireSSO']) === false
          ),
          view: {
            type: PasswordInput,
            props: {
              autoComplete: 'new-password',
              readOnly: isMetadataImmutable,
            },
          },
        },
      },
      status: {
        [config]: {
          defaultValue: 'active',
          messages: defineMessages({
            name: {
              id: 'field.accounts_common.status.name',
              defaultMessage: 'Status',
            },
          }),
          required: true,
          view: {
            type: OptionPickerInput,
            props: {
              readOnly: isMetadataImmutable,
              source: 'accountStatuses',
            },
          },
        },
      },
      userId: {
        [config]: {
          cloneable: false,
          compute: ({ recordData }) => {
            if (isExistingRecord(recordData)) {
              // Don't compute a value if this is an existing record.
              return undefined;
            }

            // Set the value to the email address.

            return recordData.getIn(['ns2:accounts_common', 'email']);
          },
          messages: defineMessages({
            name: {
              id: 'field.accounts_common.userId.name',
              defaultMessage: 'User ID',
            },
          }),
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      roleList: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        role: {
          [config]: {
            defaultValue: Immutable.List(),
            messages: defineMessages({
              name: {
                id: 'field.account.role.name',
                defaultMessage: 'Roles',
              },
            }),
            view: {
              type: RolesInput,
              props: {
                readOnly: areRolesImmutable,
              },
            },
          },
        },
      },
    },
  };
};
