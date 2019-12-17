import objectexitRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/objectexit';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('object exit record plugin', () => {
  const config = {};
  const objectexitRecordTypePlugin = objectexitRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = objectexitRecordTypePlugin(configContext);

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
