import personRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/person';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('person record plugin', function suite() {
  const config = {};
  const personRecordTypePlugin = personRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = personRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('person');

    const personRecordType = recordTypes.person;

    personRecordType.should.have.property('messageDescriptors').that.is.an('object');
    personRecordType.should.have.property('serviceConfig').that.is.an('object');
    personRecordType.should.have.property('title').that.is.a('function');
    personRecordType.should.have.property('forms').that.is.an('object');

    personRecordType.title().should.be.a('string');
    personRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
