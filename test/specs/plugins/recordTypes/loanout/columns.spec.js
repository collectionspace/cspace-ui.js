import createColumns from '../../../../../src/plugins/recordTypes/loanout/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('loanout record columns', function suite() {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have borrower column that is formatted as a refname display name', function test() {
    const borrowerColumn = columns.default.borrower;

    borrowerColumn.should.have.property('formatValue').that.is.a('function');

    borrowerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
