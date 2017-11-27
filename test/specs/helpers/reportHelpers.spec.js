import Immutable from 'immutable';

import {
  getReportViewerPath,
} from '../../../src/helpers/reportHelpers';

chai.should();

describe('reportHelpers', function moduleSuite() {
  describe('getReportViewerPath', function suite() {
    const reportItem = Immutable.Map({
      csid: '1234',
    });

    const recordType = 'collectionobject';
    const recordCsid = '8888';

    it('should prepend the basename and \'report\' to the report csid, and add query parameters', function test() {
      const config = {
        basename: 'base',
      };

      getReportViewerPath(reportItem, config, recordType, recordCsid).should
        .equal(`${config.basename}/report/${reportItem.get('csid')}?csid=${recordCsid}&recordType=${recordType}`);
    });

    it('should not prepend the basename if it is falsy', function test() {
      const config = {
        basename: null,
      };

      getReportViewerPath(reportItem, config, recordType, recordCsid).should
        .equal(`/report/${reportItem.get('csid')}?csid=${recordCsid}&recordType=${recordType}`);
    });
  });
});
