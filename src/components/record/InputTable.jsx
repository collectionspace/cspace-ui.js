import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import get from 'lodash/get';

import {
  components as inputComponents,
  helpers as inputHelpers,
} from 'cspace-input';

import {
  configKey,
  dataPathToFieldDescriptorPath,
} from '../../helpers/configHelpers';

const {
  Label,
  InputTable: BaseInputTable,
} = inputComponents;

const { pathHelpers } = inputHelpers;

const renderMessageLabel = (message, props) => (
  <Label {...props}>
    <FormattedMessage {...message} />
  </Label>
);

const renderTableLabel = (recordTypeConfig, name) => {
  const message = get(recordTypeConfig, ['messages', 'inputTable', name]);

  return (message ? renderMessageLabel(message) : null);
};

const renderFieldLabel = (fieldConfig, inputProps) => {
  const message = get(fieldConfig, ['messages', 'name']);

  const props = {
    readOnly: inputProps.readOnly,
    required: inputProps.required,
  };

  if ('readOnly' in fieldConfig) {
    props.readOnly = fieldConfig.readOnly;
  }

  if ('required' in fieldConfig) {
    props.required = fieldConfig.required;
  }

  return (message ? renderMessageLabel(message, props) : null);
};

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  intl: intlShape,
  recordType: PropTypes.string,
};

export default function InputTable(props, context) {
  const {
    children,
    name,
  } = props;

  const {
    config,
    intl,
    recordType,
  } = context;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const fields = get(recordTypeConfig, 'fields');

  const renderLabel = (input) => {
    const path = dataPathToFieldDescriptorPath(pathHelpers.getPath(input.props));
    const field = get(fields, path);
    const fieldConfig = get(field, configKey);

    return (fieldConfig && renderFieldLabel(fieldConfig, input.props));
  };

  const renderAriaLabel = (input) => {
    const path = dataPathToFieldDescriptorPath(pathHelpers.getPath(input.props));
    const field = get(fields, path);
    const messages = get(field, [configKey, 'messages']);
    const message = messages && (messages.fullName || messages.name);

    return (message && intl.formatMessage(message));
  };

  const tableLabel = renderTableLabel(recordTypeConfig, name);

  return (
    <BaseInputTable
      label={tableLabel}
      renderLabel={renderLabel}
      renderAriaLabel={renderAriaLabel}
    >
      {children}
    </BaseInputTable>
  );
}

InputTable.propTypes = propTypes;
InputTable.contextTypes = contextTypes;
