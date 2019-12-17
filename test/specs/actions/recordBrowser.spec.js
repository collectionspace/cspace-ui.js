import {
  CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
  SET_RELATED_RECORD_BROWSER_RELATED_CSID,
} from '../../../src/constants/actionCodes';

import {
  clearRelatedRecordBrowserRelatedCsid,
  setRelatedRecordBrowserRelatedCsid,
} from '../../../src/actions/recordBrowser';

chai.should();

describe('record browser action creator', () => {
  describe('clearRelatedRecordBrowserRelatedCsid', () => {
    it('should create a CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID action', () => {
      clearRelatedRecordBrowserRelatedCsid().should.deep.equal({
        type: CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
      });
    });
  });

  describe('setRelatedRecordBrowserRelatedCsid', () => {
    it('should create a SET_RELATED_RECORD_BROWSER_RELATED_CSID action', () => {
      const recordType = 'collectionobject';
      const relatedCsid = '1234';

      setRelatedRecordBrowserRelatedCsid(recordType, relatedCsid).should.deep.equal({
        type: SET_RELATED_RECORD_BROWSER_RELATED_CSID,
        payload: relatedCsid,
        meta: {
          recordType,
        },
      });
    });
  });
});
