import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/nagpraclaim/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagpraclaim record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the claim number and title when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagpraclaims_common': {
          claimNumber: 'NCL',
          claimTitle: 'Title',
        },
      },
    });

    title(data).should.equal('NCL – Title');
  });

  it('should return the claim number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagpraclaims_common': {
          claimNumber: 'NCL',
        },
      },
    });

    title(data).should.equal('NCL');
  });

  it('should return the title only when the claim number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagpraclaims_common': {
          claimTitle: 'Title',
        },
      },
    });

    title(data).should.equal('Title');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:nagpraclaims_extension': {
          nagpraclaimAltTitle: 'Alt claim title',
        },
      },
    });

    title(data).should.equal('');
  });
});
