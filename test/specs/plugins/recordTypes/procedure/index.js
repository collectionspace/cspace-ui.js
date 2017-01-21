import procedureRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/procedure';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('procecure record plugin', function suite() {
  const config = {};
  const procedureRecordTypePlugin = procedureRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = procedureRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('procedure');

    const procedureRecordType = recordTypes.procedure;

    procedureRecordType.should.have.property('messages').that.is.an('object');
    procedureRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
