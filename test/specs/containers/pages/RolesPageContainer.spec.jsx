import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import RolesPage from '../../../../src/components/pages/RolesPage';
import RolesPageContainer from '../../../../src/containers/pages/RolesPageContainer';

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

describe('RolesPageContainer', function suite() {
  it('should set props on RolesPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<RolesPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RolesPage);
    result.props.should.have.property('perms', perms);
  });
});
