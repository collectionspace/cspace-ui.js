import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
import AdminPage from '../../../../src/components/pages/AdminPage';
import AdminPageContainer from '../../../../src/containers/pages/AdminPageContainer';

chai.should();

const mockStore = configureMockStore();

const adminTab = 'tabName';

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  prefs: Immutable.Map({
    adminTab,
  }),
  user: Immutable.Map({
    perms,
  }),
});

describe('AdminPageContainer', () => {
  it('should set props on AdminPage', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<AdminPageContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();
    const admin = findWithType(result, AdminPage);

    admin.type.should.equal(AdminPage);
    admin.props.should.have.property('perms', perms);
    admin.props.should.have.property('preferredTab', adminTab);
  });
});
