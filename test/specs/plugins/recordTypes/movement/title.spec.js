import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/movement/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('movement record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the current location and location date', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:movements_common': {
        currentLocation: 'urn:cspace:core.collectionspace.org:locationauthorities:name(location):item:name(Room2001506471267707)\'Room 200\'',
        locationDate: '2017-09-26T00:00:00.000Z',
      },
    });

    title(cspaceDocument).should.equal('Room 200 – 2017-09-26');
  });

  it('should return the current location when location date is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:movements_common': {
        currentLocation: 'urn:cspace:core.collectionspace.org:locationauthorities:name(location):item:name(Room2001506471267707)\'Room 200\'',
      },
    });

    title(cspaceDocument).should.equal('Room 200');
  });

  it('should return the location date when current location is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:movements_common': {
        locationDate: '2017-09-26T00:00:00.000Z',
      },
    });

    title(cspaceDocument).should.equal('2017-09-26');
  });

  it('should return the location date when it does not have a time part', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:movements_common': {
        locationDate: '2017-09-26',
      },
    });

    title(cspaceDocument).should.equal('2017-09-26');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:movements_extension': {
        foo: 'bar',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
