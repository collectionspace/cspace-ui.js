/* global window */

import React from 'react';
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
import { render } from '../../../helpers/renderHelpers';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import VocabularyPage from '../../../../src/components/pages/VocabularyPage';
import { OP_CONTAIN } from '../../../../src/constants/searchOperators';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns3:accounts-common-list',
      itemNodeName: 'account-list-item',
    },
  },
  recordTypes: {
    vocabulary: {
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.vocabulary.collectionName',
            defaultMessage: 'Term Lists',
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
    data: 'CRUDL',
  },
});

const context = {
  config,
  store,
};

describe('VocabularyPage', () => {
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
              <VocabularyPage location={location} match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call setToolTab when mounted', function test() {
    let setTabName = null;

    const setToolTab = (tabNameArg) => {
      setTabName = tabNameArg;
    };

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
              <VocabularyPage location={location} match={match} setToolTab={setToolTab} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    setTabName.should.equal('vocabulary');
  });

  it('should render a record editor when a csid param exists in the match', () => {
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
      <VocabularyPage location={location} match={match} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location when an item is clicked in the search panel', () => {
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
      <VocabularyPage
        history={history}
        location={location}
        match={match}
        perms={perms}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/tool/vocabulary/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel but there are not read permissions on vocabularies', () => {
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
      <VocabularyPage
        history={history}
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    expect(replacedLocation).to.equal(null);
  });

  it('should call readVocabularyItemRefs when a record read completes in the record editor', () => {
    const location = {
      search: '',
    };

    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const vocabularyCsid = 'aaaa';
    const vocabularyName = 'vocabname';

    const data = Immutable.fromJS({
      document: {
        'ns2:vocabularies_common': {
          csid: vocabularyCsid,
          shortIdentifier: vocabularyName,
        },
      },
    });

    let calledCsid = null;
    let calledVocabularyName = null;

    const readVocabularyItemRefs = (csidArg, vocabularyNameArg) => {
      calledCsid = csidArg;
      calledVocabularyName = vocabularyNameArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyPage
        location={location}
        match={match}
        data={data}
        readVocabularyItemRefs={readVocabularyItemRefs}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.props.onRecordReadComplete();

    calledCsid.should.equal(vocabularyCsid);
    calledVocabularyName.should.equal(calledVocabularyName);
  });

  it('should update the search descriptor\'s sequence ID when a record is saved in the record editor', () => {
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
      <VocabularyPage location={location} match={match} />, context,
    );

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

  it('should update the search descriptor when the search bar value changes', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyPage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'vocabulary',
          searchQuery: {
            p: 0,
            size: 20,
            sort: 'displayName',
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:vocabularies_common/displayName',
            },
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should only update the search descriptor once when the search bar value changes twice within the filter delay', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyPage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        searchBar.props.onChange('another searchval');

        resolve();
      }, 200);
    })
      .then(() => new Promise((resolve) => {
        window.setTimeout(() => {
          result = shallowRenderer.getRenderOutput();
          searchPanel = findWithType(result, SearchPanelContainer);

          searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
            recordType: 'vocabulary',
            searchQuery: {
              size: 20,
              sort: 'displayName',
            },
          }));

          resolve();
        }, 400);
      }))
      .then(() => new Promise((resolve) => {
        window.setTimeout(() => {
          result = shallowRenderer.getRenderOutput();
          searchPanel = findWithType(result, SearchPanelContainer);

          searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
            recordType: 'vocabulary',
            searchQuery: {
              p: 0,
              size: 20,
              sort: 'displayName',
              as: {
                value: 'another searchval',
                op: OP_CONTAIN,
                path: 'ns2:vocabularies_common/displayName',
              },
            },
          }));

          resolve();
        }, 400);
      }));
  });

  it('should update the search descriptor immediately when the search bar value is blanked', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyPage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'vocabulary',
          searchQuery: {
            p: 0,
            size: 20,
            sort: 'displayName',
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:vocabularies_common/displayName',
            },
          },
        }));

        searchBar.props.onChange('');

        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'vocabulary',
          searchQuery: {
            size: 20,
            p: 0,
            sort: 'displayName',
          },
        }));

        resolve();
      }, 600);
    });
  });
});
