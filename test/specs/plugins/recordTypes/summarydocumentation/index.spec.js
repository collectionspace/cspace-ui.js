import summaryDocumentationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/summarydocumentation';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('summarydocumentation record plugin', () => {
  const config = {};
  const summaryDocumentationRecordTypePlugin = summaryDocumentationRecordTypePluginFactory(config);
  const configContext = createConfigContext(summaryDocumentationRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = summaryDocumentationRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('summarydocumentation');

    const summaryDocumentationRecordType = recordTypes.summarydocumentation;

    summaryDocumentationRecordType.should.have.property('title').that.is.a('function');
    summaryDocumentationRecordType.should.have.property('forms').that.is.an('object');
    summaryDocumentationRecordType.should.have.property('messages').that.is.an('object');
    summaryDocumentationRecordType.should.have.property('serviceConfig').that.is.an('object');
    summaryDocumentationRecordType.title().should.be.a('string');
  });
});
