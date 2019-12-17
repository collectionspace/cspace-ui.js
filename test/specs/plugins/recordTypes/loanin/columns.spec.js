import createColumns from '../../../../../src/plugins/recordTypes/loanin/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('loan-in record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have lender column that is formatted as a refname display name', () => {
    const lenderColumn = columns.default.lender;

    lenderColumn.should.have.property('formatValue').that.is.a('function');

    lenderColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
