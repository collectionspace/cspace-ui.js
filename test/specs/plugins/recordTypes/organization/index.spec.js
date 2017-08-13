import organizationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/organization';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('organization record plugin', function suite() {
  const config = {};
  const organizationRecordTypePlugin = organizationRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = organizationRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('organization');

    const organizationRecordType = recordTypes.organization;

    organizationRecordType.should.have.property('messages').that.is.an('object');
    organizationRecordType.should.have.property('serviceConfig').that.is.an('object');
    organizationRecordType.should.have.property('title').that.is.a('function');
    organizationRecordType.should.have.property('forms').that.is.an('object');

    organizationRecordType.title().should.be.a('string');
    organizationRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
