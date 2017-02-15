import collectionobjectRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/collectionobject';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('collectionobject record plugin', function suite() {
  const config = {};
  const collectionobjectRecordTypePlugin = collectionobjectRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = collectionobjectRecordTypePlugin(pluginContext);

    const {
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('collectionobject');

    const collectionobjectRecordType = recordTypes.collectionobject;

    collectionobjectRecordType.should.have.property('messages').that.is.an('object');
    collectionobjectRecordType.should.have.property('serviceConfig').that.is.an('object');
    collectionobjectRecordType.should.have.property('title').that.is.a('function');
    collectionobjectRecordType.should.have.property('forms').that.is.an('object');
  });
});
