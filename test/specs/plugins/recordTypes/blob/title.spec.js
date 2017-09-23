import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/blob/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('blob record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should return the name', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:blobs_common': {
        name: 'foo.jpg',
      },
    });

    title(cspaceDocument).should.equal('foo.jpg');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:blob_extension': {
        foo: 'bar',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
