import workRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/work';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('work record plugin', () => {
  const config = {};
  const workRecordTypePlugin = workRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = workRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('work');

    const workRecordType = recordTypes.work;

    workRecordType.should.have.property('messages').that.is.an('object');
    workRecordType.should.have.property('serviceConfig').that.is.an('object');
    workRecordType.should.have.property('title').that.is.a('function');
    workRecordType.should.have.property('forms').that.is.an('object');

    workRecordType.title().should.be.a('string');
    workRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});
