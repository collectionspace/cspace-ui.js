import procedureRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/procedure';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('procecure record plugin', function suite() {
  const config = {};
  const procedureRecordTypePlugin = procedureRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = procedureRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('procedure');

    const procedureRecordType = recordTypes.procedure;

    procedureRecordType.should.have.property('messages').that.is.an('object');
    procedureRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
