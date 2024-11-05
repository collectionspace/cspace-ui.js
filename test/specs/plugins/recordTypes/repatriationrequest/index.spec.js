import repatriationrequestRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/repatriationrequest';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('repatriationrequest record plugin', () => {
  const config = {};
  const repatriationrequestRecordTypePlugin = repatriationrequestRecordTypePluginFactory(config);
  const configContext = createConfigContext(repatriationrequestRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = repatriationrequestRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('repatriationrequest');

    const repatriationrequestRecordType = recordTypes.repatriationrequest;

    repatriationrequestRecordType.should.have.property('title').that.is.a('function');
    repatriationrequestRecordType.should.have.property('forms').that.is.an('object');
    repatriationrequestRecordType.should.have.property('messages').that.is.an('object');
    repatriationrequestRecordType.should.have.property('serviceConfig').that.is.an('object');

    repatriationrequestRecordType.title().should.be.a('string');
  });
});
