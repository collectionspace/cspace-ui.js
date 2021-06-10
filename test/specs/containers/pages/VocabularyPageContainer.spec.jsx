import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import VocabularyPage from '../../../../src/components/pages/VocabularyPage';
import VocabularyPageContainer from '../../../../src/containers/pages/VocabularyPageContainer';
import { findWithType } from 'react-shallow-testutils';

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

const csid = '1234';
const data = Immutable.Map();

const store = mockStore({
  record: Immutable.fromJS({
    [csid]: {
      data: {
        current: data,
      },
    },
  }),
  user: Immutable.Map({
    perms,
  }),
});

describe('VocabularyPageContainer', () => {
  it('should set props on VocabularyPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyPageContainer
        store={store}
        match={{
          params: {
            csid,
          },
        }}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, VocabularyPage);

    page.should.not.be.null;
    page.props.should.have.property('data', data);
    page.props.should.have.property('perms', perms);
    page.props.should.have.property('readVocabularyItemRefs').that.is.a('function');
    page.props.should.have.property('setToolTab').that.is.a('function');
  });
});
