import createColumns from '../../../../../src/plugins/recordTypes/acquisition/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('acquisition record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have acquisition source column that is formatted as a refname display name', () => {
    const acquisitionSourceColumn = columns.default.acquisitionSource;

    acquisitionSourceColumn.should.have.property('formatValue').that.is.a('function');

    acquisitionSourceColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
