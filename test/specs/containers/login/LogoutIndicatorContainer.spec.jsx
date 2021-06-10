import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutIndicatorContainer from '../../../../src/containers/login/LogoutIndicatorContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([]);

describe('LogoutIndicatorContainer', () => {
  it('should set props on LogoutIndicator', () => {
    const store = mockStore({
      logout: {
        isPending: true,
        response: null,
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LogoutIndicatorContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const indicator = findWithType(result, LogoutIndicator);

    indicator.should.not.be.null;
    indicator.props.should.have.property('isPending', true);
    indicator.props.should.have.property('response', null);
  });
});
