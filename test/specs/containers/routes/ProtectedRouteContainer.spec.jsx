import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ProtectedRoute from '../../../../src/components/routes/ProtectedRoute';
import ProtectedRouteContainer from '../../../../src/containers/routes/ProtectedRouteContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore();

const username = 'admin@core.collectionspace.org';
const screenName = 'Administrator';

const openModalName = 'loginModal';

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  notification: Immutable.Map({
    modal: openModalName,
  }),
  user: Immutable.fromJS({
    username: 'admin@core.collectionspace.org',
    account: {
      screenName,
    },
    perms,
  }),
});

describe('ProtectedRouteContainer', () => {
  it('should set props on ProtectedRoute', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ProtectedRouteContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const route = findWithType(result, ProtectedRoute);

    route.should.not.be.null;
    route.props.should.have.property('openModalName', openModalName);
    route.props.should.have.property('perms', perms);
    route.props.should.have.property('username', username);
    route.props.should.have.property('screenName', screenName);
  });
});
