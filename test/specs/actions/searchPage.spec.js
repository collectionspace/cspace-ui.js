import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
  setSearchPageAdvanced,
  setSearchPageKeyword,
  initiateSearch,
} from '../../../src/actions/searchPage';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search page action creator', function suite() {
  describe('setSearchPageAdvanced', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_ADVANCED action', function test() {
      const advancedSearchCondition = Immutable.Map({
        op: 'eq',
        path: 'collectionspace_core/updatedAt',
        value: 'something',
      });

      setSearchPageAdvanced(advancedSearchCondition).should.deep.equal({
        type: SET_SEARCH_PAGE_ADVANCED,
        payload: advancedSearchCondition,
      });
    });
  });

  describe('setSearchPageKeyword', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_KEYWORD action', function test() {
      const value = 'search keywords';

      setSearchPageKeyword(value).should.deep.equal({
        type: SET_SEARCH_PAGE_KEYWORD,
        payload: value,
      });
    });
  });

  describe('initiateSearch', function actionSuite() {
    it('should push a search result location onto history for authority records', function test() {
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

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(push));

      pushedLocation.pathname.should.equal('/list/person/ulan');
      pushedLocation.query.should.deep.equal({ kw: 'hello' });
    });

    it('should push a search result location onto history for procedure records', function test() {
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
          searchPage: {
            recordType: 'loanin',
          },
        }),
      });

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(push));

      pushedLocation.pathname.should.equal('/list/loanin');

      pushedLocation.query.should.deep.equal({
        as: JSON.stringify(advancedSearchCondition.toJS()),
      });
    });
  });
});
