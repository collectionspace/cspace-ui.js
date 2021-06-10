import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import RolesInput from '../../../../src/components/admin/RolesInput';
import ConnectedRolesInput from '../../../../src/containers/admin/RolesInputContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore();

describe('RolesInputContainer', () => {
  const store = mockStore({
    authz: Immutable.fromJS({
      roles: [],
    }),
  });

  const context = {
    store,
  };

  it('should set props on RolesInput', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedRolesInput store={store} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const rolesInput = findWithType(result, RolesInput);

    rolesInput.should.not.be.null;
    rolesInput.props.should.have.property('roles').that.is.instanceOf(Immutable.List);
    rolesInput.props.should.have.property('readRoles').that.is.a('function');
  });
});
