import Immutable from 'immutable';
import commonListTypePlugin from '../../../../src/plugins/listTypes/common';

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

describe('common list type', function suite() {
  const configContribution = commonListTypePlugin();
  const { listTypes } = configContribution;
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
