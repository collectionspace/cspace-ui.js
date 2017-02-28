import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import Immutable from 'immutable';
import BaseBooleanConditionInput from './BooleanConditionInput';
import FieldConditionInput from './FieldConditionInput';

import {
  OP_AND,
  OP_OR,
} from '../../../constants/searchOperators';

const BooleanConditionInput = injectIntl(BaseBooleanConditionInput);

const conditionInputComponentForOperator = operator => (
  (operator === OP_AND || operator === OP_OR) ? BooleanConditionInput : FieldConditionInput
);

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  fields: PropTypes.object,
  onCommit: PropTypes.func,
};

export default class SearchConditionInput extends Component {
  render() {
    const {
      condition,
      fields,
      onCommit,
    } = this.props;

    const operator = condition.get('op');
    const ConditionInput = conditionInputComponentForOperator(operator);

    if (!ConditionInput) {
      return null;
    }

    return (
      <ConditionInput
        condition={condition}
        fields={fields}
        onCommit={onCommit}
      />
    );
  }
}

SearchConditionInput.propTypes = propTypes;
