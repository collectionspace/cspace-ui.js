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
  getRecordData,
  getNewRecordData,
  isRecordModified,
  isRecordReadPending,
  isRecordSavePending,
  getPrefs,
  isPanelCollapsed,
  getSearchPanelPageSize,
  getSearchPageSize,
  getOptionList,
  getVocabulary,
  getPartialTermSearchMatches,
  getIDGenerator,
  getKeywordSearchKeyword,
  getKeywordSearchRecordType,
  getKeywordSearchVocabulary,
  isSearchPending,
  getSearchResult,
  getSearchError,
} from '../../../src/reducers';

import { searchKey } from '../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

describe('reducer', function suite() {
  it('should compose other reducers', function test() {
    const state = reducer(undefined, {});

    state.should.have.all.keys([
      'advancedSearch',
      'routing',
      'cspace',
      'idGenerator',
      'keywordSearch',
      'login',
      'logout',
      'optionList',
      'partialTermSearch',
      'prefs',
      'search',
      'user',
      'record',
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
        login: {
          continuation: '/some/path',
        },
      }).should.equal('/some/path');
    });
  });

  describe('getLoginUsername selector', function selectorSuite() {
    it('should select from the login key', function test() {
      getLoginUsername({
        login: {
          username: 'admin@collectionspace.org',
        },
      }).should.equal('admin@collectionspace.org');
    });
  });

  describe('isLoginPending selector', function selectorSuite() {
    it('should select from the login key', function test() {
      isLoginPending({
        login: {
          isPending: true,
        },
      }).should.equal(true);
    });
  });

  describe('getLoginResponse selector', function selectorSuite() {
    it('should select from the login key', function test() {
      const response = {};

      getLoginResponse({
        login: {
          response,
        },
      }).should.equal(response);
    });
  });

  describe('getLoginError selector', function selectorSuite() {
    it('should select from the login key', function test() {
      const error = {};

      getLoginError({
        login: {
          error,
        },
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

  describe('getSearchPageSize selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const searchPageSize = 35;

      getSearchPageSize({
        prefs: Immutable.fromJS({
          searchPageSize,
        }),
      }).should.equal(searchPageSize);
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

  describe('getKeywordSearchKeyword selector', function selectorSuite() {
    it('should select from the keywordSearch key', function test() {
      const keyword = 'abc';

      getKeywordSearchKeyword({
        keywordSearch: Immutable.Map({
          keyword,
        }),
      }).should.deep.equal(keyword);
    });
  });

  describe('getKeywordSearchRecordType selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';

      getKeywordSearchRecordType({
        prefs: Immutable.fromJS({
          keywordSearch: {
            recordType,
          },
        }),
      }).should.deep.equal(recordType);
    });
  });

  describe('getKeywordSearchVocabulary selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'person';
      const vocabulary = 'local';

      getKeywordSearchVocabulary({
        prefs: Immutable.fromJS({
          keywordSearch: {
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
});
