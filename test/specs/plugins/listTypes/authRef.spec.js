import Immutable from 'immutable';
import authRefListTypePlugin from '../../../../src/plugins/listTypes/authRef';

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

const perms = Immutable.fromJS({
  person: {
    data: 'CRUDL',
  },
});

const permsNone = Immutable.fromJS({
  person: {
    data: '',
  },
});

describe('auth ref list type', function suite() {
  const configContribution = authRefListTypePlugin();
  const { listTypes } = configContribution;
  const authRefList = listTypes.authRef;

  describe('getItemLocationPath', function funcSuite() {
    it('should compute the location from the refName and csid', function test() {
      authRefList.getItemLocationPath(Immutable.fromJS({
        csid: '1234',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      }), { config, perms }).should.equal('/record/person/local/1234');
    });

    it('should return null if read permission does not exist for the record type', function test() {
      expect(authRefList.getItemLocationPath(Immutable.fromJS({
        csid: '1234',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      }), { config, perms: permsNone })).to.equal(null);
    });

    it('should return null for an unknown record type', function test() {
      expect(authRefList.getItemLocationPath(Immutable.fromJS({
        csid: '1234',
        refName: 'urn:cspace:core.collectionspace.org:foobar:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      }), { config })).to.equal(null);
    });
  });
});
