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

describe('PasswordResetRequestFormContainer', () => {
  it('should set props on PasswordResetRequestForm', () => {
    const store = mockStore();

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedPasswordResetRequestForm store={store} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(PasswordResetRequestForm);

    result.props.should.have.property('requestReset').that.is.a('function');
  });

  it('should connect requestReset to requestReset action creator', () => {
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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPasswordResetRequestForm store={store} config={config} />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.requestReset('admin@core.collectionspace.org');

    createdPath.should.equal('accounts/requestpasswordreset');
  });
});
