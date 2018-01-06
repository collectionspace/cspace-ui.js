import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ProtectedRoute from '../../../../src/components/routes/ProtectedRoute';
import ProtectedRouteContainer from '../../../../src/containers/routes/ProtectedRouteContainer';

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

describe('ProtectedRouteContainer', function suite() {
  it('should set props on ProtectedRoute', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ProtectedRouteContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ProtectedRoute);
    result.props.should.have.property('openModalName', openModalName);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('username', username);
    result.props.should.have.property('screenName', screenName);
  });
});
