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

    const groupRecordTypes = recordTypes.group;

    groupRecordTypes.should.have.property('messages').that.is.an('object');
    groupRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    groupRecordTypes.should.have.property('title').that.is.a('function');
    groupRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
