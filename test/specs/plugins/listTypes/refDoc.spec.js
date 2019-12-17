import Immutable from 'immutable';
import refDocListTypePlugin from '../../../../src/plugins/listTypes/refDoc';

const { expect } = chai;

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

describe('ref doc list type', () => {
  const configContribution = refDocListTypePlugin();
  const { listTypes } = configContribution;
  const refDocList = listTypes.refDoc;

  describe('getItemLocationPath', () => {
    it('should compute the location from the refName and docId', () => {
      refDocList.getItemLocationPath(Immutable.fromJS({
        docId: 'ea399d7a-7ea3-4670-930b',
        refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(ea399d7a-7ea3-4670-930b)\'4\'',
      }), { config }).should.equal('/record/collectionobject/ea399d7a-7ea3-4670-930b');
    });

    it('should compute the location for authority items', () => {
      refDocList.getItemLocationPath(Immutable.fromJS({
        docId: 'ca85dc9c-cd81-4934-9b37',
        refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      }), { config }).should.equal('/record/person/local/ca85dc9c-cd81-4934-9b37');
    });

    it('should return null for an unknown record type', () => {
      expect(refDocList.getItemLocationPath(Immutable.fromJS({
        docId: 'ca85dc9c-cd81-4934-9b37',
        refName: 'urn:cspace:core.collectionspace.org:foobar:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      }), { config })).to.equal(null);
    });
  });
});
