import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import withListType from '../../../src/enhancers/withListType';

chai.should();

describe('withListType', function suite() {
  it('should set listType prop on the base component with the given value', function test() {
    const listType = 'default';

    const StubComponent = () => null;
    const EnhancedComponent = withListType(StubComponent, listType);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('listType', listType);
  });
});
