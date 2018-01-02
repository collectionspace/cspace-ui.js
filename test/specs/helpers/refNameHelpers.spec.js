import {
  refNameToCsid,
  getRecordType,
  getVocabulary,
  refNameToUrl,
} from '../../../src/helpers/refNameHelpers';

const expect = chai.expect;

chai.should();

describe('refNameHelpers', function moduleSuite() {
  const config = {
    recordTypes: {
      collectionobject: {
        name: 'collectionobject',
        serviceConfig: {
          servicePath: 'collectionobjects',
        },
      },
      person: {
        name: 'person',
        serviceConfig: {
          servicePath: 'personauthorities',
        },
        vocabularies: {
          local: {
            name: 'local',
            serviceConfig: {
              servicePath: 'urn:cspace:name(person)',
            },
          },
        },
      },
    },
  };

  describe('getRecordType', function suite() {
    it('should return the record type name from the ref name', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      getRecordType(config, refName).should.equal('person');
    });

    it('should return null if no known record type is found in the ref name', function test() {
      expect(getRecordType('foo')).to.equal(null);
    });

    it('should return null if no ref name is supplied', function test() {
      expect(getRecordType(config)).to.equal(null);
    });
  });

  describe('getVocablary', function suite() {
    it('should return the vocabulary name from the ref name', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      getVocabulary(config, refName).should.equal('local');
    });

    it('should return null if no known vocabulary is found in the ref name', function test() {
      expect(getVocabulary('foo')).to.equal(null);
    });

    it('should return null if no ref name is supplied', function test() {
      expect(getVocabulary(config)).to.equal(null);
    });
  });

  describe('refNameToCsid', function suite() {
    it('should return a csid for a ref name that contains a short id', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      refNameToCsid(refName).should.equal('urn:cspace:name(JaneDoe1484001439799)');
    });

    it('should return the csid for a ref name that contains a csid', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:collectionobjects:id(d9968be7-83a2-4a94-af45)\'LI2017.1.17\'';

      refNameToCsid(refName).should.equal('d9968be7-83a2-4a94-af45');
    });

    it('should return null if no short id or csid are found in the ref name', function test() {
      expect(refNameToCsid('foo')).to.equal(null);
    });

    it('should return null if no ref name is supplied', function test() {
      expect(refNameToCsid()).to.equal(null);
    });
  });

  describe('refNameToUrl', function suite() {
    it('should return the url to the record described by the ref name', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      refNameToUrl(config, refName).should.equal('/record/person/local/urn:cspace:name(JaneDoe1484001439799)');
    });

    it('should return the url for a ref name that contains a csid', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:collectionobjects:id(34ef5de3-7120-4c80-bd31)\'An object\'';

      refNameToUrl(config, refName).should.equal('/record/collectionobject/34ef5de3-7120-4c80-bd31');
    });

    it('should return null if the ref name contains an unknown record type', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:foobar:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      expect(refNameToUrl(config, refName)).to.equal(null);
    });

    it('should return null if the ref name contains an unknown vocabulary', function test() {
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(foobar):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      expect(refNameToUrl(config, refName)).to.equal(null);
    });

    it('should return null if no ref name is supplied', function test() {
      expect(refNameToUrl(config)).to.equal(null);
    });
  });
});
