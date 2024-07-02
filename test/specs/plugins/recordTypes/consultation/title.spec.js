import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/consultation/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('consultation record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the consultation number and ? when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:consultations_common': {
          consultationNumber: 'CN',
          partiesInvolvedGroupList: {
            partiesInvolvedGroup: {
              involvedParty: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Party)\'Party\'',
              involvedOnBehalfOf: 'urn:cspace:core.collectionspace.org:orgauthorities:name(organization):item:name(OnBehalfOf)\'OnBehalfOf\'',
            },
          },
        },
      },
    });

    title(data).should.equal('CN – Party');
  });

  it('should return the consultation number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:consultations_common': {
          consultationNumber: 'CN',
        },
      },
    });

    title(data).should.equal('CN');
  });

  it('should return the ? only when the consultation number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:consultations_common': {
          partiesInvolvedGroupList: {
            partiesInvolvedGroup: {
              involvedParty: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Party)\'Party\'',
              involvedOnBehalfOf: 'urn:cspace:core.collectionspace.org:orgauthorities:name(organization):item:name(OnBehalfOf)\'OnBehalfOf\'',
            },
          },
        },
      },
    });

    title(data).should.equal('Party');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:consultations_extension': {
          consultationAltTitle: 'Alt title',
        },
      },
    });

    title(data).should.equal('');
  });
});
