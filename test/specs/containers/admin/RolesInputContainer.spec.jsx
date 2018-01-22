import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import RolesInput from '../../../../src/components/admin/RolesInput';
import ConnectedRolesInput from '../../../../src/containers/admin/RolesInputContainer';

chai.should();

const mockStore = configureMockStore();

describe('RolesInputContainer', function suite() {
  const store = mockStore({
    authz: Immutable.fromJS({
      roles: [],
    }),
  });

  const context = {
    store,
  };

  it('should set props on RolesInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedRolesInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RolesInput);
    result.props.should.have.property('roles').that.is.instanceOf(Immutable.List);
    result.props.should.have.property('readRoles').that.is.a('function');
  });
});
