import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/objectexit/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('object exit record title', function suite() {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the exit number and current owner', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:objectexit_common': {
          exitNumber: 'EX.2017.2',
          currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('EX.2017.2 – David Bowie');
  });

  it('should return the exit number when current owner is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:objectexit_common': {
          exitNumber: 'EX.2017.2',
          currentOwner: '',
        },
      },
    });

    title(data).should.equal('EX.2017.2');
  });

  // This should never happen since the exit number is required, but just in case...
  // TODO test to ensure that required fields are never empty
  it('should return the current owner when exit number is empty', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:objectexit_common': {
          exitNumber: '',
          currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
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
        'ns2:objectexit_extension': {
          exitNumber: 'EX.2017.2',
          currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('');
  });
});
