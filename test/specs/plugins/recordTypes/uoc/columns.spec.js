import createColumns from '../../../../../src/plugins/recordTypes/uoc/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('uoc record columns', function suite() {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have authorizedBy column that is formatted as a refname display name', function test() {
    const authorizedByColumn = columns.default.authorizedBy;

    authorizedByColumn.should.have.property('formatValue').that.is.a('function');

    authorizedByColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
