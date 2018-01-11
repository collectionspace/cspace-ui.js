import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import UsersPage from '../../../../src/components/pages/UsersPage';
import UsersPageContainer from '../../../../src/containers/pages/UsersPageContainer';

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

describe('UsersPageContainer', function suite() {
  it('should set props on UsersPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<UsersPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(UsersPage);
    result.props.should.have.property('perms', perms);
  });
});
