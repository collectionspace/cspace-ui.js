import groupRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/group';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('group record plugin', function suite() {
  const config = {};
  const groupRecordTypePlugin = groupRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = groupRecordTypePlugin(configContext);

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
