import {
  getReportViewerPath,
} from '../../../src/helpers/reportHelpers';

chai.should();

describe('reportHelpers', function moduleSuite() {
  describe('getReportViewerPath', function suite() {
    const reportCsid = '1234';

    const csid = '8888';
    const recordType = 'collectionobject';

    const invocationDescriptor = {
      csid,
      recordType,
    };

    const params = {
      foo: 'abc',
    };

    it('should prepend the basename and \'report\' to the report csid, and add query parameters', function test() {
      const config = {
        basename: 'base',
      };

      getReportViewerPath(config, reportCsid, invocationDescriptor, params).should
        .equal(`${config.basename}/report/${reportCsid}?csid=${csid}&recordType=${recordType}&params=%7B%22foo%22%3A%22abc%22%7D`);
    });

    it('should not prepend the basename if it is falsy', function test() {
      const config = {
        basename: null,
      };

      getReportViewerPath(config, reportCsid, invocationDescriptor).should
        .equal(`/report/${reportCsid}?csid=${csid}&recordType=${recordType}`);
    });
  });
});
