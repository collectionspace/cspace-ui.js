import objectRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/object';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('object record plugin', function suite() {
  const config = {};
  const objectRecordTypePlugin = objectRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = objectRecordTypePlugin(pluginContext);

    const {
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('object');

    const objectRecordTypeConfig = recordTypes.object;

    objectRecordTypeConfig.should.have.property('messageDescriptors').that.is.an('object');
    objectRecordTypeConfig.should.have.property('serviceConfig').that.is.an('object');
    objectRecordTypeConfig.should.have.property('title').that.is.a('function');
    objectRecordTypeConfig.should.have.property('forms').that.is.an('object');
  });
});
