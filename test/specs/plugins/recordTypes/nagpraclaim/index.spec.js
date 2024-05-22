import nagpraclaimRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/nagpraclaim';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagpraclaim record plugin', () => {
  const config = {};
  const nagpraclaimRecordTypePlugin = nagpraclaimRecordTypePluginFactory(config);
  const configContext = createConfigContext(nagpraclaimRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = nagpraclaimRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('nagpraclaim');

    const nagpraclaimRecordType = recordTypes.nagpraclaim;

    nagpraclaimRecordType.should.have.property('title').that.is.a('function');
    nagpraclaimRecordType.should.have.property('forms').that.is.an('object');
    nagpraclaimRecordType.should.have.property('messages').that.is.an('object');
    nagpraclaimRecordType.should.have.property('serviceConfig').that.is.an('object');

    nagpraclaimRecordType.title().should.be.a('string');
  });
});
