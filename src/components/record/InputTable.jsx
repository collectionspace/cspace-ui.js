import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
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

const renderMessageLabel = message => (
  <Label>
    <FormattedMessage {...message} />
  </Label>
);

const renderTableLabel = (recordTypeConfig, name) => {
  const message = get(recordTypeConfig, ['messages', 'inputTable', name]);

  return (message ? renderMessageLabel(message) : null);
};

const renderFieldLabel = (fieldConfig) => {
  const message = get(fieldConfig, ['messages', 'name']);

  return (message ? renderMessageLabel(message) : null);
};

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
};

export default function InputTable(props, context) {
  const {
    children,
    name,
  } = props;

  const {
    config,
    recordType,
  } = context;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const fields = get(recordTypeConfig, 'fields');

  const renderLabel = (input) => {
    const path = dataPathToFieldDescriptorPath(pathHelpers.getPath(input.props));
    const field = get(fields, path);
    const fieldConfig = get(field, configKey);

    return renderFieldLabel(fieldConfig);
  };

  const tableLabel = renderTableLabel(recordTypeConfig, name);

  return (
    <BaseInputTable label={tableLabel} renderLabel={renderLabel}>
      {children}
    </BaseInputTable>
  );
}

InputTable.propTypes = propTypes;
InputTable.contextTypes = contextTypes;
