import createColumns from '../../../../../src/plugins/recordTypes/group/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('group record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have owner column that is formatted as a refname display name', function test() {
    const ownerColumn = columns.default.owner;

    ownerColumn.should.have.property('formatValue').that.is.a('function');

    ownerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
