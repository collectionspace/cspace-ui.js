import columns from '../../../../../src/plugins/recordTypes/loanout/columns';

chai.should();

describe('loanout record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have borrower column that is formatted as a refname display name', function test() {
    const borrowerColumn = columns.default.find(column => column.name === 'borrower');

    borrowerColumn.should.have.property('formatValue').that.is.a('function');

    borrowerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
