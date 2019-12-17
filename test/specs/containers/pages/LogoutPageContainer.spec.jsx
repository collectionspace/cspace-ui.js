import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LogoutPage from '../../../../src/components/pages/LogoutPage';
import LogoutPageContainer from '../../../../src/containers/pages/LogoutPageContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('LogoutPageContainer', () => {
  it('should set props on LogoutPage', () => {
    const history = {};
    const store = mockStore({});
    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LogoutPageContainer history={history} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(LogoutPage);
    result.props.should.have.property('logout').that.is.a('function');
    result.props.should.have.property('resetLogin').that.is.a('function');
  });
});
