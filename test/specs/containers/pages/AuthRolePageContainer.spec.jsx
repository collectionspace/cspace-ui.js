import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import AuthRolePage from '../../../../src/components/pages/AuthRolePage';
import AuthRolePageContainer from '../../../../src/containers/pages/AuthRolePageContainer';

chai.should();

const mockStore = configureMockStore();

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  user: Immutable.Map({
    perms,
  }),
});

describe('AuthRolePageContainer', () => {
  it('should set props on AuthRolePage', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AuthRolePageContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, AuthRolePage);

    page.props.should.have.property('perms', perms);
    page.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
