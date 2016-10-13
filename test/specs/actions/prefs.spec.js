import chai from 'chai';

import {
  COLLAPSE_PANEL,
  collapsePanel,
} from '../../../src/actions/prefs';

chai.should();

describe('prefs action creator', function suite() {
  describe('collapsePanel', function actionSuite() {
    it('should create a COLLAPSE_PANEL action', function test() {
      const recordType = 'object';
      const name = 'descPanel';
      const collapsed = true;

      collapsePanel(recordType, name, collapsed).should.deep.equal({
        type: COLLAPSE_PANEL,
        payload: collapsed,
        meta: {
          recordType,
          name,
        },
      });
    });
  });
});
