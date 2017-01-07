import { formatLocalDateTime } from '../../../src/helpers/dateHelpers';

describe('configHelpers', function moduleSuite() {
  describe('formatLocalDateTime', function suite() {
    const intl = {
      formatDate: value => `formatted ${value}`,
    };

    it('should call intl.formatDate', function test() {
      formatLocalDateTime('2017-01-04T05:20:36.377Z', { intl }).should
        .equal('formatted 2017-01-04T05:20:36.377Z');
    });
  });
});
