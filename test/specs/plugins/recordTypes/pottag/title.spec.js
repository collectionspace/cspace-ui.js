import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/pottag/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('pot tag record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the common name and family', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:pottags_common': {
        commonName: 'Rose',
        family: 'urn:cspace:botgarden.collectionspace.org:taxonomyauthority:name(taxon):item:name(PTFamily1501262583720)\'PTFamily\'',
      },
    });
    title(cspaceDocument).should.equal('Rose – PTFamily');
  });

  it('should return the common name when family field is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:pottags_common': {
        commonName: 'Rose',
        family: '',
      },
    });

    title(cspaceDocument).should.equal('Rose');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:pottags_extension': {
        commonName: 'Something',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
