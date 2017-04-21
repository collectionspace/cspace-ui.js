export const CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID = 'CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID';
export const SET_RELATED_RECORD_BROWSER_RELATED_CSID = 'SET_RELATED_RECORD_BROWSER_RELATED_CSID';

export const clearRelatedRecordBrowserRelatedCsid = () => ({
  type: CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
});

export const setRelatedRecordBrowserRelatedCsid = (recordType, relatedCsid) => ({
  type: SET_RELATED_RECORD_BROWSER_RELATED_CSID,
  payload: relatedCsid,
  meta: {
    recordType,
  },
});
