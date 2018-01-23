import createColumns from '../../../../../src/plugins/recordTypes/exhibition/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('exhibition record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });
});
