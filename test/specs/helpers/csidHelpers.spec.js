import {
  asKeywords,
  getUrnCsidShortId,
  isCsid,
  isUrnCsid,
} from '../../../src/helpers/csidHelpers';

describe('csidHelpers', () => {
  describe('isCsid', () => {
    it('should recognize short csids', () => {
      isCsid('6f53c229-721d-418d-94c2').should.equal(true);
    });

    it('should recognize long csids', () => {
      isCsid('f47ac10b-58cc-4372-a567-0e02b2c3d479').should.equal(true);
    });

    it('should return false for non-csids', () => {
      isCsid('foo').should.equal(false);
      isCsid('urn:cspace:name(OliviaOwner1484269000345').should.equal(false);

      isCsid('urn:cspace:pahma.cspace.berkeley.edu:groups:id(4ece8f1a-8788-4853-921c)').should
        .equal(false);
    });
  });

  describe('isUrnCsid', () => {
    it('should recognize urn csids', () => {
      isUrnCsid('urn:cspace:name(OliviaOwner1484269000345)').should.equal(true);
    });

    it('should return false for non-urn csids', () => {
      isUrnCsid('4ece8f1a-8788-4853-921c').should.equal(false);
    });

    it('should return false for non-csids', () => {
      isUrnCsid('foo').should.equal(false);
    });
  });

  describe('getUrnCsidShortId', () => {
    it('should return the short id from a urn csid', () => {
      getUrnCsidShortId('urn:cspace:name(OliviaOwner1484269000345)').should
        .equal('OliviaOwner1484269000345');
    });
  });

  describe('asKeywords', () => {
    it('should convert dashes to spaces and add quotes', () => {
      asKeywords('6f53c229-721d-418d-94c2').should.equal('"6f53c229 721d 418d 94c2"');
    });
  });
});
