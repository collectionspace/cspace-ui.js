import conservationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/conservation';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('conservation record plugin', function suite() {
  const config = {};
  const conservationRecordTypePlugin = conservationRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = conservationRecordTypePlugin(pluginContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('conservation');

    const conservationRecordTypes = recordTypes.conservation;

    conservationRecordTypes.should.have.property('messages').that.is.an('object');
    conservationRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    conservationRecordTypes.should.have.property('title').that.is.a('function');
    conservationRecordTypes.should.have.property('forms').that.is.a('object');
    conservationRecordTypes.should.have.property('fields').that.is.a('object');
    conservationRecordTypes.should.have.property('columns').that.is.an('object');
    conservationRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
