import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType, Simulate } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import { configureCSpace } from '../../../../src/actions/cspace';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordBrowser from '../../../../src/components/record/RecordBrowser';
import RecordTitleBarContainer from '../../../../src/containers/record/RecordTitleBarContainer';
import RecordPage from '../../../../src/components/pages/RecordPage';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);
const expectedClassName = 'cspace-ui-RecordPage--common';
const csid = 'b09295cf-ff56-4018-be16';
const objectRecordType = 'collectionobject';
const authorityRecordType = 'personauthorities';
const vocabulary = 'local';

const config = {
  listTypes: {
    authRef: {},
  },
  recordTypes: {
    [objectRecordType]: {
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
      forms: {
        default: <div />,
      },
      messages: {
        record: {
          name: {
            id: `record.${objectRecordType}.name`,
            defaultMessage: objectRecordType,
          },
          collectionName: {
            id: `record.${objectRecordType}.collectionName`,
            defaultMessage: `${objectRecordType} collection`,
          },
        },
      },
      title: () => '',
    },
    group: {
      serviceConfig: {
        servicePath: 'groups',
        serviceType: 'procedure',
      },
      messages: {
        record: {
          name: {
            id: 'record.group.name',
            defaultMessage: 'Group',
          },
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
    },
    [authorityRecordType]: {
      serviceConfig: {
        servicePath: 'authorities',
        serviceType: 'authority',
      },
      forms: {
        default: <div />,
      },
      messages: {
        record: {
          name: {
            id: `record.${authorityRecordType}.name`,
            defaultMessage: authorityRecordType,
          },
        },
      },
      title: () => '',
      vocabularies: {
        local: {
          serviceConfig: {
            servicePath: 'local',
          },
        },
      },
    },
  },
};

const store = mockStore({
  login: Immutable.Map(),
  record: Immutable.fromJS({
    [csid]: {
      data: {},
    },
  }),
  search: Immutable.Map(),
  prefs: Immutable.fromJS({
    recordBrowserNavBarItems: {
      [objectRecordType]: [
        'group',
      ],
    },
  }),
});

describe('RecordPage', function suite() {
  before(() => {
    store.dispatch(configureCSpace());
    store.clearActions();
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const location = {
      action: '',
      pathname: `/record/${objectRecordType}`,
      search: '',
    };

    const match = {
      params: {
        recordType: objectRecordType,
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage
              location={location}
              match={match}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    const location = {
      action: '',
      pathname: `/record/${objectRecordType}`,
      search: '',
    };

    const match = {
      params: {
        recordType: objectRecordType,
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage
              location={location}
              match={match}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  context('for an object/procedure record', function contextSuite() {
    const location = {
      action: '',
      pathname: `/record/${objectRecordType}/${csid}`,
      search: '',
    };

    const match = {
      params: {
        recordType: objectRecordType,
        path1: csid,
      },
    };

    it('should call readRecord when mounted if a csid is provided', function test() {
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
      expect(readVocabularyConfig).to.equal(undefined);
      readCsid.should.equal(csid);
    });

    it('should not call readRecord if the record type is unknown', function test() {
      let readRecordCalled = false;

      const readRecord = () => {
        readRecordCalled = true;
      };

      const badRecordTypeMatch = {
        params: {
          recordType: 'foo',
        },
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={badRecordTypeMatch}
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordCalled.should.equal(false);
    });

    it('should call readRecord when new params are passed via props', function test() {
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const newCsid = '1d075e7f-82b4-4ca9-9ab6';

      const newLocation = Object.assign({}, location, {
        pathname: `/record/${objectRecordType}/${newCsid}`,
      });

      const newMatch = {
        params: {
          recordType: objectRecordType,
          path1: newCsid,
        },
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={newLocation}
                match={newMatch}
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
      expect(readVocabularyConfig).to.equal(undefined);
      readCsid.should.equal(newCsid);
    });

    it('should render a RecordTitleBarContainer with correct csid and recordType', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordTitleBarContainer);

      component.props.should.include({
        csid,
        recordType: objectRecordType,
      });
    });

    it('should render a RecordBrowser with correct csid and recordType', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordBrowser);

      component.props.should.include({
        csid,
        recordType: objectRecordType,
      });
    });

    it('should use empty csid if csid is null', function test() {
      const noCsidLocation = Object.assign({}, location, {
        path: `/record/${objectRecordType}`,
      });

      const noCsidMatch = {
        params: {
          recordType: objectRecordType,
        },
      };

      const noCsidStore = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.fromJS({
          '': {
            data: {},
          },
        }),
        search: Immutable.Map(),
      });

      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={noCsidStore}>
            <ConfigProvider config={config}>
              <RecordPage
                location={noCsidLocation}
                match={noCsidMatch}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordBrowser);

      component.props.should.include({
        csid: '',
      });
    });

    it('should replace history with a related record URL when a related record tab is clicked', function test() {
      let replacedLocation = null;

      const history = mockHistory({
        replace: (locationArg) => {
          replacedLocation = locationArg;
        },
      });

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
                history={history}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const navItems = this.container.querySelectorAll('.cspace-ui-RecordBrowserNavItem--common');
      const tabButton = navItems[1].querySelector('button');

      Simulate.click(tabButton);

      replacedLocation.should.equal(`/record/${objectRecordType}/${csid}/group`);
    });
  });

  context('for an authority record', function contextSuite() {
    const location = {
      action: '',
      pathname: `/record/${authorityRecordType}/${vocabulary}/${csid}`,
      search: '',
    };

    const match = {
      params: {
        recordType: authorityRecordType,
        path1: vocabulary,
        path2: csid,
      },
    };

    it('should call readRecord when mounted if a csid is provided', function test() {
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={match}
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordTypeConfig.should.equal(config.recordTypes[authorityRecordType]);

      readVocabularyConfig.should
        .equal(config.recordTypes[authorityRecordType].vocabularies[vocabulary]);

      readCsid.should.equal(csid);
    });

    it('should not call readRecord if the vocabulary is unknown', function test() {
      let readRecordCalled = false;

      const readRecord = () => {
        readRecordCalled = true;
      };

      const badVocabularyMatch = {
        params: {
          recordType: authorityRecordType,
          path1: 'foo',
        },
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                match={badVocabularyMatch}
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordCalled.should.equal(false);
    });
  });
});
