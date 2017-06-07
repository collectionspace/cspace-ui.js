import loaninRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/loanin';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('loan-in record plugin', function suite() {
  const config = {};
  const loaninRecordTypePlugin = loaninRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = loaninRecordTypePlugin(pluginContext);

    const {
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('loanin');

    const loanInRecordTypes = recordTypes.loanin;

    loanInRecordTypes.should.have.property('messages').that.is.an('object');
    loanInRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    loanInRecordTypes.should.have.property('title').that.is.a('function');
    loanInRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
