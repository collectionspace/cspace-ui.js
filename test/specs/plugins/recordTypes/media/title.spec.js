import createTitleGetter from '../../../../../src/plugins/recordTypes/media/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('media record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should compute the title', function test() {
    title().should.equal('');
  });
});
