import {
  SET_RECORD_PAGE_PRIMARY_CSID,
} from '../../../src/constants/actionCodes';

import {
  setRecordPagePrimaryCsid,
} from '../../../src/actions/recordPage';

chai.should();

describe('record page action creator', () => {
  describe('setRecordPagePrimaryCsid', () => {
    it('should create a SET_RECORD_PAGE_PRIMARY_CSID action', () => {
      const csid = '1234';

      setRecordPagePrimaryCsid(csid).should.deep.equal({
        type: SET_RECORD_PAGE_PRIMARY_CSID,
        payload: csid,
      });
    });
  });
});
