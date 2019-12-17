import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/loanin/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('loan-in record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the loan-in number and lender', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansin_common': {
          loanInNumber: 'LI.2017.2',
          lenderGroupList: {
            lenderGroup: [{
              lender: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
            }, {
              lender: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(BruceSpringsteen1480570017652)\'Bruce Springsteen\'',
            }],
          },
        },
      },
    });

    title(data).should.equal('LI.2017.2 – David Bowie');
  });

  it('should return the loan-in number when lender is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansin_common': {
          loanInNumber: 'LI.2017.2',
          lenderGroupList: {},
        },
      },
    });

    title(data).should.equal('LI.2017.2');
  });

  it('should return the lender when loan-in number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansin_common': {
          loanInNumber: '',
          lenderGroupList: {
            lenderGroup: [{
              lender: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
            }, {
              lender: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(BruceSpringsteen1480570017652)\'Bruce Springsteen\'',
            }],
          },
        },
      },
    });

    title(data).should.equal('David Bowie');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansout_extension': {
          loanInNumber: 'Something',
          lenderGroupList: {},
        },
      },
    });

    title(data).should.equal('');
  });
});
