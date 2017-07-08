import columns from '../../../../../src/plugins/recordTypes/objectexit/columns';

chai.should();

describe('object exit record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have current owner column that is formatted as a refname display name', function test() {
  	const currentOwnerColumn = columns.default.find(column => column.name === 'currentOwner');

    currentOwnerColumn.should.have.property('formatValue').that.is.a('function');

    currentOwnerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
