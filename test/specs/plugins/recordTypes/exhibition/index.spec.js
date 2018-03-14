import exhibitionRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/exhibition';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('exhibition record plugin', function suite() {
  const config = {};
  const exhibitionRecordTypePlugin = exhibitionRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = exhibitionRecordTypePlugin(configContext);

    pluginConfigContribution.should.have.property('idGenerators').that.is.an('object');
    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('exhibition');

    const exhibitionRecordTypes = recordTypes.exhibition;

    exhibitionRecordTypes.should.have.property('messages').that.is.an('object');
    exhibitionRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    exhibitionRecordTypes.should.have.property('title').that.is.a('function');
    exhibitionRecordTypes.should.have.property('forms').that.is.a('object');
    exhibitionRecordTypes.should.have.property('fields').that.is.a('object');
    exhibitionRecordTypes.should.have.property('columns').that.is.an('object');
    exhibitionRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
