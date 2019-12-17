import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import PermissionsInput from '../../../../src/components/admin/PermissionsInput';
import ConnectedPermissionsInput from '../../../../src/containers/admin/PermissionsInputContainer';

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
      <ConnectedPermissionsInput />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(PermissionsInput);
    result.props.should.have.property('resourceNames').that.is.instanceOf(Immutable.List);
    result.props.should.have.property('readPerms').that.is.a('function');
  });
});
