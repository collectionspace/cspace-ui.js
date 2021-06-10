import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import PermissionsInput from '../../../../src/components/admin/PermissionsInput';
import ConnectedPermissionsInput from '../../../../src/containers/admin/PermissionsInputContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore();

describe('PermissionsInputContainer', () => {
  const store = mockStore({
    authz: Immutable.fromJS({
      resourceNames: [],
    }),
  });

  const context = {
    store,
  };

  it('should set props on PermissionsInput', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPermissionsInput store={store} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, PermissionsInput);

    input.should.not.be.null;
    input.props.should.have.property('resourceNames').that.is.instanceOf(Immutable.List);
    input.props.should.have.property('readPerms').that.is.a('function');
  });
});
