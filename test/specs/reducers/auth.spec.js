import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  PERMS_READ_STARTED,
  PERMS_READ_FULFILLED,
  PERMS_READ_REJECTED,
} from '../../../src/actions/auth';

import reducer, {
  getResourceNames,
  isPermsReadPending,
} from '../../../src/reducers/auth';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('auth reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  context('on PERMS_READ_STARTED', function context() {
    it('should set isPermsReadPending to true', function test() {
      const state = reducer(undefined, {
        type: PERMS_READ_STARTED,
      });

      state.should.deep.equal(Immutable.Map({
        isPermsReadPending: true,
      }));

      isPermsReadPending(state).should.equal(true);
    });
  });

  context('on PERMS_READ_FULFILLED', function context() {
    const config = {
      recordTypes: {
        group: {
          serviceConfig: {
            servicePath: 'groups',
          },
        },
      },
    };

    const response = {
      data: {
        'ns2:permissions_list': {
          permission: [
            { resourceName: 'groups', actionGroup: 'CRUDL' },
            { resourceName: 'foo', actionGroup: 'CRUDL' },
            { resourceName: 'bar', actionGroup: 'CRUDL' },
          ],
        },
      },
    };

    it('should set resourceNames to contain known records in the response', function test() {
      const state = reducer(Immutable.fromJS({
        isPermsReadPending: true,
      }), {
        type: PERMS_READ_FULFILLED,
        payload: response,
        meta: {
          config,
        },
      });

      getResourceNames(state).should.equal(Immutable.List([
        'groups',
      ]));
    });

    it('should unset isPermsReadPending', function test() {
      const state = reducer(Immutable.fromJS({
        isPermsReadPending: true,
      }), {
        type: PERMS_READ_FULFILLED,
        payload: response,
        meta: {
          config,
        },
      });

      expect(isPermsReadPending(state)).to.equal(undefined);
    });

    it('should handle a single (non-list) permission', function test() {
      const singlePermResponse = {
        data: {
          'ns2:permissions_list': {
            permission: { resourceName: 'groups', actionGroup: 'CRUDL' },
          },
        },
      };

      const state = reducer(Immutable.fromJS({
        isPermsReadPending: true,
      }), {
        type: PERMS_READ_FULFILLED,
        payload: singlePermResponse,
        meta: {
          config,
        },
      });

      getResourceNames(state).should.equal(Immutable.List([
        'groups',
      ]));
    });
  });

  context('on PERMS_READ_REJECTED', function context() {
    it('should unset isPermsReadPending', function test() {
      const state = reducer(Immutable.fromJS({
        isPermsReadPending: true,
      }), {
        type: PERMS_READ_REJECTED,
      });

      state.should.deep.equal(Immutable.fromJS({}));

      expect(isPermsReadPending(state)).to.equal(undefined);
    });
  });
});
