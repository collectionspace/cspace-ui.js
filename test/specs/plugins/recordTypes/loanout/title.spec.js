import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/loanout/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('loanout record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the loan-out number and borrower', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansout_common': {
          loanOutNumber: 'LO.2017.2',
          borrower: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('LO.2017.2 – David Bowie');
  });

  it('should return the loan-out number when borrower is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansout_common': {
          loanOutNumber: 'LO.2017.2',
          borrower: '',
        },
      },
    });

    title(data).should.equal('LO.2017.2');
  });

  it('should return the borrower when loan-out number is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansout_common': {
          loanOutNumber: '',
          borrower: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('David Bowie');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:loansout_extension': {
          loanOutNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
