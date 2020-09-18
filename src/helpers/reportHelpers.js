import qs from 'qs';

export const VIEWER_WINDOW_NAME = undefined;

export const getReportViewerPath = (config, reportCsid, invocationDescriptor, reportParams) => {
  const {
    basename,
  } = config;

  const reportParamsJson = reportParams && JSON.stringify(reportParams);

  const queryParams = {
    mode: invocationDescriptor.get('mode'),
    csid: invocationDescriptor.get('csid'),
    outputMIME: invocationDescriptor.get('outputMIME'),
    recordType: invocationDescriptor.get('recordType'),
    params: reportParamsJson,
  };

  return `${basename || ''}/report/${reportCsid}?${qs.stringify(queryParams, {arrayFormat: 'brackets'})}`;
};
