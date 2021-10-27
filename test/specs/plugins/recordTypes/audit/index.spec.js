import auditRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/audit';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('audit record plugin', () => {
  const config = {};
  const auditRecordTypePlugin = auditRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = auditRecordTypePlugin(configContext);

    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    const auditRecordType = recordTypes.audit;

    auditRecordType.should.have.property('messages').that.is.an('object');
    auditRecordType.should.have.property('serviceConfig').that.is.an('object');
    auditRecordType.should.have.property('fields').that.is.an('object');
    auditRecordType.should.have.property('forms').that.is.an('object');
    auditRecordType.should.have.property('columns').that.is.an('object');
    auditRecordType.should.have.property('title').that.is.a('function');
  });
});
