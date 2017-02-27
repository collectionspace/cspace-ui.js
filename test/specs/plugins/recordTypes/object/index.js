import objectRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/object';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('object record plugin', function suite() {
  const config = {};
  const objectRecordTypePlugin = objectRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = objectRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('object');

    const objectRecordType = recordTypes.object;

    objectRecordType.should.have.property('messages').that.is.an('object');
    objectRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
