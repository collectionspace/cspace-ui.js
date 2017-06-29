import columns from '../../../../../src/plugins/recordTypes/acquisition/columns';

chai.should();

describe('acquisition record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have acquisition source column that is formatted as a refname display name', function test() {
    const acquisitionSourceColumn = columns.default.find(column => column.name === 'acquisitionSource');

    acquisitionSourceColumn.should.have.property('formatValue').that.is.a('function');

    acquisitionSourceColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
