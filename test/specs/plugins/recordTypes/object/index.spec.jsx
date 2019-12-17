import objectRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/object';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('object record plugin', () => {
  const config = {};
  const objectRecordTypePlugin = objectRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = objectRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('object');

    const objectRecordType = recordTypes.object;

    objectRecordType.should.have.property('messages').that.is.an('object');
    objectRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
