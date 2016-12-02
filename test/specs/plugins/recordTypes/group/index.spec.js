import groupRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/group';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('group record plugin', function suite() {
  const config = {};
  const groupRecordTypePlugin = groupRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = groupRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('group');

    const groupRecordTypeConfig = recordTypes.group;

    groupRecordTypeConfig.should.have.property('messageDescriptors').that.is.an('object');
    groupRecordTypeConfig.should.have.property('serviceConfig').that.is.an('object');
    groupRecordTypeConfig.should.have.property('title').that.is.a('function');
    groupRecordTypeConfig.should.have.property('forms').that.is.an('object');
  });
});
