import conditionCheckRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/conditioncheck';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('condition check record plugin', function suite() {
  const config = {};
  const conditionCheckRecordTypePlugin = conditionCheckRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = conditionCheckRecordTypePlugin(pluginContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');
    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('conditioncheck');

    const conditionCheckRecordTypes = recordTypes.conditioncheck;

    conditionCheckRecordTypes.should.have.property('messages').that.is.an('object');
    conditionCheckRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    conditionCheckRecordTypes.should.have.property('title').that.is.a('function');
    conditionCheckRecordTypes.should.have.property('forms').that.is.a('object');
    conditionCheckRecordTypes.should.have.property('fields').that.is.a('object');
    conditionCheckRecordTypes.should.have.property('columns').that.is.an('object');
    conditionCheckRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
