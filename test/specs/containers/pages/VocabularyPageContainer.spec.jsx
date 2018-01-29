import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import VocabularyPage from '../../../../src/components/pages/VocabularyPage';
import VocabularyPageContainer from '../../../../src/containers/pages/VocabularyPageContainer';

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

describe('VocabularyPageContainer', function suite() {
  it('should set props on VocabularyPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<VocabularyPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(VocabularyPage);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('setAdminTab').that.is.a('function');
  });
});
