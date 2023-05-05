import chronologyRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/chronology';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('chronology record plugin', () => {
  const config = {};
  const chronologyRecordTypePlugin = chronologyRecordTypePluginFactory(config);
  const configContext = createConfigContext(chronologyRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = chronologyRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('chronology');

    const chronologyRecordType = recordTypes.chronology;

    chronologyRecordType.should.have.property('title').that.is.a('function');
    chronologyRecordType.should.have.property('forms').that.is.an('object');
    chronologyRecordType.should.have.property('messages').that.is.an('object');
    chronologyRecordType.should.have.property('serviceConfig').that.is.an('object');

    chronologyRecordType.title().should.be.a('string');
    chronologyRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
