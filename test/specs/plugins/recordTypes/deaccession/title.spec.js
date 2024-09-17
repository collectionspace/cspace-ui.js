import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/deaccession/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('deaccession record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the deaccession number and deaccession approval individual when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          deaccessionNumber: 'DE',
          deaccessionApprovalGroupList: {
            deaccessionApprovalGroup: [{
              deaccessionApprovalIndividual: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Party)\'Party\'',
            }, {
              deaccessionApprovalIndividual: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(OtherParty)\'OtherParty\'',
            }],
          },
        },
      },
    });

    title(data).should.equal('DE – Party');
  });

  it('should return the deaccession number only when the deaccession approval individual is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          deaccessionNumber: 'DE',
        },
      },
    });

    title(data).should.equal('DE');
  });

  it('should return the deaccession approval individual only when the deaccession number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:deaccessions_common': {
          deaccessionApprovalGroupList: {
            deaccessionApprovalGroup: [{
              deaccessionApprovalIndividual: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Party)\'Party\'',
            }, {
              deaccessionApprovalIndividual: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(OtherParty)\'OtherParty\'',
            }],
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
        'ns2:deaccessions_extension': {
          deaccessionAltTitle: 'Alt deaccession title',
        },
      },
    });

    title(data).should.equal('');
  });
});
