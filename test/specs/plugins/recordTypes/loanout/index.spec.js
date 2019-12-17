import loanoutRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/loanout';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('loan-out record plugin', () => {
  const config = {};
  const loanoutRecordTypePlugin = loanoutRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = loanoutRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('loanout');

    const loanOutRecordTypes = recordTypes.loanout;

    loanOutRecordTypes.should.have.property('messages').that.is.an('object');
    loanOutRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    loanOutRecordTypes.should.have.property('title').that.is.a('function');
    loanOutRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
