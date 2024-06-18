import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/heldintrust/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('heldintrust record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the Held-in-Trust number and the depositor', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:heldintrusts_common': {
          heldInTrustNumber: 'HIT2023.1',
          owners: {
            owner: [
              'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Depositor)\'Depositor\'',
            ],
          },
        },
      },
    });

    title(data).should.equal('HIT2023.1 – Depositor');
  });

  it('should return the Held-in-Trust number when the depositor is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:heldintrusts_common': {
          heldInTrustNumber: 'HIT2023.1',
          owners: {
            owner: [],
          },
        },
      },
    });

    title(data).should.equal('HIT2023.1');
  });

  it('should return the depositor when the Held-in-Trust number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:heldintrusts_common': {
          heldInTrustNumber: '',
          owners: {
            owner: ['urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Depositor)\'Depositor\''],
          },
        },
      },
    });

    title(data).should.equal('Depositor');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      data: {
        'ns2:heldintrusts_extension': {
          heldInTrustNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
