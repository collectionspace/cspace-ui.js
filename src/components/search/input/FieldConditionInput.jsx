import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import SearchField from './SearchField';
import RangeSearchField from './RangeSearchField';

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

const operationMessages = defineMessages({
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
});

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  onCommit: PropTypes.func,
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
    } = this.props;

    const operation = condition.get('op');
    const path = condition.get('path');
    const value = condition.get('value');

    const pathArray = path.split('/');
    const name = pathArray[pathArray.length - 1];
    const parentPath = ['document', ...pathArray.slice(0, pathArray.length - 1)];

    const SearchFieldComponent = (operation === OP_RANGE) ? RangeSearchField : SearchField;

    return (
      <div className={styles.common}>
        <div>{name}</div>
        <FormattedMessage {...operationMessages[operation]} tagName="div" />
        <div>
          <SearchFieldComponent
            parentPath={parentPath}
            name={name}
            value={value}
            onCommit={this.handleValueCommit}
          />
        </div>
      </div>
    );
  }
}

FieldConditionInput.propTypes = propTypes;
