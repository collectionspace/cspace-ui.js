import placeRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/place';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('place record plugin', () => {
  const config = {};
  const placeRecordTypePlugin = placeRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = placeRecordTypePlugin(configContext);

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
