import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import Notification from './Notification';
import ValidationErrorMessage from './ValidationErrorMessage';

const propTypes = {
  errors: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default function ValidationErrorNotification(props, context) {
  const {
    errors,
    recordType,
  } = props;

  if (!errors) {
    return null;
  }

  const {
    config,
  } = context;

  const recordTypeConfig =
    get(config, ['recordTypes', recordType])
    || get(config, ['invocables', 'report', recordType])
    || get(config, ['invocables', 'batch', recordType]);

  const fieldDescriptor = get(recordTypeConfig, 'fields');

  return (
    <Notification {...props}>
      <ValidationErrorMessage errors={errors} fieldDescriptor={fieldDescriptor} />
    </Notification>
  );
}

ValidationErrorNotification.propTypes = propTypes;
ValidationErrorNotification.contextTypes = contextTypes;
