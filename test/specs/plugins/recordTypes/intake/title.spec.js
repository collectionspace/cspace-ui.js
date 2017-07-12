import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/intake/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('intake record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the intake entry number and current owner', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:intakes_common': {
        entryNumber: 'IN.2017.2',
        currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
      },
    });
    title(cspaceDocument).should.equal('IN.2017.2 – David Bowie');
  });

  it('should return the intake entry number when current owner is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:intakes_common': {
        entryNumber: 'IN.2017.2',
        currentOwner: '',
      },
    });

    title(cspaceDocument).should.equal('IN.2017.2');
  });

  it('should return the current owner when intake entry number is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:intakes_common': {
        entryNumber: '',
        currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
      },
    });
    title(cspaceDocument).should.equal('David Bowie');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:intakes_extension': {
        entryNumber: 'IN.2017.2',
        currentOwner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
