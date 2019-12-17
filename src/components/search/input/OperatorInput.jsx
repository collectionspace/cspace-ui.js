import React from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages, injectIntl, intlShape, FormattedMessage,
} from 'react-intl';
import { baseComponents as inputComponents } from 'cspace-input';

import {
  OP_COMPLETE,
  OP_CONTAIN,
  OP_EQ,
  OP_GT,
  OP_GTC,
  OP_GTE,
  OP_LT,
  OP_LTC,
  OP_LTE,
  OP_MATCH,
  OP_RANGE,
  OP_NULL,
  OP_NOT_COMPLETE,
  OP_NOT_CONTAIN,
  OP_NOT_EQ,
  OP_NOT_MATCH,
  OP_NOT_RANGE,
  OP_NOT_NULL,
} from '../../../constants/searchOperators';

const {
  OptionPickerInput,
} = inputComponents;

const operatorMessages = {
  full: defineMessages({
    [OP_COMPLETE]: {
      id: 'operatorInput.OP_COMPLETE',
      defaultMessage: 'is complete',
    },
    [OP_CONTAIN]: {
      id: 'operatorInput.OP_CONTAIN',
      defaultMessage: 'contains',
    },
    [OP_EQ]: {
      id: 'operatorInput.OP_EQ',
      defaultMessage: 'is',
    },
    [OP_GT]: {
      id: 'operatorInput.OP_GT',
      defaultMessage: 'is greater than',
    },
    [OP_GTC]: {
      id: 'operatorInput.OP_GTC',
      defaultMessage: 'is greater than or contains',
    },
    [OP_GTE]: {
      id: 'operatorInput.OP_GTE',
      defaultMessage: 'is at least',
    },
    [OP_LT]: {
      id: 'operatorInput.OP_LT',
      defaultMessage: 'is less than',
    },
    [OP_LTC]: {
      id: 'operatorInput.OP_LTC',
      defaultMessage: 'is less than or contains',
    },
    [OP_LTE]: {
      id: 'operatorInput.OP_LTE',
      defaultMessage: 'is at most',
    },
    [OP_MATCH]: {
      id: 'operatorInput.OP_MATCH',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'operatorInput.OP_RANGE',
      defaultMessage: 'is between',
    },
    [OP_NULL]: {
      id: 'operatorInput.OP_NULL',
      defaultMessage: 'is blank',
    },
    [OP_NOT_COMPLETE]: {
      id: 'operatorInput.OP_NOT_COMPLETE',
      defaultMessage: 'is incomplete',
    },
    [OP_NOT_CONTAIN]: {
      id: 'operatorInput.OP_NOT_CONTAIN',
      defaultMessage: 'does not contain',
    },
    [OP_NOT_EQ]: {
      id: 'operatorInput.OP_NOT_EQ',
      defaultMessage: 'is not',
    },
    [OP_NOT_MATCH]: {
      id: 'operatorInput.OP_NOT_MATCH',
      defaultMessage: 'does not match',
    },
    [OP_NOT_RANGE]: {
      id: 'operatorInput.OP_NOT_RANGE',
      defaultMessage: 'is not between',
    },
    [OP_NOT_NULL]: {
      id: 'operatorInput.OP_NOT_NULL',
      defaultMessage: 'is not blank',
    },
  }),
  compact: defineMessages({
    [OP_COMPLETE]: {
      id: 'operatorInput.compact.OP_COMPLETE',
      defaultMessage: 'is complete',
    },
    [OP_CONTAIN]: {
      id: 'operatorInput.compact.OP_CONTAIN',
      defaultMessage: 'contains',
    },
    [OP_EQ]: {
      id: 'operatorInput.compact.OP_EQ',
      defaultMessage: '=',
    },
    [OP_GT]: {
      id: 'operatorInput.compact.OP_GT',
      defaultMessage: '>',
    },
    [OP_GTC]: {
      id: 'operatorInput.compact.OP_GTC',
      defaultMessage: '> or contains',
    },
    [OP_GTE]: {
      id: 'operatorInput.compact.OP_GTE',
      defaultMessage: '≥',
    },
    [OP_LT]: {
      id: 'operatorInput.compact.OP_LT',
      defaultMessage: '<',
    },
    [OP_LTC]: {
      id: 'operatorInput.compact.OP_LTC',
      defaultMessage: '< or contains',
    },
    [OP_LTE]: {
      id: 'operatorInput.compact.OP_LTE',
      defaultMessage: '≤',
    },
    [OP_MATCH]: {
      id: 'operatorInput.compact.OP_MATCH',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'operatorInput.compact.OP_RANGE',
      defaultMessage: 'is between',
    },
    [OP_NULL]: {
      id: 'operatorInput.compact.OP_NULL',
      defaultMessage: 'is blank',
    },
    [OP_NOT_COMPLETE]: {
      id: 'operatorInput.compact.OP_NOT_COMPLETE',
      defaultMessage: 'is incomplete',
    },
    [OP_NOT_CONTAIN]: {
      id: 'operatorInput.compact.OP_NOT_CONTAIN',
      defaultMessage: 'doesn\'t contain',
    },
    [OP_NOT_EQ]: {
      id: 'operatorInput.compact.OP_NOT_EQ',
      defaultMessage: '≠',
    },
    [OP_NOT_MATCH]: {
      id: 'operatorInput.compact.OP_NOT_MATCH',
      defaultMessage: 'doesn\'t match',
    },
    [OP_NOT_RANGE]: {
      id: 'operatorInput.compact.OP_NOT_RANGE',
      defaultMessage: 'isn\'t between',
    },
    [OP_NOT_NULL]: {
      id: 'operatorInput.compact.OP_NOT_NULL',
      defaultMessage: 'isn\'t blank',
    },
  }),
};

const propTypes = {
  compact: PropTypes.bool,
  intl: intlShape,
  name: PropTypes.string,
  operators: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onCommit: PropTypes.func,
};

function OperatorInput(props) {
  const {
    compact,
    intl,
    name,
    operators,
    readOnly,
    value,
    onCommit,
  } = props;

  const messages = compact ? operatorMessages.compact : operatorMessages.full;

  if (readOnly) {
    return (
      <FormattedMessage {...messages[value]} tagName="div" />
    );
  }

  const options = operators.map((op) => (
    { value: op, label: intl.formatMessage(messages[op]) }
  ));

  return (
    <OptionPickerInput
      blankable={false}
      name={name}
      options={options}
      value={value}
      onCommit={onCommit}
    />
  );
}

OperatorInput.propTypes = propTypes;

export default injectIntl(OperatorInput);
