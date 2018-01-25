import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchForm from '../../../../src/components/search/SearchForm';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map(),
});

const config = {
  recordTypes: {
    account: {
      serviceConfig: {
        serviceType: 'security',
      },
    },
    collectionobject: {
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        serviceType: 'object',
      },
    },
    group: {
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
      },
    },
    person: {
      messages: {
        record: {
          collectionName: {
            id: 'record.person.collectionName',
            defaultMessage: 'Persons',
          },
        },
      },
      serviceConfig: {
        serviceType: 'authority',
      },
      vocabularies: {
        local: {
          messages: {
            name: {
              id: 'vocab.person.local.name',
              defaultMessage: 'Local',
            },
          },
        },
        ulan: {
          messages: {
            name: {
              id: 'vocab.person.ulan.name',
              defaultMessage: 'ULAN',
            },
          },
        },
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
  person: {
    data: 'CRUDL',
  },
});

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: () => null,
  formatHTMLMessage: () => null,
  now: () => null,
};

describe('SearchForm', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a form', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="person"
            vocabularyValue="local"
            perms={perms}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });

  it('should not render a vocabulary input for non-authority record types', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="group"
            perms={perms}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.querySelector('.cspace-ui-SearchFormVocab--common')).to.equal(null);
  });

  it('should call onKeywordCommit when a keyword is committed', function test() {
    let committedKeyword = null;

    const handleKeywordCommit = (keywordArg) => {
      committedKeyword = keywordArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="group"
            perms={perms}
            onKeywordCommit={handleKeywordCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('section > div > input');

    input.value = 'some keywords';

    Simulate.change(input);
    Simulate.blur(input);

    committedKeyword.should.equal('some keywords');
  });

  it('should call onRecordTypeCommit when the record type is committed', function test() {
    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="group"
            perms={perms}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchFormRecordType--common input');

    input.value = 'collectionobject';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedRecordType.should.equal('collectionobject');
  });

  it('should call onVocabularyCommit when the vocabulary is committed', function test() {
    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="person"
            vocabularyValue="local"
            perms={perms}
            onVocabularyCommit={handleVocabularyCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchFormVocab--common input');

    input.value = 'ulan';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedVocabulary.should.equal('ulan');
  });

  it('should call onSearch when the form is submitted', function test() {
    let handlerCalled = false;

    const handleSearch = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchForm
            config={config}
            intl={intl}
            recordTypeValue="group"
            perms={perms}
            onSearch={handleSearch}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');

    Simulate.submit(form);

    handlerCalled.should.equal(true);
  });
});
