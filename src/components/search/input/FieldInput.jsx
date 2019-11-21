import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import get from 'lodash/get';
import { DATA_TYPE_STRUCTURED_DATE } from '../../../constants/dataTypes';
import { formatExtensionFieldName } from '../../../helpers/formatHelpers';

import {
  OptionPickerInput,
} from '../../../helpers/configContextInputs';

import {
  configKey,
  getRecordFieldOptionListName,
} from '../../../helpers/configHelpers';

const propTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  rootPath: PropTypes.string,
  value: PropTypes.string,
  valueDescriptor: PropTypes.object,
  onCommit: PropTypes.func,
};

export function BaseFieldInput(props) {
  const {
    config,
    intl,
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
    let label = value;

    if (valueDescriptor) {
      const valueConfig = valueDescriptor[configKey];
      const extensionParentConfig = get(valueConfig, 'extensionParentConfig');
      const messages = get(valueConfig, 'messages');

      const rootPathParts = rootPath ? rootPath.split('/') : [];
      const pathParts = value ? value.split('/') : [];

      const level = (pathParts.length - rootPathParts.length);

      if (messages) {
        let message;

        if (extensionParentConfig && extensionParentConfig.dataType === DATA_TYPE_STRUCTURED_DATE) {
          // Special case for constructing the label for fields in structured dates.

          if (level > 1) {
            label = formatExtensionFieldName(intl, valueConfig);
          } else {
            message = messages.name || messages.fullName;
          }
        } else {
          if (level > 1) {
            message = messages.fullName;
          }

          if (!message) {
            message = messages.name || messages.fullName;
          }
        }

        if (message) {
          label = intl.formatMessage(message);
        }
      }
    }

    return <div><span>{label}</span></div>;
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

BaseFieldInput.propTypes = propTypes;

export default injectIntl(BaseFieldInput);
