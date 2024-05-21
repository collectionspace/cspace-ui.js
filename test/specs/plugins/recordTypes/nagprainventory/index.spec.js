import nagpraInventoryRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/nagprainventory';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagprainventory record plugin', () => {
  const config = {};
  const nagpraInventoryRecordTypePlugin = nagpraInventoryRecordTypePluginFactory(config);
  const configContext = createConfigContext(nagpraInventoryRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = nagpraInventoryRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('nagprainventory');

    const nagpraInventoryRecordType = recordTypes.nagprainventory;

    nagpraInventoryRecordType.should.have.property('title').that.is.a('function');
    nagpraInventoryRecordType.should.have.property('fields').that.is.an('object');
    nagpraInventoryRecordType.should.have.property('forms').that.is.an('object');
    nagpraInventoryRecordType.should.have.property('columns').that.is.an('object');
    nagpraInventoryRecordType.should.have.property('messages').that.is.an('object');
    nagpraInventoryRecordType.should.have.property('serviceConfig').that.is.an('object');
    nagpraInventoryRecordType.should.have.property('advancedSearch').that.is.an('object');

    nagpraInventoryRecordType.title().should.be.a('string');
  });
});
