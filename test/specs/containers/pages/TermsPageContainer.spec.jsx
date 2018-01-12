import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import TermsPage from '../../../../src/components/pages/TermsPage';
import TermsPageContainer from '../../../../src/containers/pages/TermsPageContainer';

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

describe('TermssPageContainer', function suite() {
  it('should set props on TermsPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<TermsPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TermsPage);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
