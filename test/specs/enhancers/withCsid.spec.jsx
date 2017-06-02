import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import withCsid from '../../../src/enhancers/withCsid';

chai.should();

describe('withCsid', function suite() {
  it('should set csid prop on the base component with csid from context', function test() {
    const csid = '1234';

    const reactContext = {
      csid,
    };

    const StubComponent = () => null;
    const EnhancedComponent = withCsid(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent />, reactContext);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('csid', csid);
  });
});
