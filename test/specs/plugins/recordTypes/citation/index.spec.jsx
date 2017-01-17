import citationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/citation';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('citation record plugin', function suite() {
  const config = {};
  const citationRecordTypePlugin = citationRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = citationRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('citation');

    const citationRecordType = recordTypes.citation;

    citationRecordType.should.have.property('messages').that.is.an('object');
    citationRecordType.should.have.property('serviceConfig').that.is.an('object');
    citationRecordType.should.have.property('title').that.is.a('function');
    citationRecordType.should.have.property('forms').that.is.an('object');

    citationRecordType.title().should.be.a('string');
    citationRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
