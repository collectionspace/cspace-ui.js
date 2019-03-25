/* global window */

import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { MemoryRouter as Router } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import ReportingPage from '../../../../src/components/pages/ReportingPage';
import SearchResultTableContainer from '../../../../src/containers/search/SearchResultTableContainer';
import { OP_CONTAIN, OP_AND, OP_EQ } from '../../../../src/constants/searchOperators';
OP_CONTAIN;

SearchResultTableContainer
const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    report: {
      forms: {
        default: <div />
      },
      fields: {},
      messages: {
        record: {
          collectionName: {
            id: 'record.report.collectionName',
            defaultMessage: 'Reports',
          },
        },
      },
    },
  },
};

const store = mockStore({
  notification: Immutable.Map(),
  prefs: Immutable.Map(),
  record: Immutable.fromJS({
    1234: {},
  }),
  search: Immutable.Map(),
  user: Immutable.Map(),
});

const perms = Immutable.fromJS({
  vocabulary: {
    data: 'RUL',
  },
});

const context = {
  config,
  store,
};


describe('ReportingPage', function  suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ReportingPage location={location} match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

  this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a record editor when a csid param exists in the match', function test() {
    const location = {
      search: '',
    };

    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage location={location} match={match} />, context);
    
    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location when an item is clicked in the search panel', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        history={history}
        location={location}
        match={match}
        perms={perms}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/reporting/report/${itemCsid}`);
  });

  it('should not render any reports if the user has no permission to run reports', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        history={history}
        location={location}
        match={match}
        perms={null}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);
    // FIX ME: somehow check whether this exists? 
  });

  it('should update the search descriptor\'s sequence ID when a record is saved in the record editor', function test() {
    const location = {
      search: '',
    };

    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage location={location} match={match} />, context);

    let result;

    result = shallowRenderer.getRenderOutput();

    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.props.onRecordSaved();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();

        const searchPanel = findWithType(result, SearchPanelContainer);
        const seqId = searchPanel.props.searchDescriptor.get('seqId');

        Date.parse(seqId).should.be.closeTo(Date.now(), 500);

        resolve();
      }, 0);
    });
  });

  it('should only initially filter by whether the report allows parameters', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        location={location}
        match={match}
        perms={null}
      />, context);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        as: {
            value: 1,
            op: OP_EQ,
            path: 'reports_common/supportsParams',
        },
        size: 20,
      },
    }));
  });

  it('should update the search descriptor when the search bar value is changed', function test()  {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        location={location}
        match={match}
        perms={perms}
      />, context);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    // Check that initially the only filter is on supportsParams
    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        as: {
            value: 1,
            op: OP_EQ,
            path: 'reports_common/supportsParams',
        },
        size: 20,
      },
    }));

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        console.log("=========>v");
        searchPanel.should.not.equal(null);

        console.log(searchPanel.props.searchDescriptor);

        // const filterMap = Immutable.fromJS(searchPanel.props.searchDescriptor.getIn(['searchQuery', 'as', 'value'] ));

        // const filterMapIter = filterMap.values();

        // console.log(filterMap[0]);
        // console.log(filterMap[1]);

        // console.log(Array(filterMapIter.next())[0][0]);
        // console.log(filterMapIter.next().get('value').get('value'));
        // console.log(filterMapIter.next());


        // LOG: [Map{size: 3, _root: ArrayMapNode{ownerID: ..., entries: ...}, __ownerID: undefined, __hash: undefined, __altered: false}, Map{size: 3, _root: ArrayMapNode{ownerID: ..., entries: ...}, __ownerID: undefined, __hash: undefined, __altered: false}]

        // console.log(filterMap);

        const newDescriptor = Immutable.fromJS({
          recordType: 'report',
          searchQuery: {
            as: {
              value: [
                {
                  value: 'searchval',
                  op: 'cont',
                  path: 'ns2:reports_common/name',
                },
                {
                  value: 1,
                  op: 'eq',
                  path: 'reports_common/supportsParams',
                },
              ],
              OP: OP_AND,
            },
            size: 20,
            p: 0,
          },
        });

        newDescriptor.should.equal(searchPanel.props.searchDescriptor)
        resolve();
      }, 600);
    });
  });

});
