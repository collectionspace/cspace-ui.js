import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_QUICK_SEARCH_KEYWORD,
} from '../../../src/constants/actionCodes';

import {
  setQuickSearchKeyword,
  initiateSearch,
} from '../../../src/actions/quickSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('quick search action creator', () => {
  describe('setQuickSearchKeyword', () => {
    it('should create a SET_QUICK_SEARCH_KEYWORD action', () => {
      const value = 'search keywords';

      setQuickSearchKeyword(value).should.deep.equal({
        type: SET_QUICK_SEARCH_KEYWORD,
        payload: value,
      });
    });
  });

  describe('initiateSearch', () => {
    it('should push a search result location onto history for authority records', () => {
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

      pushedLocation.should.include({
        pathname: '/list/person/ulan',
        search: '?kw=hello',
      });
    });

    it('should push a search result location onto history for procedure records', () => {
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

      pushedLocation.should.include({
        pathname: '/list/loanin',
        search: '?kw=hello',
      });
    });

    it('should push a record location onto history when a csid is entered as a keyword', () => {
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
