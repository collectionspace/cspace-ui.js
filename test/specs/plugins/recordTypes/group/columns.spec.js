import columns from '../../../../../src/plugins/recordTypes/group/columns';

chai.should();

describe('group record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have owner column that is formatted as a refname display name', function test() {
    const ownerColumn = columns.default.find(column => column.name === 'owner');

    ownerColumn.should.have.property('formatValue').that.is.a('function');

    ownerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
