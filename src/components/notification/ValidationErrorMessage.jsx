import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { ERROR_KEY } from '../../helpers/recordDataHelpers';
import { configKey, dataPathToFieldDescriptorPath } from '../../helpers/configHelpers';

import {
  ERR_MISSING_REQ_FIELD,
  ERR_DATA_TYPE,
} from '../../constants/errorCodes';

const messages = defineMessages({
  [ERR_DATA_TYPE]: {
    id: 'validationErrorMessage.ERR_DATA_TYPE',
    description: 'The error message for a data type validation error.',
    defaultMessage: `{dataType, select,
      DATA_TYPE_INT {{fieldName} must be an integer.}
      DATA_TYPE_FLOAT {{fieldName} must be a number.}
      DATA_TYPE_DATE {{fieldName} must be a date in the format YYYY-MM-DD.}
      other {{fieldName} has an invalid value for the data type {dataType}.}
    }`,
  },
  [ERR_MISSING_REQ_FIELD]: {
    id: 'validationErrorMessage.ERR_MISSING_REQ_FIELD',
    description: 'The error message for a missing required field validation error.',
    defaultMessage: '{fieldName} is required.',
  },
  default: {
    id: 'validationErrorMessage.default',
    description: 'The default message for a validation error. Validators should provide a more specific message.',
    defaultMessage: '{fieldName} has an invalid value.',
  },
});

const propTypes = {
  errors: PropTypes.instanceOf(Immutable.Map),
  fieldDescriptor: PropTypes.object,
};

const formatErrors = (fieldDescriptor, errors, path = []) => {
  const formattedErrors = [];

  errors.entrySeq().forEach((entry) => {
    const [key, value] = entry;

    if (key === ERROR_KEY) {
      const id = path.join('.');
      const fieldDescriptorPath = dataPathToFieldDescriptorPath(path);
      const fieldMessages = get(fieldDescriptor, [...fieldDescriptorPath, configKey, 'messages']);
      const fieldNameMessage = get(fieldMessages, 'fullName') || get(fieldMessages, 'name');

      const fieldName = fieldNameMessage
        ? <FormattedMessage {...fieldNameMessage} />
        : path[path.length - 1];

      const error = value;

      if (error) {
        const errorMessage = error.get('message') || messages[error.get('code')] || messages.default;
        const values = error.set('fieldName', fieldName).toJS();

        const formattedMessage = (
          <li key={id}><FormattedMessage {...errorMessage} values={values} /></li>
        );

        formattedErrors.push(formattedMessage);
      }
    } else {
      formattedErrors.push(
        ...formatErrors(fieldDescriptor, value, [...path, key])
      );
    }
  });

  return formattedErrors;
};

export default function ValidationErrorMessage(props) {
  const {
    errors,
    fieldDescriptor,
  } = props;

  if (!errors) {
    return null;
  }

  const formattedErrors = formatErrors(fieldDescriptor, errors);

  return (
    <ul>
      {formattedErrors}
    </ul>
  );
}

ValidationErrorMessage.propTypes = propTypes;
