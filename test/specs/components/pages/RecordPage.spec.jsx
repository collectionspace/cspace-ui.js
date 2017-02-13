import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordButtonBarContainer from '../../../../src/containers/record/RecordButtonBarContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../../../src/containers/record/RecordTitleBarContainer';
import RecordPage from '../../../../src/components/pages/RecordPage';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);
const expectedClassName = 'cspace-ui-RecordPage--common';
const csid = '1234';
const objectRecordType = 'object';
const authorityRecordType = 'personauthorities';
const vocabulary = 'local';

const config = {
  listTypes: {
    authRef: {},
  },
  recordTypes: {
    [objectRecordType]: {
      serviceConfig: {
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
        },
      },
      title: () => '',
    },
    [authorityRecordType]: {
      serviceConfig: {
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
        local: {},
      },
    },
  },
};

const store = mockStore({
  record: Immutable.fromJS({
    [csid]: {
      data: {},
    },
  }),
  search: Immutable.Map(),
  prefs: Immutable.Map(),
});

describe('RecordPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const params = {
      recordType: objectRecordType,
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    const params = {
      recordType: objectRecordType,
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  context('for an object/procedure record', function contextSuite() {
    const location = {
      action: '',
      pathname: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: objectRecordType,
      path1: csid,
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
              <RecordPage params={params} readRecord={readRecord} />
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

      const badRecordTypeParams = {
        recordType: 'foo',
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={badRecordTypeParams} readRecord={readRecord} />
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
              <RecordPage params={params} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const newCsid = '6789';

      const newParams = {
        recordType: objectRecordType,
        path1: newCsid,
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={newParams} readRecord={readRecord} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
      expect(readVocabularyConfig).to.equal(undefined);
      readCsid.should.equal(newCsid);
    });

    it('should call createNewRecord when mounted if no csid is provided', function test() {
      let createRecordTypeConfig = null;

      const createNewRecord = (recordTypeConfigArg) => {
        createRecordTypeConfig = recordTypeConfigArg;
      };

      const noCsidParams = {
        recordType: objectRecordType,
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                params={noCsidParams}
                createNewRecord={createNewRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      createRecordTypeConfig.should.equal(config.recordTypes[objectRecordType]);
    });

    it('should render a RecordTitleBarContainer with correct csid and recordType', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={params} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordTitleBarContainer);

      component.props.should.include({
        csid,
        recordType: objectRecordType,
      });
    });

    it('should render a RecordButtonBarContainer with correct csid and recordTypeConfig', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={params} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordButtonBarContainer);

      component.props.should.include({
        csid,
        recordTypeConfig: config.recordTypes[objectRecordType],
      });
    });

    it('should render a RecordEditorContainer with correct csid and recordType', function test() {
      const resultTree = render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={params} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordEditorContainer);

      component.props.should.include({
        csid,
        recordType: objectRecordType,
      });
    });

    it('should use empty csid if csid is null', function test() {
      const noCsidParams = {
        recordType: objectRecordType,
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
              <RecordPage params={noCsidParams} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      const component = findRenderedComponentWithType(resultTree, RecordEditorContainer);

      component.props.should.include({
        csid: '',
      });
    });
  });

  context('for an authority record', function contextSuite() {
    const location = {
      action: '',
      pathname: '',
      search: '',
      query: {},
    };

    const params = {
      recordType: authorityRecordType,
      path1: vocabulary,
      path2: csid,
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
              <RecordPage params={params} readRecord={readRecord} />
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

      const badVocabularyParams = {
        recordType: authorityRecordType,
        path1: 'foo',
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage params={badVocabularyParams} readRecord={readRecord} />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      readRecordCalled.should.equal(false);
    });

    it('should call createNewRecord when mounted if no csid is provided', function test() {
      let createRecordTypeConfig = null;

      const createNewRecord = (recordTypeConfigArg) => {
        createRecordTypeConfig = recordTypeConfigArg;
      };

      const noCsidParams = {
        recordType: authorityRecordType,
        path1: vocabulary,
      };

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RecordPage
                location={location}
                params={noCsidParams}
                createNewRecord={createNewRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      createRecordTypeConfig.should.equal(config.recordTypes[authorityRecordType]);
    });
  });
});
