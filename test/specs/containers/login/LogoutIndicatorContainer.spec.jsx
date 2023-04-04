import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutIndicatorContainer from '../../../../src/containers/login/LogoutIndicatorContainer';

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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LogoutIndicatorContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();
    const indicator = findWithType(result, LogoutIndicator);

    indicator.props.should.have.property('isPending', true);
    indicator.props.should.have.property('response', null);
  });
});
