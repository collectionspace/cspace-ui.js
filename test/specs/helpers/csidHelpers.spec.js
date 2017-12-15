import {
  asKeywords,
  getUrnCsidShortId,
  isCsid,
  isUrnCsid,
} from '../../../src/helpers/csidHelpers';

describe('csidHelpers', function moduleSuite() {
  describe('isCsid', function suite() {
    it('should recognize short csids', function test() {
      isCsid('6f53c229-721d-418d-94c2').should.equal(true);
    });

    it('should recognize long csids', function test() {
      isCsid('f47ac10b-58cc-4372-a567-0e02b2c3d479').should.equal(true);
    });

    it('should return false for non-csids', function test() {
      isCsid('foo').should.equal(false);
      isCsid('urn:cspace:name(OliviaOwner1484269000345').should.equal(false);

      isCsid('urn:cspace:pahma.cspace.berkeley.edu:groups:id(4ece8f1a-8788-4853-921c)').should
        .equal(false);
    });
  });

  describe('isUrnCsid', function suite() {
    it('should recognize urn csids', function test() {
      isUrnCsid('urn:cspace:name(OliviaOwner1484269000345)').should.equal(true);
    });

    it('should return false for non-urn csids', function test() {
      isUrnCsid('4ece8f1a-8788-4853-921c').should.equal(false);
    });

    it('should return false for non-csids', function test() {
      isUrnCsid('foo').should.equal(false);
    });
  });

  describe('getUrnCsidShortId', function suite() {
    it('should return the short id from a urn csid', function test() {
      getUrnCsidShortId('urn:cspace:name(OliviaOwner1484269000345)').should
        .equal('OliviaOwner1484269000345');
    });
  });

  describe('asKeywords', function suite() {
    it('should convert dashes to spaces and add quotes', function test() {
      asKeywords('6f53c229-721d-418d-94c2').should.equal('"6f53c229 721d 418d 94c2"');
    });
  });
});
