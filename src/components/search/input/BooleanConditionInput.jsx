import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
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
      defaultMessage: '{opSelectorInput} of the following conditions must be satisfied:',
    },
  }),
};

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  fields: PropTypes.object,
  inline: PropTypes.bool,
  intl: intlShape,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
};

class BooleanConditionInput extends Component {
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
      inline,
      intl,
      readOnly,
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
            inline={inline}
            readOnly={readOnly}
            onCommit={handleChildConditionCommit(index)}
          />
        </li>
      );
    });

    let opSelector;

    if (!readOnly) {
      const opSelectorInput = (
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

      opSelector = (
        <FormattedMessage
          {...messages.opSelector.label}
          tagName="div"
          values={{ opSelectorInput }}
        />
      );
    }

    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className}>
        {opSelector}
        <ul>
          {inputs}
        </ul>
      </div>
    );
  }
}

BooleanConditionInput.propTypes = propTypes;

export default injectIntl(BooleanConditionInput);
