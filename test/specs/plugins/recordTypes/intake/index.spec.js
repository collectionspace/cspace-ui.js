import intakeRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/intake';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('intake record plugin', function suite() {
  const config = {};
  const intakeRecordTypePlugin = intakeRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = intakeRecordTypePlugin(configContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');
    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('intake');

    const intakeRecordTypes = recordTypes.intake;

    intakeRecordTypes.should.have.property('messages').that.is.an('object');
    intakeRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    intakeRecordTypes.should.have.property('title').that.is.a('function');
    intakeRecordTypes.should.have.property('forms').that.is.a('object');
    intakeRecordTypes.should.have.property('fields').that.is.a('object');
    intakeRecordTypes.should.have.property('columns').that.is.an('object');
    intakeRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
