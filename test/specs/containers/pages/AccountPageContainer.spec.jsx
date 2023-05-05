import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import findWithType from 'react-shallow-testutils/lib/find-with-type';
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

describe('AccountPageContainer', () => {
  it('should set props on AccountPage', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AccountPageContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();
    const accountPage = findWithType(result, AccountPage);

    accountPage.props.should.have.property('perms', perms);
    accountPage.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
