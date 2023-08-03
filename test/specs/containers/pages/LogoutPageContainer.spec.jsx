import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import LogoutPage from '../../../../src/components/pages/LogoutPage';
import LogoutPageContainer from '../../../../src/containers/pages/LogoutPageContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('LogoutPageContainer', () => {
  it('should set props on LogoutPage', () => {
    const history = {};
    const store = mockStore({});
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <LogoutPageContainer
        store={store}
        history={history}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, LogoutPage);

    page.type.should.equal(LogoutPage);
    page.props.should.have.property('logout').that.is.a('function');
  });
});
