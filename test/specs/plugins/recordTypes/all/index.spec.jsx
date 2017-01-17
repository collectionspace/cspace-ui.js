import allRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/all';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('all record plugin', function suite() {
  const config = {};
  const allRecordTypePlugin = allRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = allRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('all');

    const allRecordType = recordTypes.all;

    allRecordType.should.have.property('messages').that.is.an('object');
    allRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
