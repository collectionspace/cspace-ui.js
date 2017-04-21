import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
  SET_RELATED_RECORD_BROWSER_RELATED_CSID,
} from '../../../src/actions/recordBrowser';

import reducer, {
  getRelatedRecordBrowserRelatedCsid,
} from '../../../src/reducers/recordBrowser';

chai.use(chaiImmutable);
chai.should();

describe('record browser reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_RELATED_RECORD_BROWSER_RELATED_CSID', function test() {
    const recordType = 'collectionobject';
    const relatedCsid = '1234';

    const state = reducer(undefined, {
      type: SET_RELATED_RECORD_BROWSER_RELATED_CSID,
      payload: relatedCsid,
      meta: {
        recordType,
      },
    });

    state.should.equal(Immutable.fromJS({
      relatedRecordBrowser: {
        relatedCsid: {
          [recordType]: relatedCsid,
        },
      },
    }));

    getRelatedRecordBrowserRelatedCsid(state, recordType).should.equal(relatedCsid);
  });

  it('should handle CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID', function test() {
    const initialState = Immutable.fromJS({
      relatedRecordBrowser: {
        relatedCsid: {
          collectionobject: '1111',
          group: '2222',
          media: '3333',
        },
      },
    });

    const state = reducer(initialState, {
      type: CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
    });

    state.should.equal(Immutable.fromJS({
      relatedRecordBrowser: {},
    }));
  });
});
