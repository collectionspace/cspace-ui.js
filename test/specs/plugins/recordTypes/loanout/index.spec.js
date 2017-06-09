import loanoutRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/loanout';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('loan-out record plugin', function suite() {
  const config = {};
  const loanoutRecordTypePlugin = loanoutRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = loanoutRecordTypePlugin(pluginContext);

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
