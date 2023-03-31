import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { findRenderedComponentWithType, Simulate } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import { render } from '../../../helpers/renderHelpers';
import { configureCSpace } from '../../../../src/actions/cspace';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordBrowser from '../../../../src/components/record/RecordBrowser';
import RecordTitleBarContainer from '../../../../src/containers/record/RecordTitleBarContainer';
import RecordPage from '../../../../src/components/pages/RecordPage';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);
const csid = 'b09295cf-ff56-4018-be16';
const objectRecordType = 'collectionobject';
const authorityRecordType = 'person';
const vocabulary = 'local';

const config = {
  listTypes: {
    authRef: {},
  },
  recordTypes: {
    [objectRecordType]: {
      name: objectRecordType,
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
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
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
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
        all: {
          serviceConfig: {
            servicePath: '_ALL_',
          },
        },
        local: {
          messages: {
            name: {
              id: `vocab.${authorityRecordType}.local.name`,
              defaultMessage: 'local',
            },
          },
          serviceConfig: {
            servicePath: 'local',
          },
        },
      },
    },
  },
};

const store = mockStore({
  authority: Immutable.Map(),
  user: Immutable.Map(),
  notification: Immutable.Map(),
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

describe('RecordPage', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

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
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

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
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal('cspace-ui-RecordPage--object');
  });

  it('should render nothing if record type is \'all\'', function test() {
    const location = {
      action: '',
      pathname: '/record/all',
      search: '',
    };

    const match = {
      params: {
        recordType: 'all',
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if vocabulary is \'all\'', function test() {
    const location = {
      action: '',
      pathname: `/record/${authorityRecordType}/all/${csid}`,
      search: '',
    };

    const match = {
      params: {
        recordType: authorityRecordType,
        path1: 'all',
        path2: csid,
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render an error page if an error is supplied', function test() {
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

    const error = Immutable.Map({
      code: 'ERROR_CODE',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
                error={error}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal('cspace-ui-ErrorPage--common');
  });

  it('should replace history with the record type determined from data when the record type is \'all\', and data is supplied', function test() {
    const location = {
      action: '',
      pathname: `/record/all/${csid}`,
      search: '',
      state: {
        foo: '1',
      },
    };

    const match = {
      params: {
        recordType: 'all',
        path1: csid,
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: `/collectionobjects/${csid}`,
          refName: `urn:cspace:core.collectionspace.org:collectionobjects:id(${csid})`,
        },
      },
    });

    let clearedCsid = null;

    const clearRecord = (csidArg) => {
      clearedCsid = csidArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RecordPage
                config={config}
                location={location}
                match={match}
                history={history}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RecordPage
                config={config}
                data={data}
                location={location}
                match={match}
                history={history}
                clearRecord={clearRecord}
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    clearedCsid.should.equal(csid);

    replacedLocation.should.deep.equal({
      pathname: `/record/${objectRecordType}/${csid}`,
      state: location.state,
    });
  });

  context('for an object/procedure record', () => {
    const location = {
      action: '',
      pathname: `/record/${objectRecordType}/${csid}`,
      search: '',
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    const match = {
      params: {
        recordType: objectRecordType,
        path1: csid,
      },
    };

    it('should call readRecord when mounted if a csid is provided', function test() {
      let readConfig = null;
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (configArg, recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readConfig = configArg;
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                  readRecord={readRecord}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      readConfig.should.equal(config);
      readRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
      expect(readVocabularyConfig).to.equal(undefined);
      readCsid.should.equal(csid);
    });

    it('should call setRecordPagePrimaryCsid when mounted', function test() {
      let setPrimaryCsid = null;

      const setRecordPagePrimaryCsid = (csidArg) => {
        setPrimaryCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                  setRecordPagePrimaryCsid={setRecordPagePrimaryCsid}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      setPrimaryCsid.should.equal(csid);
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
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={badRecordTypeMatch}
                  readRecord={readRecord}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      readRecordCalled.should.equal(false);
    });

    it('should call readRecord when new params are passed via props', function test() {
      let readConfig = null;
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (configArg, recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readConfig = configArg;
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      const newCsid = '1d075e7f-82b4-4ca9-9ab6';

      const newLocation = { ...location, pathname: `/record/${objectRecordType}/${newCsid}` };

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
              <Router>
                <RecordPage
                  config={config}
                  location={newLocation}
                  match={newMatch}
                  readRecord={readRecord}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      readConfig.should.equal(config);
      readRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
      expect(readVocabularyConfig).to.equal(undefined);
      readCsid.should.equal(newCsid);
    });

    it('should call readRecord when new params are passed via props', function test() {
      let setPrimaryCsid = null;

      const setRecordPagePrimaryCsid = (csidArg) => {
        setPrimaryCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      const newCsid = '1d075e7f-82b4-4ca9-9ab6';

      const newLocation = { ...location, pathname: `/record/${objectRecordType}/${newCsid}` };

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
              <Router>
                <RecordPage
                  config={config}
                  location={newLocation}
                  match={newMatch}
                  setRecordPagePrimaryCsid={setRecordPagePrimaryCsid}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      setPrimaryCsid.should.equal(newCsid);
    });

    it('should call setRecordPagePrimaryCsid with undefined csid when unmounted', function test() {
      let setPrimaryCsid = null;

      const setRecordPagePrimaryCsid = (csidArg) => {
        setPrimaryCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                  setRecordPagePrimaryCsid={setRecordPagePrimaryCsid}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      unmountComponentAtNode(this.container);

      expect(setPrimaryCsid).to.equal(undefined);
    });

    it('should render a RecordTitleBarContainer with correct csid and recordType', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

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
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      const component = findRenderedComponentWithType(resultTree, RecordBrowser);

      component.props.should.include({
        csid,
        recordType: objectRecordType,
      });
    });

    it('should use empty csid if csid is null', function test() {
      const noCsidLocation = { ...location, path: `/record/${objectRecordType}` };

      const noCsidMatch = {
        params: {
          recordType: objectRecordType,
        },
      };

      const noCsidStore = mockStore({
        authority: Immutable.Map(),
        notification: Immutable.Map(),
        prefs: Immutable.Map(),
        record: Immutable.fromJS({
          '': {
            data: {},
          },
        }),
        search: Immutable.Map(),
        user: Immutable.Map(),
      });

      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={noCsidStore}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={noCsidLocation}
                  match={noCsidMatch}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

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
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                  history={history}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      const navItems = this.container.querySelectorAll('.cspace-ui-RecordBrowserNavItem--common');
      const tabButton = navItems[1].querySelector('button');

      Simulate.click(tabButton);

      replacedLocation.should.deep.equal({
        pathname: `/record/${objectRecordType}/${csid}/group`,
        state: location.state,
      });
    });
  });

  context('for an authority record', () => {
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
      let readConfig = null;
      let readRecordTypeConfig = null;
      let readVocabularyConfig = null;
      let readCsid = null;

      const readRecord = (configArg, recordTypeConfigArg, vocabularyConfigArg, csidArg) => {
        readConfig = configArg;
        readRecordTypeConfig = recordTypeConfigArg;
        readVocabularyConfig = vocabularyConfigArg;
        readCsid = csidArg;
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={match}
                  readRecord={readRecord}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      readConfig.should.equal(config);
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
              <Router>
                <RecordPage
                  config={config}
                  location={location}
                  match={badVocabularyMatch}
                  readRecord={readRecord}
                />
              </Router>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );

      readRecordCalled.should.equal(false);
    });
  });
});
