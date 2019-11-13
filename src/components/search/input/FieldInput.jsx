import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';

import {
  OptionPickerInput,
} from '../../../helpers/configContextInputs';

import {
  configKey,
  getRecordFieldOptionListName,
} from '../../../helpers/configHelpers';

const propTypes = {
  config: PropTypes.object.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  rootPath: PropTypes.string,
  value: PropTypes.string,
  valueDescriptor: PropTypes.object,
  onCommit: PropTypes.func,
};

export default function FieldInput(props) {
  const {
    config,
    name,
    placeholder,
    readOnly,
    recordType,
    rootPath,
    value,
    valueDescriptor,
    onCommit,
  } = props;

  if (readOnly) {
    let message;

    if (valueDescriptor) {
      const rootPathParts = rootPath ? rootPath.split('/') : [];
      const pathParts = value ? value.split('/') : [];

      const isFirstLevelField = (pathParts.length - rootPathParts.length === 1);
      const messages = get(valueDescriptor, [configKey, 'messages']);

      if (messages) {
        if (!isFirstLevelField) {
          message = messages.fullName;
        }

        if (!message) {
          message = messages.name || messages.fullName;
        }
      }
    }

    return message
      ? <div><FormattedMessage {...message} /></div>
      : <div><span>{value}</span></div>;
  }

  const sortComparator = (optionA, optionB) => {
    const labelA = optionA.label;
    const labelB = optionB.label;

    return labelA.localeCompare(labelB, config.locale, { sensitivity: 'base' });
  };

  return (
    <OptionPickerInput
      blankable={false}
      name={name}
      placeholder={placeholder}
      source={getRecordFieldOptionListName(recordType, rootPath)}
      value={value}
      sortComparator={sortComparator}
      onCommit={onCommit}
    />
  );
}

FieldInput.propTypes = propTypes;
