import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/location/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('location record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should return the primary display name', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:locations_common': {
          locTermGroupList: {
            locTermGroup: [{
              termDisplayName: 'Primary Display Name',
            }, {
              termDisplayName: 'Alternate Display Name',
            }],
          },
        },
      },
    });

    title(data).should.equal('Primary Display Name');
  });

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:locations_extension': {
          foo: 'bar',
        },
      },
    });

    title(data).should.equal('');
  });
});
