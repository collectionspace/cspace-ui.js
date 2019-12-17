import conservationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/conservation';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('conservation record plugin', () => {
  const config = {};
  const conservationRecordTypePlugin = conservationRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = conservationRecordTypePlugin(configContext);

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
