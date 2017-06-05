import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import reducer, {
  getUserUsername,
  getLoginContinuation,
  getLoginUsername,
  isLoginPending,
  getLoginResponse,
  getLoginError,
  isLogoutPending,
  getLogoutResponse,
  getRecordRelationUpdatedTimestamp,
  getRecordData,
  getNewRecordData,
  isRecordModified,
  isRecordReadPending,
  isRecordSavePending,
  getPrefs,
  isPanelCollapsed,
  getRecordBrowserNavBarItems,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getSearchPanelPageSize,
  getSearchResultPagePageSize,
  getOptionList,
  getVocabulary,
  getPartialTermSearchMatches,
  getIDGenerator,
  getQuickSearchKeyword,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
  getSearchPageAdvanced,
  getSearchPageKeyword,
  isSearchPending,
  getMostRecentSearchDescriptor,
  getSearchResult,
  getSearchError,
  getRelationFindResult,
} from '../../../src/reducers';

import { searchKey } from '../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

describe('reducer', function suite() {
  it('should compose other reducers', function test() {
    const state = reducer(undefined, {});

    state.should.have.all.keys([
      'searchPage',
      'routing',
      'cspace',
      'idGenerator',
      'quickSearch',
      'login',
      'logout',
      'notification',
      'optionList',
      'partialTermSearch',
      'prefs',
      'record',
      'recordBrowser',
      'relation',
      'search',
      'searchToRelate',
      'user',
      'vocabulary',
    ]);
  });

  describe('getUserUsername selector', function selectorSuite() {
    it('should select from the users key', function test() {
      getUserUsername({
        user: {
          username: 'user@collectionspace.org',
        },
      }).should.equal('user@collectionspace.org');
    });
  });

  describe('getLoginContinuation selector', function selectorSuite() {
    it('should select from the login key', function test() {
      getLoginContinuation({
        login: Immutable.Map({
          continuation: '/some/path',
        }),
      }).should.equal('/some/path');
    });
  });

  describe('getLoginUsername selector', function selectorSuite() {
    it('should select from the login key', function test() {
      getLoginUsername({
        login: Immutable.Map({
          username: 'admin@collectionspace.org',
        }),
      }).should.equal('admin@collectionspace.org');
    });
  });

  describe('isLoginPending selector', function selectorSuite() {
    it('should select from the login key', function test() {
      isLoginPending({
        login: Immutable.Map({
          isPending: true,
        }),
      }).should.equal(true);
    });
  });

  describe('getLoginResponse selector', function selectorSuite() {
    it('should select from the login key', function test() {
      const response = {};

      getLoginResponse({
        login: Immutable.Map({
          response,
        }),
      }).should.equal(response);
    });
  });

  describe('getLoginError selector', function selectorSuite() {
    it('should select from the login key', function test() {
      const error = {};

      getLoginError({
        login: Immutable.Map({
          error,
        }),
      }).should.equal(error);
    });
  });

  describe('isLogoutPending selector', function selectorSuite() {
    it('should select from the logout key', function test() {
      isLogoutPending({
        logout: {
          isPending: true,
        },
      }).should.equal(true);
    });
  });

  describe('getLogoutResponse selector', function selectorSuite() {
    it('should select from the logout key', function test() {
      const response = {};

      getLogoutResponse({
        logout: {
          response,
        },
      }).should.equal(response);
    });
  });

  describe('getRecordRelationUpdatedTimestamp selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';
      const relationUpdatedTime = '2017-03-23T13:23:11.000';

      getRecordRelationUpdatedTimestamp({
        record: Immutable.fromJS({
          [csid]: {
            relationUpdatedTime,
          },
        }),
      }, csid).should.equal(relationUpdatedTime);
    });
  });

  describe('getRecordData selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';
      const data = Immutable.Map();

      getRecordData({
        record: Immutable.fromJS({
          [csid]: {
            data: {
              current: data,
            },
          },
        }),
      }, csid).should.equal(data);
    });
  });

  describe('getNewRecordData selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const data = Immutable.Map();

      getNewRecordData({
        record: Immutable.fromJS({
          '': {
            data: {
              current: data,
            },
          },
        }),
      }).should.equal(data);
    });
  });

  describe('isRecordModified selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';

      isRecordModified({
        record: Immutable.fromJS({
          [csid]: {
            data: {
              baseline: Immutable.Map({ foo: 'bar' }),
              current: Immutable.Map({ foo: 'baz' }),
            },
          },
        }),
      }, csid).should.equal(true);
    });
  });

  describe('isRecordReadPending selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';

      isRecordReadPending({
        record: Immutable.fromJS({
          [csid]: {
            isReadPending: true,
          },
        }),
      }, csid).should.equal(true);
    });
  });

  describe('isRecordSavePending selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';

      isRecordSavePending({
        record: Immutable.fromJS({
          [csid]: {
            isSavePending: true,
          },
        }),
      }, csid).should.equal(true);
    });
  });

  describe('getPrefs selector', function selectorSuite() {
    it('should return the prefs key', function test() {
      const prefs = Immutable.fromJS({
        searchPageSize: 30,
        panels: {},
      });

      getPrefs({
        prefs,
      }).should.deep.equal(prefs);
    });
  });

  describe('isPanelCollapsed selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'object';
      const name = 'desc';

      isPanelCollapsed({
        prefs: Immutable.fromJS({
          panels: {
            [recordType]: {
              [name]: {
                collapsed: true,
              },
            },
          },
        }),
      }, recordType, name).should.equal(true);
    });
  });

  describe('getRecordBrowserNavBarItems selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'object';
      const items = ['group', 'object'];

      getRecordBrowserNavBarItems({
        prefs: Immutable.fromJS({
          recordBrowserNavBarItems: {
            [recordType]: items,
          },
        }),
      }, recordType).should.equal(Immutable.List(items));
    });
  });

  describe('getSearchPanelPageSize selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'object';
      const name = 'desc';
      const searchPanelPageSize = 7;

      getSearchPanelPageSize({
        prefs: Immutable.fromJS({
          panels: {
            [recordType]: {
              [name]: {
                pageSize: searchPanelPageSize,
              },
            },
          },
        }),
      }, recordType, name).should.equal(searchPanelPageSize);
    });
  });

  describe('getSearchPageRecordType selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';

      getSearchPageRecordType({
        prefs: Immutable.fromJS({
          searchPage: {
            recordType,
          },
        }),
      }).should.equal(recordType);
    });
  });

  describe('getSearchPageVocabulary selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';
      const vocabulary = 'local';

      getSearchPageVocabulary({
        prefs: Immutable.fromJS({
          searchPage: {
            vocabulary: {
              [recordType]: vocabulary,
            },
          },
        }),
      }, recordType).should.equal(vocabulary);
    });
  });

  describe('getSearchResultPagePageSize selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const searchResultPagePageSize = 35;

      getSearchResultPagePageSize({
        prefs: Immutable.fromJS({
          searchResultPagePageSize,
        }),
      }).should.equal(searchResultPagePageSize);
    });
  });

  describe('getOptionList selector', function selectorSuite() {
    it('should select from the optionList key', function test() {
      const sizes = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ];

      getOptionList({
        optionList: {
          sizes,
        },
      }, 'sizes').should.deep.equal(sizes);
    });
  });

  describe('getVocabulary selector', function selectorSuite() {
    it('should select from the vocabulary key', function test() {
      const vocabularyName = 'states';

      const vocabulary = {
        items: [
          { displayName: 'California' },
          { displayName: 'New York' },
        ],
      };

      getVocabulary({
        vocabulary: {
          [vocabularyName]: vocabulary,
        },
      }, vocabularyName).should.deep.equal(vocabulary);
    });
  });

  describe('getPartialTermSearchMatches selector', function selectorSuite() {
    it('should select from the partialTermSearch key', function test() {
      const partialTermSearch = Immutable.Map();

      getPartialTermSearchMatches({
        partialTermSearch,
      }).should.deep.equal(partialTermSearch);
    });
  });

  describe('getIDGenerator selector', function selectorSuite() {
    it('should select from the idGenerator key', function test() {
      const idGeneratorName = 'lo';
      const idGenerator = Immutable.Map();

      getIDGenerator({
        idGenerator: Immutable.Map({
          [idGeneratorName]: idGenerator,
        }),
      }, idGeneratorName).should.deep.equal(idGenerator);
    });
  });

  describe('getSearchPageAdvanced selector', function selectorSuite() {
    it('should select from the searchPage key', function test() {
      const advancedSearchCondition = {
        op: 'eq',
        path: 'path',
        value: 'value',
      };

      getSearchPageAdvanced({
        searchPage: Immutable.fromJS({
          advanced: advancedSearchCondition,
        }),
      }).should.equal(Immutable.fromJS(advancedSearchCondition));
    });
  });

  describe('getSearchPageKeyword selector', function selectorSuite() {
    it('should select from the searchPage key', function test() {
      const keyword = 'abc';

      getSearchPageKeyword({
        searchPage: Immutable.Map({
          keyword,
        }),
      }).should.equal(keyword);
    });
  });

  describe('getQuickSearchKeyword selector', function selectorSuite() {
    it('should select from the quickSearch key', function test() {
      const keyword = 'abc';

      getQuickSearchKeyword({
        quickSearch: Immutable.Map({
          keyword,
        }),
      }).should.deep.equal(keyword);
    });
  });

  describe('getQuickSearchRecordType selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';

      getQuickSearchRecordType({
        prefs: Immutable.fromJS({
          quickSearch: {
            recordType,
          },
        }),
      }).should.deep.equal(recordType);
    });
  });

  describe('getQuickSearchVocabulary selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';
      const vocabulary = 'local';

      getQuickSearchVocabulary({
        prefs: Immutable.fromJS({
          quickSearch: {
            vocabulary: {
              [recordType]: vocabulary,
            },
          },
        }),
      }, recordType).should.deep.equal(vocabulary);
    });
  });

  describe('isSearchPending selector', function selectorSuite() {
    it('should select from the search key', function test() {
      const searchDescriptor = {
        recordType: 'object',
      };

      const searchName = 'testSearch';
      const key = searchKey(searchDescriptor);

      isSearchPending({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {
              [key]: {
                isPending: true,
              },
            },
          },
        }),
      }, searchName, searchDescriptor).should.deep.equal(true);
    });
  });

  describe('getMostRecentSearchDescriptor selector', function selectorSuite() {
    it('should select from the search key', function test() {
      const searchDescriptor = {
        recordType: 'object',
      };

      const searchName = 'testSearch';
      const key = searchKey(searchDescriptor);

      getMostRecentSearchDescriptor({
        search: Immutable.fromJS({
          [searchName]: {
            mostRecentKey: key,
            byKey: {
              [key]: {
                descriptor: searchDescriptor,
              },
            },
          },
        }),
      }, searchName).should.equal(Immutable.fromJS(searchDescriptor));
    });
  });

  describe('getSearchResult selector', function selectorSuite() {
    it('should select from the search key', function test() {
      const searchDescriptor = {
        recordType: 'object',
      };

      const searchName = 'testSearch';
      const key = searchKey(searchDescriptor);

      const result = {
        'ns2:abstract-common-list': {
          totalItems: '33',
        },
      };

      getSearchResult({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {
              [key]: {
                result,
              },
            },
          },
        }),
      }, searchName, searchDescriptor).should.deep.equal(Immutable.fromJS(result));
    });
  });

  describe('getSearchError selector', function selectorSuite() {
    it('should select from the search key', function test() {
      const searchDescriptor = {
        recordType: 'object',
      };

      const searchName = 'testSearch';
      const key = searchKey(searchDescriptor);

      const error = {
        code: 'ERROR_CODE',
      };

      getSearchError({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {
              [key]: {
                error,
              },
            },
          },
        }),
      }, searchName, searchDescriptor).should.deep.equal(Immutable.fromJS(error));
    });
  });

  describe('getRelationFindResult selector', function selectorSuite() {
    it('should select from the relation key', function test() {
      const subjectCsid = '1234';
      const objectCsid = '5678';
      const predicate = 'affects';

      const subject = {
        csid: subjectCsid,
      };

      const object = {
        csid: objectCsid,
      };

      const result = Immutable.fromJS({
        'ns2:relations-common-list': {
          itemsInPage: '1',
          totalItems: '1',
        },
      });

      getRelationFindResult({
        relation: Immutable.fromJS({
          find: {
            [subjectCsid]: {
              [objectCsid]: {
                [predicate]: {
                  result,
                },
              },
            },
          },
        }),
      }, subject, object, predicate).should.equal(result);
    });
  });
});
