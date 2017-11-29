import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import PasswordResetRequestForm from '../../../../src/components/user/PasswordResetRequestForm';
import { ConnectedPasswordResetRequestForm } from '../../../../src/containers/user/PasswordResetRequestFormContainer';

import {
  setSession,
} from '../../../../src/actions/cspace';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('PasswordResetRequestFormContainer', function suite() {
  it('should set props on PasswordResetRequestForm', function test() {
    const store = mockStore();

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedPasswordResetRequestForm />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(PasswordResetRequestForm);

    result.props.should.have.property('requestReset').that.is.a('function');
  });

  it('should connect requestReset to requestReset action creator', function test() {
    let createdPath = null;

    const mockSession = {
      config: () => ({}),
      create: (pathArg) => {
        createdPath = pathArg;
      },
    };

    setSession(mockSession);

    const config = {
      tenantId: '1',
    };

    const store = mockStore();

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPasswordResetRequestForm config={config} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.requestReset('admin@core.collectionspace.org');

    createdPath.should.equal('accounts/requestpasswordreset');
  });
});
