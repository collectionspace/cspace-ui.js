import loaninRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/loanin';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('loan-in record plugin', function suite() {
  const config = {};
  const loaninRecordTypePlugin = loaninRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = loaninRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('loanin');

    const loanInRecordTypes = recordTypes.loanin;

    loanInRecordTypes.should.have.property('messages').that.is.an('object');
    loanInRecordTypes.should.have.property('serviceConfig').that.is.an('object');
    loanInRecordTypes.should.have.property('title').that.is.a('function');
    loanInRecordTypes.should.have.property('forms').that.is.an('object');
  });
});
