import qs from 'qs';

export const VIEWER_WINDOW_NAME = undefined;

export const getReportViewerPath = (reportItem, config, recordType, csid, reportParams) => {
  const {
    basename,
  } = config;

  const reportCsid = reportItem.get('csid');
  const reportParamsJson = JSON.stringify(reportParams);

  const params = {
    csid,
    recordType,
    params: reportParamsJson,
  };

  return `${basename || ''}/report/${reportCsid}?${qs.stringify(params)}`;
};
