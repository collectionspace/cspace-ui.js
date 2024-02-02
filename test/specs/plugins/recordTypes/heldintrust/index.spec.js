import heldintrustRecordTypePluginFactor from '../../../../../src/plugins/recordTypes/heldintrust';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('heldintrust record plugin', () => {
  const config = {};
  const heldInTrustRecordType = heldintrustRecordTypePluginFactor(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = heldInTrustRecordType(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('heldintrust');

    const heldInTrustRecordTypes = recordTypes.heldintrust;

    heldInTrustRecordTypes.should.have.property('messages').that.is.an('object');
    heldInTrustRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    heldInTrustRecordTypes.should.have.property('title').that.is.a('function');
    heldInTrustRecordTypes.should.have.property('forms').that.is.an('object');
    heldInTrustRecordTypes.should.have.property('fields').that.is.a('object');
    heldInTrustRecordTypes.should.have.property('columns').that.is.an('object');
    heldInTrustRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
