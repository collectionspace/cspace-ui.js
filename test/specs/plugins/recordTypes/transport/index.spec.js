import transportRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/transport';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('transport record plugin', () => {
  const config = {};
  const transportRecordTypePlugin = transportRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = transportRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('transport');

    const transportRecordTypes = recordTypes.transport;

    transportRecordTypes.should.have.property('messages').that.is.an('object');
    transportRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    transportRecordTypes.should.have.property('title').that.is.a('function');
    transportRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
