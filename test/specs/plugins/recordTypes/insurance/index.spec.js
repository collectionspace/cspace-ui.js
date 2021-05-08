import insuranceRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/insurance';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('insurance record plugin', () => {
  const config = {};
  const insuranceRecordTypePlugin = insuranceRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = insuranceRecordTypePlugin(configContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('insurance');

    const insuranceRecordTypes = recordTypes.insurance;

    insuranceRecordTypes.should.have.property('messages').that.is.an('object');
    insuranceRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    insuranceRecordTypes.should.have.property('title').that.is.a('function');
    insuranceRecordTypes.should.have.property('forms').that.is.a('object');
    insuranceRecordTypes.should.have.property('fields').that.is.a('object');
    insuranceRecordTypes.should.have.property('columns').that.is.an('object');
    insuranceRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
