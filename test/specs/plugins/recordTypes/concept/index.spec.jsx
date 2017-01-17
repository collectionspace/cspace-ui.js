import conceptRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/concept';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('concept record plugin', function suite() {
  const config = {};
  const conceptRecordTypePlugin = conceptRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = conceptRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('concept');

    const conceptRecordType = recordTypes.concept;

    conceptRecordType.should.have.property('messages').that.is.an('object');
    conceptRecordType.should.have.property('serviceConfig').that.is.an('object');
    conceptRecordType.should.have.property('title').that.is.a('function');
    conceptRecordType.should.have.property('forms').that.is.an('object');

    conceptRecordType.title().should.be.a('string');
    conceptRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
