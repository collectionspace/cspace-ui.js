import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/person/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('person record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should return the primary display name', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:persons_common': {
        personTermGroupList: {
          personTermGroup: [{
            termDisplayName: 'Primary Display Name',
          }, {
            termDisplayName: 'Alternate Display Name',
          }],
        },
      },
    });

    title(cspaceDocument).should.equal('Primary Display Name');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:persons_extension': {
        foo: 'bar',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
