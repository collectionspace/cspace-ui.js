import objectexitRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/objectexit';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('object exit record plugin', function suite() {
  const config = {};
  const objectexitRecordTypePlugin = objectexitRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = objectexitRecordTypePlugin(pluginContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');
    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('objectexit');

    const objectexitRecordTypes = recordTypes.objectexit;

    objectexitRecordTypes.should.have.property('messages').that.is.an('object');
    objectexitRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    objectexitRecordTypes.should.have.property('title').that.is.a('function');
    objectexitRecordTypes.should.have.property('forms').that.is.a('object');
    objectexitRecordTypes.should.have.property('fields').that.is.a('object');
    objectexitRecordTypes.should.have.property('columns').that.is.an('object');
    objectexitRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
