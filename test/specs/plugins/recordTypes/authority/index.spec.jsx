import authorityRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/authority';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('authority record plugin', function suite() {
  const config = {};
  const authorityRecordTypePlugin = authorityRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = authorityRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('authority');

    const authorityRecordType = recordTypes.authority;

    authorityRecordType.should.have.property('messages').that.is.an('object');
    authorityRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
