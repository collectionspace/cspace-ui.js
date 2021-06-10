import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import LoginForm from '../../../../src/components/login/LoginForm';
import LoginFormContainer from '../../../../src/containers/login/LoginFormContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([]);

describe('LoginFormContainer', () => {
  it('should set props on LoginForm', () => {
    const username = 'user@collectionspace.org';

    const store = mockStore({
      login: Immutable.Map({
        username,
        isPending: true,
        error: null,
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LoginFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, LoginForm);

    form.should.not.be.null;
    form.type.should.equal(LoginForm);
    form.props.should.have.property('isPending', true);
    form.props.should.have.property('username', username);
    form.props.should.have.property('error', null);
    form.props.should.have.property('login').that.is.a('function');
  });
});
