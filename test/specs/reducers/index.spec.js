import Immutable from 'immutable';

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
  isRecordReadPending,
  isRecordSavePending,
  isPanelCollapsed,
  getOptions,
  getVocabulary,
} from '../../../src/reducers';

chai.should();

describe('reducer', function suite() {
  it('should compose other reducers', function test() {
    const state = reducer(undefined, {});

    state.should.have.all.keys([
      'routing',
      'cspace',
      'login',
      'logout',
      'prefs',
      'user',
      'record',
      'options',
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
      const data = {};

      getRecordData({
        record: {
          data: {
            [csid]: data,
          },
        },
      }, csid).should.equal(data);
    });
  });

  describe('getNewRecordData selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const data = Immutable.Map();

      getNewRecordData({
        record: {
          data: {
            '': data,
          },
        },
      }).should.equal(data);
    });
  });

  describe('isRecordReadPending selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';

      isRecordReadPending({
        record: {
          readsPending: {
            [csid]: true,
          },
        },
      }, csid).should.equal(true);
    });
  });

  describe('isRecordSavePending selector', function selectorSuite() {
    it('should select from the record key', function test() {
      const csid = '1234';

      isRecordSavePending({
        record: {
          savesPending: {
            [csid]: true,
          },
        },
      }, csid).should.equal(true);
    });
  });

  describe('isPanelCollapsed selector', function selectorSuite() {
    it('should select from the prefs key', function test() {
      const recordType = 'object';
      const name = 'descPanel';

      isPanelCollapsed({
        prefs: {
          panels: {
            [recordType]: {
              [name]: true,
            },
          },
        },
      }, recordType, name).should.equal(true);
    });
  });

  describe('getOptions selector', function selectorSuite() {
    it('should select from the options key', function test() {
      const sizes = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ];

      getOptions({
        options: {
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
});
