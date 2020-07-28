import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import reducer, {
  getAuthorityVocabCsid,
  getAuthorityVocabWorkflowState,
  getAuthzResourceNames,
  getAuthzRoles,
  isAuthzPermsReadPending,
  isAuthzRolesReadPending,
  getUserScreenName,
  getUserUsername,
  getUserPerms,
  getLoginUsername,
  isLoginPending,
  isLoginSuccess,
  getLoginError,
  isLogoutPending,
  getLogoutResponse,
  getRecordRelationUpdatedTimestamp,
  getRecordData,
  getRecordError,
  getRecordSubrecordCsid,
  getRecordValidationErrors,
  getNewRecordData,
  isRecordModified,
  isRecordReadPending,
  isRecordSavePending,
  isRecordReadVocabularyItemRefsPending,
  getRelatedRecordBrowserRelatedCsid,
  getPrefs,
  isPanelCollapsed,
  getRecordBrowserNavBarItems,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getSearchPanelPageSize,
  getSearchResultPagePageSize,
  getSearchToSelectPageSize,
  getUploadType,
  getForm,
  getAdminTab,
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
  getSearchState,
  getMostRecentSearchDescriptor,
  getSearchResult,
  getSearchError,
  getSearchSelectedItems,
  getRelationFindResult,
  getSearchToSelectAdvanced,
  getSearchToSelectKeyword,
  getSearchToSelectRecordType,
  getSearchToSelectVocabulary,
  getNotifications,
  getOpenModalName,
} from '../../../src/reducers';

import { searchKey } from '../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

describe('reducer', () => {
  it('should compose other reducers', () => {
    const state = reducer(undefined, {});

    state.should.have.all.keys([
      'authority',
      'authz',
      'searchPage',
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
      'recordPage',
      'relation',
      'search',
      'searchToSelect',
      'user',
      'vocabulary',
    ]);
  });

  describe('getAuthorityVocabCsid selector', () => {
    it('should select from the authority key', () => {
      const recordType = 'person';
      const vocabulary = 'local';
      const csid = '1234';

      getAuthorityVocabCsid({
        authority: Immutable.fromJS({
          [recordType]: {
            [vocabulary]: {
              csid,
            },
          },
        }),
      }, recordType, vocabulary).should.equal(csid);
    });
  });

  describe('getAuthorityVocabWorkflowState selector', () => {
    it('should select from the authority key', () => {
      const recordType = 'person';
      const vocabulary = 'local';
      const workflowState = 'locked';

      getAuthorityVocabWorkflowState({
        authority: Immutable.fromJS({
          [recordType]: {
            [vocabulary]: {
              workflowState,
            },
          },
        }),
      }, recordType, vocabulary).should.equal(workflowState);
    });
  });

  describe('getAuthzResourceNames selector', () => {
    it('should select from the authz key', () => {
      const resourceNames = Immutable.List([
        'collectionobjects',
        'groups',
      ]);

      getAuthzResourceNames({
        authz: Immutable.fromJS({
          resourceNames,
        }),
      }).should.equal(resourceNames);
    });
  });

  describe('isAuthzPermsReadPending selector', () => {
    it('should select from the authz key', () => {
      isAuthzPermsReadPending({
        authz: Immutable.fromJS({
          isPermsReadPending: true,
        }),
      }).should.equal(true);
    });
  });

  describe('getAuthzRoles selector', () => {
    it('should select from the authz key', () => {
      const roles = Immutable.fromJS([
        { roleName: 'TENANT_ADMINISTRATOR' },
        { roleName: 'TENANT_READER' },
      ]);

      getAuthzRoles({
        authz: Immutable.fromJS({
          roles,
        }),
      }).should.equal(roles);
    });
  });

  describe('isAuthzRolesReadPending selector', () => {
    it('should select from the authz key', () => {
      isAuthzRolesReadPending({
        authz: Immutable.fromJS({
          isRolesReadPending: true,
        }),
      }).should.equal(true);
    });
  });

  describe('getUserScreenName selector', () => {
    it('should select from the user key', () => {
      getUserScreenName({
        user: Immutable.fromJS({
          account: {
            screenName: 'Screen Name',
          },
        }),
      }).should.equal('Screen Name');
    });
  });

  describe('getUserPerms selector', () => {
    it('should select from the user key', () => {
      const perms = Immutable.Map({
        foo: {
          data: 'CRUDL',
        },
      });

      getUserPerms({
        user: Immutable.Map({
          perms,
        }),
      }).should.equal(perms);
    });
  });

  describe('getUserUsername selector', () => {
    it('should select from the user key', () => {
      getUserUsername({
        user: Immutable.Map({
          username: 'user@collectionspace.org',
        }),
      }).should.equal('user@collectionspace.org');
    });
  });

  describe('getLoginUsername selector', () => {
    it('should select from the login key', () => {
      getLoginUsername({
        login: Immutable.Map({
          username: 'admin@collectionspace.org',
        }),
      }).should.equal('admin@collectionspace.org');
    });
  });

  describe('isLoginPending selector', () => {
    it('should select from the login key', () => {
      isLoginPending({
        login: Immutable.Map({
          isPending: true,
        }),
      }).should.equal(true);
    });
  });

  describe('getLoginError selector', () => {
    it('should select from the login key', () => {
      const error = {};

      getLoginError({
        login: Immutable.Map({
          error,
        }),
      }).should.equal(error);
    });
  });

  describe('isLoginSuccess selector', () => {
    it('should select from the login key', () => {
      isLoginSuccess({
        login: Immutable.Map({
          isSuccess: true,
        }),
      }).should.equal(true);
    });
  });

  describe('isLogoutPending selector', () => {
    it('should select from the logout key', () => {
      isLogoutPending({
        logout: {
          isPending: true,
        },
      }).should.equal(true);
    });
  });

  describe('getLogoutResponse selector', () => {
    it('should select from the logout key', () => {
      const response = {};

      getLogoutResponse({
        logout: {
          response,
        },
      }).should.equal(response);
    });
  });

  describe('getRecordRelationUpdatedTimestamp selector', () => {
    it('should select from the record key', () => {
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

  describe('getRecordData selector', () => {
    it('should select from the record key', () => {
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

  describe('getRecordError selector', () => {
    it('should select from the record key', () => {
      const csid = '1234';
      const error = Immutable.Map();

      getRecordError({
        record: Immutable.fromJS({
          [csid]: {
            error,
          },
        }),
      }, csid).should.equal(error);
    });
  });

  describe('getRecordSubrecordCsid selector', () => {
    it('should select from the record key', () => {
      const csid = '1234';
      const subrecordName = 'contact';
      const subrecordCsid = '5678';

      getRecordSubrecordCsid({
        record: Immutable.fromJS({
          [csid]: {
            subrecord: {
              [subrecordName]: subrecordCsid,
            },
          },
        }),
      }, csid, subrecordName).should.equal(subrecordCsid);
    });
  });

  describe('getRecordValidationErrors selector', () => {
    it('should select from the record key', () => {
      const csid = '1234';

      const validationError = Immutable.Map({
        code: 'ERROR_CODE',
      });

      getRecordValidationErrors({
        record: Immutable.fromJS({
          [csid]: {
            validation: validationError,
          },
        }),
      }, csid).should.equal(validationError);
    });
  });

  describe('getNewRecordData selector', () => {
    it('should select from the record key', () => {
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

  describe('isRecordModified selector', () => {
    it('should select from the record key', () => {
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

  describe('isRecordReadPending selector', () => {
    it('should select from the record key', () => {
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

  describe('isRecordSavePending selector', () => {
    it('should select from the record key', () => {
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

  describe('isRecordReadVocabularyItemRefsPending selector', () => {
    it('should select from the record key', () => {
      const csid = '1234';

      isRecordReadVocabularyItemRefsPending({
        record: Immutable.fromJS({
          [csid]: {
            isReadVocabularyItemRefsPending: true,
          },
        }),
      }, csid).should.equal(true);
    });
  });

  describe('getRelatedRecordBrowserRelatedCsid selector', () => {
    it('should select from the recordBrowser key', () => {
      const recordType = 'collectionobject';
      const relatedCsid = '1234';

      getRelatedRecordBrowserRelatedCsid({
        recordBrowser: Immutable.fromJS({
          relatedRecordBrowser: {
            relatedCsid: {
              [recordType]: relatedCsid,
            },
          },
        }),
      }, recordType).should.equal(relatedCsid);
    });
  });

  describe('getPrefs selector', () => {
    it('should return the prefs key', () => {
      const prefs = Immutable.fromJS({
        searchPageSize: 30,
        panels: {},
      });

      getPrefs({
        prefs,
      }).should.deep.equal(prefs);
    });
  });

  describe('isPanelCollapsed selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getRecordBrowserNavBarItems selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getSearchPanelPageSize selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getSearchPageRecordType selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getSearchPageVocabulary selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getSearchResultPagePageSize selector', () => {
    it('should select from the prefs key', () => {
      const searchResultPagePageSize = 35;

      getSearchResultPagePageSize({
        prefs: Immutable.fromJS({
          searchResultPagePageSize,
        }),
      }).should.equal(searchResultPagePageSize);
    });
  });

  describe('getSearchToSelectPageSize selector', () => {
    it('should select from the prefs key', () => {
      const searchToSelectPageSize = 15;

      getSearchToSelectPageSize({
        prefs: Immutable.fromJS({
          searchToSelectPageSize,
        }),
      }).should.equal(searchToSelectPageSize);
    });
  });

  describe('getUploadType selector', () => {
    it('should select from the prefs key', () => {
      const uploadType = 'url';

      getUploadType({
        prefs: Immutable.fromJS({
          uploadType,
        }),
      }).should.equal(uploadType);
    });
  });

  describe('getForm selector', () => {
    it('should select from the prefs key', () => {
      const recordType = 'collectionobject';
      const form = 'default';

      getForm({
        prefs: Immutable.fromJS({
          form: {
            [recordType]: form,
          },
        }),
      }, recordType).should.equal(form);
    });
  });

  describe('getAdminTab selector', () => {
    it('should select from the prefs key', () => {
      const adminTab = 'roles';

      getAdminTab({
        prefs: Immutable.fromJS({
          adminTab,
        }),
      }).should.equal(adminTab);
    });
  });

  describe('getOptionList selector', () => {
    it('should select from the optionList key', () => {
      const sizes = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ];

      getOptionList({
        optionList: Immutable.Map({
          sizes,
        }),
      }, 'sizes').should.deep.equal(sizes);
    });
  });

  describe('getVocabulary selector', () => {
    it('should select from the vocabulary key', () => {
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

  describe('getPartialTermSearchMatches selector', () => {
    it('should select from the partialTermSearch key', () => {
      const partialTermSearch = Immutable.Map();

      getPartialTermSearchMatches({
        partialTermSearch,
      }).should.deep.equal(partialTermSearch);
    });
  });

  describe('getIDGenerator selector', () => {
    it('should select from the idGenerator key', () => {
      const idGeneratorName = 'lo';
      const idGenerator = Immutable.Map();

      getIDGenerator({
        idGenerator: Immutable.Map({
          [idGeneratorName]: idGenerator,
        }),
      }, idGeneratorName).should.deep.equal(idGenerator);
    });
  });

  describe('getSearchPageAdvanced selector', () => {
    it('should select from the searchPage key', () => {
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

  describe('getSearchPageKeyword selector', () => {
    it('should select from the searchPage key', () => {
      const keyword = 'abc';

      getSearchPageKeyword({
        searchPage: Immutable.Map({
          keyword,
        }),
      }).should.equal(keyword);
    });
  });

  describe('getQuickSearchKeyword selector', () => {
    it('should select from the quickSearch key', () => {
      const keyword = 'abc';

      getQuickSearchKeyword({
        quickSearch: Immutable.Map({
          keyword,
        }),
      }).should.deep.equal(keyword);
    });
  });

  describe('getQuickSearchRecordType selector', () => {
    it('should select from the prefs key', () => {
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

  describe('getQuickSearchVocabulary selector', () => {
    it('should select from the prefs key', () => {
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

  describe('isSearchPending selector', () => {
    it('should select from the search key', () => {
      const searchDescriptor = Immutable.Map({
        recordType: 'object',
      });

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

  describe('getSearchState selector', () => {
    it('should select from the search key', () => {
      const searchDescriptor = Immutable.Map({
        recordType: 'object',
      });

      const searchName = 'testSearch';
      const key = searchKey(searchDescriptor);

      const state = Immutable.fromJS({
        descriptor: searchDescriptor,
        result: {},
      });

      getSearchState({
        search: Immutable.fromJS({
          [searchName]: {
            mostRecentKey: key,
            byKey: {
              [key]: state,
            },
          },
        }),
      }, searchName, searchDescriptor).should.equal(state);
    });
  });

  describe('getMostRecentSearchDescriptor selector', () => {
    it('should select from the search key', () => {
      const searchDescriptor = Immutable.Map({
        recordType: 'object',
      });

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

  describe('getSearchResult selector', () => {
    it('should select from the search key', () => {
      const searchDescriptor = Immutable.Map({
        recordType: 'object',
      });

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

  describe('getSearchError selector', () => {
    it('should select from the search key', () => {
      const searchDescriptor = Immutable.Map({
        recordType: 'object',
      });

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

  describe('getSearchSelectedItems selector', () => {
    it('should select from the search key', () => {
      const searchName = 'testSearch';

      const selected = Immutable.fromJS({
        1234: {
          csid: '1234',
        },
      });

      getSearchSelectedItems({
        search: Immutable.fromJS({
          [searchName]: {
            selected,
          },
        }),
      }, searchName).should.equal(selected);
    });
  });

  describe('getRelationFindResult selector', () => {
    it('should select from the relation key', () => {
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
        'rel:relations-common-list': {
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

  describe('getSearchToSelectAdvanced selector', () => {
    it('should select from the searchToSelect key', () => {
      const advancedSearchCondition = Immutable.Map({
        op: 'eq',
        path: '',
        value: '',
      });

      getSearchToSelectAdvanced({
        searchToSelect: Immutable.fromJS({
          advanced: advancedSearchCondition,
        }),
      }).should.equal(advancedSearchCondition);
    });
  });

  describe('getSearchToSelectKeyword selector', () => {
    it('should select from the searchToSelect key', () => {
      const keyword = 'something';

      getSearchToSelectKeyword({
        searchToSelect: Immutable.fromJS({
          keyword,
        }),
      }).should.equal(keyword);
    });
  });

  describe('getSearchToSelectRecordType selector', () => {
    it('should select from the searchToSelect key', () => {
      const recordType = 'person';

      getSearchToSelectRecordType({
        searchToSelect: Immutable.fromJS({
          recordType,
        }),
      }).should.equal(recordType);
    });
  });

  describe('getSearchToSelectVocabulary selector', () => {
    it('should select from the searchToSelect key', () => {
      const recordType = 'person';
      const vocabulary = 'local';

      getSearchToSelectVocabulary({
        searchToSelect: Immutable.fromJS({
          vocabulary: {
            [recordType]: vocabulary,
          },
        }),
      }, recordType).should.equal(vocabulary);
    });
  });

  describe('getNotifications selector', () => {
    it('should select from the notification key', () => {
      const notifications = Immutable.OrderedMap({
        1: {
          message: {
            id: 'messageId',
            defaultMessage: 'Saving {title}',
          },
          values: {
            title: 'Title',
          },
          date: new Date(),
          status: 'pending',
        },
      });

      getNotifications({
        notification: Immutable.fromJS({
          notifications,
        }),
      }).should.equal(notifications);
    });
  });

  describe('getOpenModalName selector', () => {
    it('should select from the notification key', () => {
      const modalName = 'modalName';

      getOpenModalName({
        notification: Immutable.fromJS({
          modal: modalName,
        }),
      }).should.equal(modalName);
    });
  });
});
