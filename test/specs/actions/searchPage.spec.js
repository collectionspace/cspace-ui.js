import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import qs from 'qs';

import {
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
} from '../../../src/constants/actionCodes';

import {
  setSearchPageAdvanced,
  setSearchPageKeyword,
  initiateSearch,
} from '../../../src/actions/searchPage';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search page action creator', () => {
  describe('setSearchPageAdvanced', () => {
    it('should create a SET_SEARCH_PAGE_ADVANCED action', () => {
      const store = mockStore({
        prefs: Immutable.fromJS({
          searchPage: {
            recordType: 'loanin',
          },
        }),
      });

      const advancedSearchCondition = Immutable.Map({
        op: 'eq',
        path: 'collectionspace_core/updatedAt',
        value: 'something',
      });

      store.dispatch(setSearchPageAdvanced(advancedSearchCondition));

      const actions = store.getActions();

      actions[0].should.deep.equal({
        type: SET_SEARCH_PAGE_ADVANCED,
        payload: advancedSearchCondition,
        meta: {
          recordType: 'loanin',
        },
      });
    });
  });

  describe('setSearchPageKeyword', () => {
    it('should create a SET_SEARCH_PAGE_KEYWORD action', () => {
      const value = 'search keywords';

      setSearchPageKeyword(value).should.deep.equal({
        type: SET_SEARCH_PAGE_KEYWORD,
        payload: value,
      });
    });
  });

  describe('initiateSearch', () => {
    it('should push a search result location onto history for authority records', () => {
      const store = mockStore({
        searchPage: Immutable.fromJS({
          keyword: 'hello',
        }),
        prefs: Immutable.fromJS({
          searchPage: {
            recordType: 'person',
            vocabulary: {
              person: 'ulan',
            },
          },
        }),
      });

      const config = {};

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(config, push));

      pushedLocation.should.include({
        pathname: '/list/person/ulan',
        search: '?kw=hello',
      });
    });

    it('should push a search result location onto history for procedure records', () => {
      const advancedSearchCondition = Immutable.Map({
        op: 'eq',
        path: 'collectionspace_core/updatedAt',
        value: 'something',
      });

      const store = mockStore({
        searchPage: Immutable.Map({
          advanced: advancedSearchCondition,
        }),
        prefs: Immutable.fromJS({
          useNewSearch: false,
          searchPage: {
            recordType: 'loanin',
          },
        }),
      });

      const config = {};

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(config, push));

      const expectedQueryString = qs.stringify({
        as: JSON.stringify(advancedSearchCondition.toJS()),
      });

      pushedLocation.should.include({
        pathname: '/list/loanin',
        search: `?${expectedQueryString}`,
      });
    });
  });
});
