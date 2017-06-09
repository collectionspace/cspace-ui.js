import columns from '../../../../../src/plugins/recordTypes/loanin/columns';

chai.should();

describe('loan-in record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have lender column that is formatted as a refname display name', function test() {
    const lenderColumn = columns.default.find(column => column.name === 'lender');

    lenderColumn.should.have.property('formatValue').that.is.a('function');

    lenderColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
