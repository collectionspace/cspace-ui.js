import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import BooleanConditionInput from './BooleanConditionInput';
import FieldConditionInput from './FieldConditionInput';

import {
  OP_AND,
  OP_OR,
} from '../../../constants/searchOperators';

const conditionInputComponentForOperator = operator => (
  (operator === OP_AND || operator === OP_OR) ? BooleanConditionInput : FieldConditionInput
);

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  fields: PropTypes.object,
  onCommit: PropTypes.func,
};

export default function SearchConditionInput(props) {
  const {
    condition,
    fields,
    onCommit,
  } = props;

  const operator = condition.get('op');
  const ConditionInput = conditionInputComponentForOperator(operator);

  return (
    <ConditionInput
      condition={condition}
      fields={fields}
      onCommit={onCommit}
    />
  );
}

SearchConditionInput.propTypes = propTypes;
