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
        match={{
          params: {
            csid,
          },
        }}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(VocabularyPage);
    result.props.should.have.property('data', data);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('readVocabularyItemRefs').that.is.a('function');
    result.props.should.have.property('setToolTab').that.is.a('function');
  });
});
