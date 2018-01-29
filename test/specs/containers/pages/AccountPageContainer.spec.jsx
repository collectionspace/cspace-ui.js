import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import AccountPage from '../../../../src/components/pages/AccountPage';
import AccountPageContainer from '../../../../src/containers/pages/AccountPageContainer';

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

describe('AccountPageContainer', function suite() {
  it('should set props on AccountPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AccountPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(AccountPage);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
