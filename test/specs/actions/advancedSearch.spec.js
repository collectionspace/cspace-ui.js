import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_ADVANCED_SEARCH_KEYWORD,
  setAdvancedSearchKeyword,
  initiateSearch,
} from '../../../src/actions/advancedSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('advanced search action creator', function suite() {
  describe('setAdvancedSearchKeyword', function actionSuite() {
    it('should create a SET_ADVANCED_SEARCH_KEYWORD action', function test() {
      const value = 'search keywords';

      setAdvancedSearchKeyword(value).should.deep.equal({
        type: SET_ADVANCED_SEARCH_KEYWORD,
        payload: value,
      });
    });
  });

  describe('initiateSearch', function actionSuite() {
    it('should push a search result location onto history for authority records', function test() {
      const store = mockStore({
        advancedSearch: Immutable.fromJS({
          keyword: 'hello',
        }),
        prefs: Immutable.fromJS({
          advancedSearch: {
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
      const store = mockStore({
        advancedSearch: Immutable.Map(),
        prefs: Immutable.fromJS({
          advancedSearch: {
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
    });
  });
});
