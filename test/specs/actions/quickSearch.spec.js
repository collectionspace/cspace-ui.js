import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_QUICK_SEARCH_KEYWORD,
  setQuickSearchKeyword,
  initiateSearch,
} from '../../../src/actions/quickSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('quick search action creator', function suite() {
  describe('setQuickSearchKeyword', function actionSuite() {
    it('should create a SET_QUICK_SEARCH_KEYWORD action', function test() {
      const value = 'search keywords';

      setQuickSearchKeyword(value).should.deep.equal({
        type: SET_QUICK_SEARCH_KEYWORD,
        payload: value,
      });
    });
  });

  describe('initiateSearch', function actionSuite() {
    it('should push a search result location onto history for authority records', function test() {
      const store = mockStore({
        quickSearch: Immutable.fromJS({
          keyword: 'hello',
        }),
        prefs: Immutable.fromJS({
          quickSearch: {
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
        quickSearch: Immutable.fromJS({
          keyword: 'hello',
        }),
        prefs: Immutable.fromJS({
          quickSearch: {
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
      pushedLocation.query.should.deep.equal({ kw: 'hello' });
    });

    it('should push a record location onto history when a csid is entered as a keyword', function test() {
      const csid = '53ae2430-379a-4656-9ff5';

      const store = mockStore({
        quickSearch: Immutable.fromJS({
          keyword: csid,
        }),
        prefs: Immutable.fromJS({
          quickSearch: {
            recordType: 'loanin',
          },
        }),
      });

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(push));

      pushedLocation.pathname.should.equal(`/record/loanin/${csid}`);
    });
  });
});
