import taxonRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/taxon';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('taxon record plugin', function suite() {
  const config = {};
  const taxonRecordTypePlugin = taxonRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = taxonRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('taxon');

    const taxonRecordType = recordTypes.taxon;

    taxonRecordType.should.have.property('messages').that.is.an('object');
    taxonRecordType.should.have.property('serviceConfig').that.is.an('object');
    taxonRecordType.should.have.property('title').that.is.a('function');
    taxonRecordType.should.have.property('forms').that.is.an('object');

    taxonRecordType.title().should.be.a('string');
    taxonRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
