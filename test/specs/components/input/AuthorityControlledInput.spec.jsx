import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { baseComponents as inputComponents } from 'cspace-input';

import AuthorityControlledInput from '../../../../src/components/input/AuthorityControlledInput';

import createTestContainer from '../../../helpers/createTestContainer';

const FilteringDropdownMenuInput = inputComponents.FilteringDropdownMenuInput;

chai.should();

describe('AuthorityControlledInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a FilteringDropdownMenuInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AuthorityControlledInput authority="" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(FilteringDropdownMenuInput);
  });

  // TODO: Complete tests.
});
