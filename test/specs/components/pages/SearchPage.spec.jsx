import React from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import mockRouter from '../../../helpers/mockRouter';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchPage from '../../../../src/components/pages/SearchPage';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.fromJS({
    panels: {},
  }),
});

const config = {
  recordTypes: {
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

describe('SearchPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const params = {
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render an error page if the record type is unknown', function test() {
    const params = {
      recordType: 'foo',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-ErrorPage--common').should.not.equal(null);
  });

  it('should replace history with the recordTypeValue prop if no record type is supplied in params', function test() {
    let replacementLocation = null;

    const stubbedRouter = mockRouter({
      replace: (locationArg) => {
        replacementLocation = locationArg;
      },
    });

    const location = {
      pathname: '/search',
      action: '',
      search: '',
      query: {},
    };

    const params = {};

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              recordTypeValue="group"
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    replacementLocation.should.deep.equal({
      pathname: '/search/group',
    });
  });

  it('should replace history with the recordTypeValue prop if no record type is supplied in updated params', function test() {
    let replacementLocation = null;

    const stubbedRouter = mockRouter({
      replace: (locationArg) => {
        replacementLocation = locationArg;
      },
    });

    const location = {
      pathname: '/search/collectionobject',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              recordTypeValue="group"
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const newParams = {};

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={newParams}
              recordTypeValue="group"
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    replacementLocation.should.deep.equal({
      pathname: '/search/group',
    });
  });

  it('should replace history with the vocabularyValue prop if no vocabulary is supplied in params', function test() {
    let replacementLocation = null;

    const stubbedRouter = mockRouter({
      replace: (locationArg) => {
        replacementLocation = locationArg;
      },
    });

    const location = {
      pathname: '/search',
      action: '',
      search: '',
      query: {},
    };

    const params = {};

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              recordTypeValue="person"
              vocabularyValue="ulan"
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    replacementLocation.should.deep.equal({
      pathname: '/search/person/ulan',
    });
  });

  it('should replace history when the record type is committed', function test() {
    let replacementLocation = null;

    const stubbedRouter = mockRouter({
      replace: (locationArg) => {
        replacementLocation = locationArg;
      },
    });

    const location = {
      pathname: '/search/collectionobject',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-input-DropdownMenuInput--common > input');

    input.value = 'Group';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    replacementLocation.should.deep.equal({
      pathname: '/search/group',
    });
  });

  it('should call onRecordTypeCommit when the record type is committed', function test() {
    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    const stubbedRouter = mockRouter();

    const location = {
      pathname: '/search/collectionobject',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              router={stubbedRouter}
              onRecordTypeCommit={handleRecordTypeCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-input-DropdownMenuInput--common > input');

    input.value = 'Group';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedRecordType.should.equal('group');
  });

  it('should call onRecordTypeCommit when a new record type is selected via params', function test() {
    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    const location = {
      pathname: '/search',
      action: '',
      search: '',
      query: {},
    };

    const params = {};

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              onRecordTypeCommit={handleRecordTypeCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const newLocation = Object.assign({}, location, { pathname: '/search/group' });

    const newParams = {
      recordType: 'group',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={newLocation}
              params={newParams}
              onRecordTypeCommit={handleRecordTypeCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    committedRecordType.should.equal('group');
  });

  it('should replace history when the vocabulary is committed', function test() {
    let replacementLocation = null;

    const stubbedRouter = mockRouter({
      replace: (locationArg) => {
        replacementLocation = locationArg;
      },
    });

    const location = {
      pathname: '/search/person/local',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'person',
      vocabulary: 'local',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              router={stubbedRouter}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchFormVocab--common input');

    input.value = 'ULAN';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    replacementLocation.should.deep.equal({
      pathname: '/search/person/ulan',
    });
  });

  it('should call onVocabularyCommit when the vocabulary is committed', function test() {
    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    const stubbedRouter = mockRouter();

    const location = {
      pathname: '/search/person/local',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'person',
      vocabulary: 'local',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              router={stubbedRouter}
              onVocabularyCommit={handleVocabularyCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-ui-SearchFormVocab--common input');

    input.value = 'ULAN';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedVocabulary.should.equal('ulan');
  });

  it('should call onVocabularyCommit when a new vocabulary is selected via params', function test() {
    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    const location = {
      pathname: '/search/person',
      action: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: 'person',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={location}
              params={params}
              onVocabularyCommit={handleVocabularyCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const newLocation = Object.assign({}, location, { pathname: '/search/person/ulan' });

    const newParams = {
      recordType: 'person',
      vocabulary: 'ulan',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPage
              location={newLocation}
              params={newParams}
              onVocabularyCommit={handleVocabularyCommit}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    committedVocabulary.should.equal('ulan');
  });
});
