import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import LoginPage from '../../../../src/components/pages/LoginPage';
import LoginPageContainer from '../../../../src/containers/pages/LoginPageContainer';

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
        history={history}
        location={location}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(LoginPage);
    result.props.should.have.property('closeModal').that.is.a('function');
    result.props.should.have.property('resetLogin').that.is.a('function');
  });
});
