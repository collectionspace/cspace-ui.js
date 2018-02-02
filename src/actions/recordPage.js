export const SET_RECORD_PAGE_PRIMARY_CSID = 'SET_RECORD_PAGE_PRIMARY_CSID';

export const setRecordPagePrimaryCsid = csid => ({
  type: SET_RECORD_PAGE_PRIMARY_CSID,
  payload: csid,
});
