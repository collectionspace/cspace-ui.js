import organizationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/organization';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('organization record plugin', function suite() {
  const config = {};
  const organizationRecordTypePlugin = organizationRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = organizationRecordTypePlugin(configContext);

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
