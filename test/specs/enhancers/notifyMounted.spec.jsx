import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import createTestContainer from '../../helpers/createTestContainer';
import notifyMounted from '../../../src/enhancers/notifyMounted';

chai.should();

describe('notifyMounted', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the base component', function test() {
    const StubComponent = () => null;
    const EnhancedComponent = notifyMounted(StubComponent, () => {});
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(StubComponent);
  });

  it('should call the callback with the supplied arguments when mounted', function test() {
    const StubComponent = () => null;
    const callbackArg = 'foo';

    let argReceived = null;

    const handleMounted = (arg) => {
      argReceived = arg;
    };

    const EnhancedComponent = notifyMounted(StubComponent, handleMounted, callbackArg);

    render(<EnhancedComponent />, this.container);

    argReceived.should.equal(callbackArg);
  });
});
