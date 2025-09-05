import React from 'react';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import { ERR_API } from '../../../../src/constants/errorCodes';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchResultSummary from '../../../../src/components/search/SearchResultSummary';
import { searchKey } from '../../../../src/reducers/search';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map({
    searchResultPagePageSizes: [
      { value: '10' },
      { value: '20' },
      { value: '40' },
    ],
  }),
  search: Immutable.Map({}),
});

const searchDescriptor = Immutable.fromJS({
  recordType: 'object',
  searchQuery: {
    size: 10,
  },
});

describe('SearchResultSummary', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <SearchResultSummary searchDescriptor={searchDescriptor} />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a not allowed message if a 401 search error is supplied', function test() {
    const searchName = 'search-summary-test';
    const searchError = Immutable.fromJS({
      code: ERR_API,
      error: {
        response: {
          status: 401,
        },
      },
    });

    const storeWithError = mockStore({
      search: Immutable.fromJS({
        [searchName]: {
          byKey: {
            [searchKey(searchDescriptor)]: {
              error: searchError,
            },
          },
        },
      }),
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={storeWithError}>
          <Router>
            <SearchResultSummary
              searchName={searchName}
              searchDescriptor={searchDescriptor}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-SearchResultSummary--error > span').textContent.should
      .contain('not allowed to perform this search');
  });
});
