import columns from '../../../../../src/plugins/recordTypes/movement/columns';

chai.should();

describe('movement record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have current location column that is formatted as a refname display name', function test() {
    const currentLocationColumn = columns.default.find(column => column.name === 'currentLocation');

    currentLocationColumn.should.have.property('formatValue').that.is.a('function');

    currentLocationColumn.formatValue('urn:cspace:core.collectionspace.org:locationauthorities:name(location):item:name(Room2001506471267707)\'Room 200\'').should
      .equal('Room 200');
  });
});
