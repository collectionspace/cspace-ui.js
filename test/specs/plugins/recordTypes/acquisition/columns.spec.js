import createColumns from '../../../../../src/plugins/recordTypes/acquisition/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('acquisition record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have acquisition source column that is formatted as a refname display name', function test() {
    const acquisitionSourceColumn = columns.default.acquisitionSource;

    acquisitionSourceColumn.should.have.property('formatValue').that.is.a('function');

    acquisitionSourceColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
