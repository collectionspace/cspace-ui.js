import authorityRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/authority';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('authority record plugin', () => {
  const config = {};
  const authorityRecordTypePlugin = authorityRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = authorityRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('authority');

    const authorityRecordType = recordTypes.authority;

    authorityRecordType.should.have.property('messages').that.is.an('object');
    authorityRecordType.should.have.property('serviceConfig').that.is.an('object');
  });
});
