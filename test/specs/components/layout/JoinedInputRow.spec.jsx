import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { components as inputComponents } from 'cspace-input';
import JoinedInputRow from '../../../../src/components/layout/JoinedInputRow';

const {
  TabularCompoundInput,
} = inputComponents;

chai.should();

describe('JoinedInputRow', function suite() {
  it('should render as a TabularCompoundInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<JoinedInputRow />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TabularCompoundInput);
  });
});
