import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LoginPage from '../../../../src/components/pages/LoginPage';
import LoginPageContainer from '../../../../src/containers/pages/LoginPageContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore();
const store = mockStore();

describe('LoginPageContainer', () => {
  it('should set props on LoginPage', () => {
    const context = { store };
    const history = {};
    const location = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <LoginPageContainer
        store={store}
        history={history}
        location={location}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, LoginPage);

    page.should.not.be.null;
    page.type.should.equal(LoginPage);
    page.props.should.have.property('closeModal').that.is.a('function');
    page.props.should.have.property('resetLogin').that.is.a('function');
  });
});
