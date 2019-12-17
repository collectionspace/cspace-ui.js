import uocRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/uoc';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('uoc record plugin', () => {
  const config = {};
  const uocRecordTypePlugin = uocRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = uocRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('uoc');

    const uocRecordTypes = recordTypes.uoc;

    uocRecordTypes.should.have.property('messages').that.is.an('object');
    uocRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    uocRecordTypes.should.have.property('title').that.is.a('function');
    uocRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
