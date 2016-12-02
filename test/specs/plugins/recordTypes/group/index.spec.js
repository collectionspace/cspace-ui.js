import objectRecordPluginFactory from '../../../../../src/plugins/recordTypes/group';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('group record plugin', function suite() {
  const config = {};
  const objectRecordPlugin = objectRecordPluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = objectRecordPlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('group');

    const objectTypeConfig = recordTypes.group;

    objectTypeConfig.should.have.property('messageDescriptors').that.is.an('object');
    objectTypeConfig.should.have.property('serviceConfig').that.is.an('object');
    objectTypeConfig.should.have.property('title').that.is.a('function');
    objectTypeConfig.should.have.property('forms').that.is.an('object');
  });
});
