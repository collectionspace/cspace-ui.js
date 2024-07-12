import repatriationclaimRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/repatriationclaim';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('repatriationclaim record plugin', () => {
  const config = {};
  const repatriationclaimRecordTypePlugin = repatriationclaimRecordTypePluginFactory(config);
  const configContext = createConfigContext(repatriationclaimRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = repatriationclaimRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('repatriationclaim');

    const repatriationclaimRecordType = recordTypes.repatriationclaim;

    repatriationclaimRecordType.should.have.property('title').that.is.a('function');
    repatriationclaimRecordType.should.have.property('forms').that.is.an('object');
    repatriationclaimRecordType.should.have.property('messages').that.is.an('object');
    repatriationclaimRecordType.should.have.property('serviceConfig').that.is.an('object');

    repatriationclaimRecordType.title().should.be.a('string');
  });
});
