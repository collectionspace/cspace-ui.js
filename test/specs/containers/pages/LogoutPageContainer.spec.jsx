import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LogoutPage from '../../../../src/components/pages/LogoutPage';
import LogoutPageContainer from '../../../../src/containers/pages/LogoutPageContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([]);

describe('LogoutPageContainer', () => {
  it('should set props on LogoutPage', () => {
    const history = {};
    const store = mockStore({});
    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <LogoutPageContainer
        store={store}
        history={history}
      />, context
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, LogoutPage);

    page.should.not.be.null;
    page.type.should.equal(LogoutPage);
    page.props.should.have.property('logout').that.is.a('function');
    page.props.should.have.property('resetLogin').that.is.a('function');
  });
});
