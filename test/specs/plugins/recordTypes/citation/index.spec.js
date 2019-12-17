import citationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/citation';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('citation record plugin', () => {
  const config = {};
  const citationRecordTypePlugin = citationRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = citationRecordTypePlugin(configContext);

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
