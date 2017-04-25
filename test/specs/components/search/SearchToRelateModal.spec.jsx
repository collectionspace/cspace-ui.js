/* global document */

import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { findWithType } from 'react-shallow-testutils';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import SearchToRelateModal, { BaseSearchToRelateModal, searchName } from '../../../../src/components/search/SearchToRelateModal';
import RelateButton from '../../../../src/components/record/RelateButton';
import SearchButton from '../../../../src/components/search/SearchButton';
import SearchResultTableContainer from '../../../../src/containers/search/SearchResultTableContainer';
import createTestContainer from '../../../helpers/createTestContainer';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map(),
  prefs: Immutable.Map(),
  search: Immutable.Map(),
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
  },
};

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

describe('SearchToRelateModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render a search form', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const modal = document.querySelector('.ReactModal__Content--after-open');

    modal.querySelector('.cspace-ui-SearchForm--common').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should call search and render a search result table when the search button is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, SearchResultTableContainer).should.not.equal(null);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);

    searchedSearchDescriptor.should.deep.equal({
      recordType: recordTypeValue,
      vocabulary: undefined,
      searchQuery: {
        mkRtSbj: subject.csid,
        p: 0,
        size: 20,
      },
    });
  });

  it('should call createRelations and render a relating message when the relate button is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: recordTypeValue },
      2222: { csid: '2222', recordType: recordTypeValue },
    });

    const search = () => {};

    let createdSubject = null;
    let createdObjects = null;
    let createdPredicate = null;

    const createRelations = (subjectArg, objectsArg, predicateArg) => {
      createdSubject = subjectArg;
      createdObjects = objectsArg;
      createdPredicate = predicateArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        selectedItems={selectedItems}
        search={search}
        createRelations={createRelations}
      />
    );

    let result;
    let buttonBar;

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const relateButton = findWithType(buttonBar, RelateButton);

    relateButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, 'p').should.not.equal(null);

    createdSubject.should.deep.equal(subject);

    createdObjects.should.deep.equal([
      { csid: '1111', recordType: recordTypeValue },
      { csid: '2222', recordType: recordTypeValue },
    ]);

    createdPredicate.should.equal('affects');
  });
});
