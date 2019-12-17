import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import withCsid from '../../../src/enhancers/withCsid';

chai.should();

describe('withCsid', () => {
  it('should set csid prop on the base component with csid from context', () => {
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
