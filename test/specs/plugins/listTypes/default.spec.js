import Immutable from 'immutable';
import defaultListTypesPlugin from '../../../../src/plugins/listTypes/default';

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {
    group: {
      name: 'group',
      serviceConfig: {
        objectName: 'Group',
      },
    },
    collectionobject: {
      name: 'collectionobject',
      serviceConfig: {
        objectName: 'CollectionObject',
        servicePath: 'collectionobjects',
      },
    },
    person: {
      name: 'person',
      serviceConfig: {
        objectName: 'Person',
        servicePath: 'personauthorities',
        serviceType: 'authority',
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

describe('default list types', function suite() {
  const configContribution = defaultListTypesPlugin();
  const { listTypes } = configContribution;

  describe('common list', function typeSuite() {
    const commonList = listTypes.common;

    describe('getItemLocationPath', function funcSuite() {
      it('should compute the location from the docType and csid', function test() {
        commonList.getItemLocationPath(Immutable.fromJS({
          docType: 'CollectionObject',
          csid: '1234',
        }), { config }).should.equal('/record/collectionobject/1234');
      });

      it('should include the vocabulary path', function test() {
        commonList.getItemLocationPath(Immutable.fromJS({
          docType: 'Person',
          csid: '1234',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(TestPerson1485582296109)\'Test Person\'',
        }), { config }).should.equal('/record/person/local/1234');
      });

      it('should fall back to the record type from the search descriptor if there is no docType', function test() {
        const searchDescriptor = Immutable.Map({
          recordType: 'group',
        });

        commonList.getItemLocationPath(Immutable.fromJS({
          csid: '1234',
        }), { config, searchDescriptor }).should.equal('/record/group/1234');
      });

      it('should return null for an unknown record type', function test() {
        const searchDescriptor = Immutable.Map();

        expect(commonList.getItemLocationPath(Immutable.fromJS({
          docType: 'foo',
          csid: '1234',
        }), { config, searchDescriptor })).to.equal(null);
      });
    });
  });

  describe('auth ref list', function typeSuite() {
    const authRefList = listTypes.authRef;

    describe('getItemLocationPath', function funcSuite() {
      it('should compute the location from the refName and csid', function test() {
        authRefList.getItemLocationPath(Immutable.fromJS({
          csid: '1234',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
        }), { config }).should.equal('/record/person/local/1234');
      });

      it('should return null for an unknown record type', function test() {
        expect(authRefList.getItemLocationPath(Immutable.fromJS({
          csid: '1234',
          refName: 'urn:cspace:core.collectionspace.org:foobar:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
        }), { config })).to.equal(null);
      });
    });
  });


  describe('ref doc list', function typeSuite() {
    const refDocList = listTypes.refDoc;

    describe('getItemLocationPath', function funcSuite() {
      it('should compute the location from the refName and docId', function test() {
        refDocList.getItemLocationPath(Immutable.fromJS({
          docId: 'ea399d7a-7ea3-4670-930b',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(ea399d7a-7ea3-4670-930b)\'4\'',
        }), { config }).should.equal('/record/collectionobject/ea399d7a-7ea3-4670-930b');
      });

      it('should compute the location for authority items', function test() {
        refDocList.getItemLocationPath(Immutable.fromJS({
          docId: 'ca85dc9c-cd81-4934-9b37',
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
        }), { config }).should.equal('/record/person/local/ca85dc9c-cd81-4934-9b37');
      });

      it('should return null for an unknown record type', function test() {
        expect(refDocList.getItemLocationPath(Immutable.fromJS({
          docId: 'ca85dc9c-cd81-4934-9b37',
          refName: 'urn:cspace:core.collectionspace.org:foobar:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
        }), { config })).to.equal(null);
      });
    });
  });
});
