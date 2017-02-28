import React, { Component, PropTypes } from 'react';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { baseComponents as inputComponents } from 'cspace-input';
import SearchConditionInput from './SearchConditionInput';

import {
  OP_AND,
  OP_OR,
} from '../../../constants/searchOperators';

import styles from '../../../../styles/cspace-ui/BooleanConditionInput.css';

const {
  DropdownMenuInput,
} = inputComponents;

const messages = {
  [OP_AND]: defineMessages({
    label: {
      id: 'booleanConditionInput.and.label',
      defaultMessage: 'and',
    },
    opSelectorLabel: {
      id: 'booleanConditionInput.and.opSelectorLabel',
      defaultMessage: 'All',
    },
  }),
  [OP_OR]: defineMessages({
    label: {
      id: 'booleanConditionInput.or.label',
      defaultMessage: 'or',
    },
    opSelectorLabel: {
      id: 'booleanConditionInput.or.opSelectorLabel',
      defaultMessage: 'Any',
    },
  }),
  opSelector: defineMessages({
    label: {
      id: 'booleanConditionInput.opSelector.label',
      defaultMessage: '{opSelector}of the following conditions must be satisfied:',
    },
  }),
};

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  fields: PropTypes.object,
  intl: intlShape,
  onCommit: PropTypes.func,
};

export default class BooleanConditionInput extends Component {
  constructor() {
    super();

    this.handleOpSelectorCommit = this.handleOpSelectorCommit.bind(this);
  }

  handleOpSelectorCommit(path, value) {
    const {
      condition,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(condition.set('op', value));
    }
  }

  handleChildConditionCommit(index, childCondition) {
    const {
      condition,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(condition.setIn(['value', index], childCondition));
    }
  }

  render() {
    const {
      condition,
      fields,
      intl,
    } = this.props;

    const handleChildConditionCommit = index => (childCondition) => {
      this.handleChildConditionCommit(index, childCondition);
    };

    const operator = condition.get('op');
    const childConditions = condition.get('value');

    const inputs = childConditions.map((childCondition, index) => {
      const operatorLabel = (index > 0)
        ? <FormattedMessage {...messages[operator].label} />
        : <span />;

      return (
        <li key={index}>
          {operatorLabel}
          <SearchConditionInput
            condition={childCondition}
            fields={fields}
            index={index}
            onCommit={handleChildConditionCommit(index)}
          />
        </li>
      );
    });

    const opSelector = (
      <DropdownMenuInput
        name="booleanSearchOp"
        options={[
          { value: OP_OR, label: intl.formatMessage(messages[OP_OR].opSelectorLabel) },
          { value: OP_AND, label: intl.formatMessage(messages[OP_AND].opSelectorLabel) },
        ]}
        value={operator}
        onCommit={this.handleOpSelectorCommit}
      />
    );

    return (
      <div className={styles.common}>
        <FormattedMessage {...messages.opSelector.label} tagName="div" values={{ opSelector }} />
        <ul>
          {inputs}
        </ul>
      </div>
    );
  }
}

BooleanConditionInput.propTypes = propTypes;
