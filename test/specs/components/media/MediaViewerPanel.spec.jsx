import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { FormattedMessage } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import { ConnectedPanel as Panel } from '../../../../src/containers/layout/PanelContainer';
import { searchKey } from '../../../../src/reducers/search';
import MediaViewerPanel from '../../../../src/components/media/MediaViewerPanel';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
};

const searchName = 'testSearch';

const searchDescriptor = Immutable.fromJS({
  recordType: 'media',
  searchQuery: {
    p: 0,
    size: 0,
    rel: '1234',
  },
});

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '2500',
    itemsInPage: '3',
    totalItems: '3',
    'list-item': [
      {
        blobCsid: '03794600-d98f-44a6-8985',
        csid: 'b0945c52-36f7-4c51-a72a',
      },
      {
        blobCsid: '42e46bf9-f09d-49ec-8334',
        csid: '3a60107e-4802-41a2-b319',
      },
      {
        blobCsid: '8fdd5910-c579-4ed4-b52b',
        csid: '5a57909a-2f51-4e42-bb58',
      },
    ],
  },
});

const store = mockStore({
  prefs: Immutable.Map(),
  search: Immutable.fromJS({
    [searchName]: {
      byKey: {
        [searchKey(searchDescriptor)]: {
          result: searchResult,
        },
      },
    },
  }),
  user: Immutable.Map(),
});

describe('MediaViewerPanel', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a Panel', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanel
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Panel);
  });

  it('should include the number of related media records in the header', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanel
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const headerMessage = findWithType(result.props.header, FormattedMessage);

    headerMessage.props.values.totalItems.should.equal(3);
  });

  it('should add one to the count if ownBlobCsid is provided', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanel
        config={config}
        ownBlobCsid="84471689-9a99-4687-9c66"
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const headerMessage = findWithType(result.props.header, FormattedMessage);

    headerMessage.props.values.totalItems.should.equal(4);
  });

  it('should not add one to the count if ownBlobCsid is not a guid csid', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanel
        config={config}
        ownBlobCsid="/blob"
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const headerMessage = findWithType(result.props.header, FormattedMessage);

    headerMessage.props.values.totalItems.should.equal(3);
  });

  it('should call search when mounted', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedColumnSetName = null;

    const search = (
      configArg, searchNameArg, searchDescriptorArg, columnSetNameArg,
    ) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedColumnSetName = columnSetNameArg;
    };

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={searchDescriptor}
          search={search}
        />
      </StoreProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
    searchedColumnSetName.should.equal('default');
  });

  it('should call search when a new search descriptor is supplied', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedColumnSetName = null;

    const search = (
      configArg, searchNameArg, searchDescriptorArg, columnSetNameArg,
    ) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedColumnSetName = columnSetNameArg;
    };

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={searchDescriptor}
        />
      </StoreProvider>, this.container,
    );

    const newSearchDescriptor = Immutable.fromJS({
      recordType: 'media',
      searchQuery: {
        p: 0,
        size: 0,
        rel: '5678',
      },
    });

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={newSearchDescriptor}
          search={search}
        />
      </StoreProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(newSearchDescriptor);
    searchedColumnSetName.should.equal('default');
  });
});
