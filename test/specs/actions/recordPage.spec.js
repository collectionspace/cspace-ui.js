import {
  SET_RECORD_PAGE_PRIMARY_CSID,
  setRecordPagePrimaryCsid,
} from '../../../src/actions/recordPage';

chai.should();

describe('record page action creator', function suite() {
  describe('setRecordPagePrimaryCsid', function actionSuite() {
    it('should create a SET_RECORD_PAGE_PRIMARY_CSID action', function test() {
      const csid = '1234';

      setRecordPagePrimaryCsid(csid).should.deep.equal({
        type: SET_RECORD_PAGE_PRIMARY_CSID,
        payload: csid,
      });
    });
  });
});
