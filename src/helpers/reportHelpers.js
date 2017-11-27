import qs from 'qs';

export const VIEWER_WINDOW_NAME = undefined;

export const getReportViewerPath = (reportItem, config, recordType, csid) => {
  const {
    basename,
  } = config;

  const reportCsid = reportItem.get('csid');

  const params = {
    csid,
    recordType,
  };

  return `${basename || ''}/report/${reportCsid}?${qs.stringify(params)}`;
};
