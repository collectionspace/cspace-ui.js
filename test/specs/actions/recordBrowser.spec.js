import {
  CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
  SET_RELATED_RECORD_BROWSER_RELATED_CSID,
  clearRelatedRecordBrowserRelatedCsid,
  setRelatedRecordBrowserRelatedCsid,
} from '../../../src/actions/recordBrowser';

chai.should();

describe('record browser action creator', function suite() {
  describe('clearRelatedRecordBrowserRelatedCsid', function actionSuite() {
    it('should create a CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID action', function test() {
      clearRelatedRecordBrowserRelatedCsid().should.deep.equal({
        type: CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
      });
    });
  });

  describe('setRelatedRecordBrowserRelatedCsid', function actionSuite() {
    it('should create a SET_RELATED_RECORD_BROWSER_RELATED_CSID action', function test() {
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
