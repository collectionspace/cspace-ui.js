import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutIndicatorContainer from '../../../../src/containers/login/LogoutIndicatorContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('LogoutIndicatorContainer', function suite() {
  it('should set props on LogoutIndicator', function test() {
    const store = mockStore({
      logout: {
        isPending: true,
        response: null,
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LogoutIndicatorContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(LogoutIndicator);
    result.props.should.have.property('isPending', true);
    result.props.should.have.property('response', null);
  });
});
