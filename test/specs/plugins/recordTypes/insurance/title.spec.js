import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/insurance/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('insurance record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the reference number and the insurer', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:insurances_common': {
          insuranceIndemnityReferenceNumber: 'II2021.1',
          insurerIndemnifier: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Insuere Indemnifier)\'Insurer Indemnifier\'',
        },
      },
    });

    title(data).should.equal('II2021.1 – Insurer Indemnifier');
  });

  it('should return the reference number when the title is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:insurances_common': {
          insuranceIndemnityReferenceNumber: 'II2021.1',
          insurerIndemnifier: '',
        },
      },
    });

    title(data).should.equal('II2021.1');
  });

  it('should return the insurer when the reference number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:insurances_common': {
          insuranceIndemnityReferenceNumber: '',
          insurerIndemnifier: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Insuere Indemnifier)\'Insurer Indemnifier\'',
        },
      },
    });

    title(data).should.equal('Insurer Indemnifier');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      data: {
        'ns2:insurances_extension': {
          insuranceIndemnityReferenceNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
