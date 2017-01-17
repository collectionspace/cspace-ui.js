import placeRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/place';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('place record plugin', function suite() {
  const config = {};
  const placeRecordTypePlugin = placeRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = placeRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('place');

    const placeRecordType = recordTypes.place;

    placeRecordType.should.have.property('messages').that.is.an('object');
    placeRecordType.should.have.property('serviceConfig').that.is.an('object');
    placeRecordType.should.have.property('title').that.is.a('function');
    placeRecordType.should.have.property('forms').that.is.an('object');

    placeRecordType.title().should.be.a('string');
    placeRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
