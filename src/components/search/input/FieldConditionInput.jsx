import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchField from '../SearchField';
import RangeSearchField from '../RangeSearchField';
import { configKey } from '../../../helpers/configHelpers';

import {
  DATA_TYPE_BOOL,
} from '../../../constants/dataTypes';

import {
  OP_CONTAIN,
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
    [OP_CONTAIN]: {
      id: 'fieldConditionInput.OP_CONTAIN.full',
      defaultMessage: 'contains',
    },
    [OP_EQ]: {
      id: 'fieldConditionInput.OP_EQ.full',
      defaultMessage: 'is',
    },
    [OP_GT]: {
      id: 'fieldConditionInput.OP_GT.full',
      defaultMessage: 'is greater than',
    },
    [OP_GTE]: {
      id: 'fieldConditionInput.OP_GTE.full',
      defaultMessage: 'is greater than or equal to',
    },
    [OP_LT]: {
      id: 'fieldConditionInput.OP_LT.full',
      defaultMessage: 'is less than',
    },
    [OP_LTE]: {
      id: 'fieldConditionInput.OP_LTE.full',
      defaultMessage: 'is less than or equal to',
    },
    [OP_MATCH]: {
      id: 'fieldConditionInput.OP_MATCH.full',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'fieldConditionInput.OP_RANGE.full',
      defaultMessage: 'is between',
    },
  }),
  compact: defineMessages({
    [OP_CONTAIN]: {
      id: 'fieldConditionInput.OP_CONTAIN.compact',
      defaultMessage: 'contains',
    },
    [OP_EQ]: {
      id: 'fieldConditionInput.OP_EQ.compact',
      defaultMessage: '=',
    },
    [OP_GT]: {
      id: 'fieldConditionInput.OP_GT.compact',
      defaultMessage: '>',
    },
    [OP_GTE]: {
      id: 'fieldConditionInput.OP_GTE.compact',
      defaultMessage: '≥',
    },
    [OP_LT]: {
      id: 'fieldConditionInput.OP_LT.compact',
      defaultMessage: '<',
    },
    [OP_LTE]: {
      id: 'fieldConditionInput.OP_LTE.compact',
      defaultMessage: '≤',
    },
    [OP_MATCH]: {
      id: 'fieldConditionInput.OP_MATCH.compact',
      defaultMessage: 'matches',
    },
    [OP_RANGE]: {
      id: 'fieldConditionInput.OP_RANGE.compact',
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

    const fieldConfig = get(config, ['recordTypes', recordType, 'fields', ...path, configKey]);
    const dataType = get(fieldConfig, 'dataType');
    const messages = get(fieldConfig, 'messages');

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
            inline={inline}
            parentPath={parentPath}
            name={name}
            readOnly={readOnly}
            // Booleans only have two possible values, so null (don't care) or a single desired
            // value is sufficient to describe all searches, and there's no need to allow multiple
            // values.
            repeating={dataType !== DATA_TYPE_BOOL}
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
