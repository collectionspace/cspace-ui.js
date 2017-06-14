import React from 'react';
import Immutable from 'immutable';
import { createRenderer } from 'react-test-renderer/shallow';
import BooleanConditionInput from '../../../../../src/components/search/input/BooleanConditionInput';
import FieldConditionInput from '../../../../../src/components/search/input/FieldConditionInput';
import SearchConditionInput from '../../../../../src/components/search/input/SearchConditionInput';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
} from '../../../../../src/constants/searchOperators';

chai.should();

describe('SearchConditionInput', function suite() {
  it('should render a BooleanConditionInput for AND conditions', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchConditionInput condition={condition} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BooleanConditionInput);
  });

  it('should render a BooleanConditionInput for OR conditions', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchConditionInput condition={condition} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BooleanConditionInput);
  });

  it('should render a FieldConditionInput for other conditions', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchConditionInput condition={condition} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(FieldConditionInput);
  });

  it('should pass condition, fields, and onCommit props to the base component', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
    });

    const fields = {};
    const onCommit = () => null;

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchConditionInput
        condition={condition}
        fields={fields}
        onCommit={onCommit}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.condition.should.equal(condition);
    result.props.fields.should.equal(fields);
    result.props.onCommit.should.equal(onCommit);
  });
});
