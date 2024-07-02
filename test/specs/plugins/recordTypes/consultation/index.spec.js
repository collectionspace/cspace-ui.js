import consultationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/consultation';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('consultation record plugin', () => {
  const config = {};
  const consultationRecordTypePlugin = consultationRecordTypePluginFactory(config);
  const configContext = createConfigContext(consultationRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = consultationRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('consultation');

    const consultationRecordType = recordTypes.consultation;

    consultationRecordType.should.have.property('title').that.is.a('function');
    consultationRecordType.should.have.property('forms').that.is.an('object');
    consultationRecordType.should.have.property('messages').that.is.an('object');
    consultationRecordType.should.have.property('serviceConfig').that.is.an('object');

    consultationRecordType.title().should.be.a('string');
  });
});
