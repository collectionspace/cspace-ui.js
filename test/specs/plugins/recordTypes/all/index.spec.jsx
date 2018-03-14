import allRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/all';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('all record plugin', function suite() {
  const config = {};
  const allRecordTypePlugin = allRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = allRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('all');

    const allRecordType = recordTypes.all;

    allRecordType.should.have.property('messages').that.is.an('object');
    allRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
