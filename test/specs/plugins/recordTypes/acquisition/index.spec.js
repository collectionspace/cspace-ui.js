import acquisitionRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/acquisition';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('acquisition record plugin', function suite() {
  const config = {};
  const acquisitionRecordTypePlugin = acquisitionRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = acquisitionRecordTypePlugin(pluginContext);

    const {
      idGenerators,
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('acquisition');
    idGenerators.should.be.an('object');

    const acquisitionRecordType = recordTypes.acquisition;

    acquisitionRecordType.should.have.property('messages').that.is.an('object');
    acquisitionRecordType.should.have.property('serviceConfig').that.is.an('object');
    acquisitionRecordType.should.have.property('title').that.is.a('function');
    acquisitionRecordType.should.have.property('forms').that.is.an('object');
  });
});
