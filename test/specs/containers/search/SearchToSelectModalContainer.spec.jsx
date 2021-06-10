import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import SearchToSelectModal from '../../../../src/components/search/SearchToSelectModal';
import SearchToSelectModalContainer from '../../../../src/containers/search/SearchToSelectModalContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchToSelectModalContainer', () => {
  it('should set props on SearchToSelectModal', () => {
    const store = mockStore({
      searchToSelect: Immutable.fromJS({
        keyword: 'foo',
        recordType: 'person',
        vocabulary: {
          person: 'local',
        },
      }),
      prefs: Immutable.Map(),
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
      search: Immutable.Map(),
    });

    const shallowRenderer = createRenderer();

    const context = {
      store,
    };

    shallowRenderer.render(
      <SearchToSelectModalContainer store={store} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, SearchToSelectModal);

    modal.should.not.be.null;
    modal.props.should.have.property('keywordValue', 'foo');
    modal.props.should.have.property('recordTypeValue', 'person');
    modal.props.should.have.property('vocabularyValue', 'local');
    modal.props.should.have.property('getAuthorityVocabCsid').that.is.a('function');
    modal.props.should.have.property('onAdvancedSearchConditionCommit').that.is.a('function');
    modal.props.should.have.property('onKeywordCommit').that.is.a('function');
    modal.props.should.have.property('onRecordTypeCommit').that.is.a('function');
    modal.props.should.have.property('onVocabularyCommit').that.is.a('function');
  });

  it('should connect getAuthorityVocabCsid to getAuthorityVocabCsid selector', () => {
    const store = mockStore({
      searchToSelect: Immutable.fromJS({
        keyword: 'foo',
        recordType: 'person',
        vocabulary: {
          person: 'local',
        },
      }),
      prefs: Immutable.Map(),
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
      search: Immutable.Map(),
      authority: Immutable.fromJS({
        concept: {
          material: {
            csid: '1234',
          },
        },
      }),
    });

    const shallowRenderer = createRenderer();

    const context = {
      store,
    };

    shallowRenderer.render(
      <SearchToSelectModalContainer store={store} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, SearchToSelectModal);

    modal.props.getAuthorityVocabCsid('concept', 'material').should.equal('1234');
  });
});
