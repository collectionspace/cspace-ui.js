import { formatTimestamp } from '../../../src/helpers/formatHelpers';

describe('configHelpers', function moduleSuite() {
  describe('formatTimestamp', function suite() {
    const intl = {
      formatDate: value => `formatted ${value}`,
    };

    it('should call intl.formatDate', function test() {
      formatTimestamp('2017-01-04T05:20:36.377Z', { intl }).should
        .equal('formatted 2017-01-04T05:20:36.377Z');
    });
  });
});
