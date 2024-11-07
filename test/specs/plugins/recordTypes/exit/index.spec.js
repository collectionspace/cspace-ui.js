import exitRecordTypePluginFactor from '../../../../../src/plugins/recordTypes/exit';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('exit record plugin', () => {
  const config = {};
  const exitRecordType = exitRecordTypePluginFactor(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = exitRecordType(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('exit');

    const exitRecordTypes = recordTypes.exit;

    exitRecordTypes.should.have.property('messages').that.is.an('object');
    exitRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    exitRecordTypes.should.have.property('title').that.is.a('function');
    exitRecordTypes.should.have.property('forms').that.is.an('object');
    exitRecordTypes.should.have.property('fields').that.is.a('object');
    exitRecordTypes.should.have.property('columns').that.is.an('object');
    exitRecordTypes.should.have.property('advancedSearch').that.is.an('object');
  });
});
