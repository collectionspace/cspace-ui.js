import personRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/person';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('person record plugin', function suite() {
  const config = {};
  const personRecordTypePlugin = personRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = personRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('person');

    const personRecordType = recordTypes.person;

    personRecordType.should.have.property('messages').that.is.an('object');
    personRecordType.should.have.property('serviceConfig').that.is.an('object');
    personRecordType.should.have.property('title').that.is.a('function');
    personRecordType.should.have.property('forms').that.is.an('object');

    personRecordType.title().should.be.a('string');
    personRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
