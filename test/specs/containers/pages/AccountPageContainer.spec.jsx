import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import AccountPage from '../../../../src/components/pages/AccountPage';
import AccountPageContainer from '../../../../src/containers/pages/AccountPageContainer';
import findWithType from 'react-shallow-testutils/lib/find-with-type';

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

describe('AccountPageContainer', () => {
  it('should set props on AccountPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AccountPageContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const accountPage = findWithType(result, AccountPage);

    accountPage.should.not.be.null;
    accountPage.props.should.have.property('perms', perms);
    accountPage.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
