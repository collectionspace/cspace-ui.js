import deaccessionRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/deaccession';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('deaccession record plugin', () => {
  const config = {};
  const deaccessionRecordTypePlugin = deaccessionRecordTypePluginFactory(config);
  const configContext = createConfigContext(deaccessionRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = deaccessionRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('deaccession');

    const deaccessionRecordType = recordTypes.deaccession;

    deaccessionRecordType.should.have.property('title').that.is.a('function');
    deaccessionRecordType.should.have.property('forms').that.is.an('object');
    deaccessionRecordType.should.have.property('messages').that.is.an('object');
    deaccessionRecordType.should.have.property('serviceConfig').that.is.an('object');

    deaccessionRecordType.title().should.be.a('string');
  });
});
