import acquisitionRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/acquisition';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('acquisition record plugin', () => {
  const config = {};
  const acquisitionRecordTypePlugin = acquisitionRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = acquisitionRecordTypePlugin(configContext);

    const {
      idGenerators,
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('acquisition');
    idGenerators.should.be.an('object');

    const acquisitionRecordType = recordTypes.acquisition;

    acquisitionRecordType.should.have.property('messages').that.is.an('object');
    acquisitionRecordType.should.have.property('serviceConfig').that.is.an('object');
    acquisitionRecordType.should.have.property('title').that.is.a('function');
    acquisitionRecordType.should.have.property('forms').that.is.an('object');
  });
});
