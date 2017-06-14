import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchField from '../SearchField';
import RangeSearchField from '../RangeSearchField';
import { configKey } from '../../../helpers/configHelpers';

import {
  OP_EQ,
  OP_GT,
  OP_GTE,
  OP_LT,
  OP_LTE,
  OP_MATCH,
  OP_RANGE,
} from '../../../constants/searchOperators';

import styles from '../../../../styles/cspace-ui/FieldConditionInput.css';

const operatorMessages = {
  full: defineMessages({
    [OP_EQ]: {
      id: 'fieldConditionInput.op.eq',
      defaultMessage: 'is',
    },
    [OP_GT]: {
      id: 'fieldConditionInput.op.gt',
      defaultMessage: 'is greater than',
    },
    [OP_GTE]: {
      id: 'fieldConditionInput.op.gte',
      defaultMessage: 'is greater than or equal to',
    },
    [OP_LT]: {
      id: 'fieldConditionInput.op.lt',
      defaultMessage: 'is less than',
    },
    [OP_LTE]: {
      id: 'fieldConditionInput.op.lte',
      defaultMessage: 'is less than or equal to',
    },
    [OP_MATCH]: {
      id: 'fieldConditionInput.op.match',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'fieldConditionInput.op.range',
      defaultMessage: 'is between',
    },
  }),
  compact: defineMessages({
    [OP_EQ]: {
      id: 'fieldConditionInput.op.eq.compact',
      defaultMessage: '=',
    },
    [OP_GT]: {
      id: 'fieldConditionInput.op.gt.compact',
      defaultMessage: '>',
    },
    [OP_GTE]: {
      id: 'fieldConditionInput.op.gte.compact',
      defaultMessage: '≥',
    },
    [OP_LT]: {
      id: 'fieldConditionInput.op.lt.compact',
      defaultMessage: '<',
    },
    [OP_LTE]: {
      id: 'fieldConditionInput.op.lte.compact',
      defaultMessage: '≤',
    },
    [OP_MATCH]: {
      id: 'fieldConditionInput.op.match.compact',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'fieldConditionInput.op.range.compact',
      defaultMessage: 'between',
    },
  }),
};

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  inline: PropTypes.bool,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
};

export default class FieldConditionInput extends Component {
  constructor() {
    super();

    this.handleValueCommit = this.handleValueCommit.bind(this);
  }

  handleValueCommit(path, value) {
    const {
      condition,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(condition.set('value', value));
    }
  }

  render() {
    const {
      condition,
      inline,
      readOnly,
    } = this.props;

    const {
      config,
      recordType,
    } = this.context;

    const operator = condition.get('op');
    const pathSpec = condition.get('path');
    const value = condition.get('value');

    const path = ['document', ...pathSpec.split('/')];
    const name = path[path.length - 1];
    const parentPath = path.slice(0, path.length - 1);

    const messages = get(config, ['recordTypes', recordType, 'fields', ...path, configKey, 'messages']);

    const label = messages
      ? <FormattedMessage {...(messages.fullName || messages.name)} />
      : name;

    const SearchFieldComponent = (operator === OP_RANGE) ? RangeSearchField : SearchField;
    const className = inline ? styles.inline : styles.normal;
    const opMessages = inline ? operatorMessages.compact : operatorMessages.full;

    return (
      <div className={className}>
        <div>{label}</div>
        {' '}
        <FormattedMessage {...opMessages[operator]} tagName="div" />
        {' '}
        <div>
          <SearchFieldComponent
            parentPath={parentPath}
            name={name}
            readOnly={readOnly}
            value={value}
            onCommit={this.handleValueCommit}
          />
        </div>
      </div>
    );
  }
}

FieldConditionInput.propTypes = propTypes;
FieldConditionInput.contextTypes = contextTypes;
