import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import LoginForm from '../../../../src/components/login/LoginForm';
import LoginFormContainer from '../../../../src/containers/login/LoginFormContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('LoginFormContainer', function suite() {
  it('should set props on LoginForm', function test() {
    const username = 'user@collectionspace.org';

    const store = mockStore({
      login: {
        username,
        isPending: true,
        response: null,
        error: null,
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LoginFormContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(LoginForm);
    result.props.should.have.property('isPending', true);
    result.props.should.have.property('username', username);
    result.props.should.have.property('response', null);
    result.props.should.have.property('error', null);
    result.props.should.have.property('onSubmit').that.is.a('function');
  });
});
