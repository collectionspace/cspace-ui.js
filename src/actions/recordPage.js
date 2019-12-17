import {
  SET_RECORD_PAGE_PRIMARY_CSID,
} from '../constants/actionCodes';

export const setRecordPagePrimaryCsid = (csid) => ({
  type: SET_RECORD_PAGE_PRIMARY_CSID,
  payload: csid,
});

export default {};
