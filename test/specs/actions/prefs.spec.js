import {
  COLLAPSE_PANEL,
  SET_SEARCH_PAGE_SIZE,
  collapsePanel,
  setSearchPageSize,
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

  describe('setSearchPageSize', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_SIZE action', function test() {
      const pageSize = 45;

      setSearchPageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });
});
