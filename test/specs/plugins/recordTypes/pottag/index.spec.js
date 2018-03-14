import pottagRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/pottag';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('pottag record plugin', function suite() {
  const config = {};
  const pottagRecordTypePlugin = pottagRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = pottagRecordTypePlugin(configContext);

    const {
//      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    recordTypes.should.have.property('pottag');

    const pottagRecordType = recordTypes.pottag;

    pottagRecordType.should.have.property('messages').that.is.an('object');
    pottagRecordType.should.have.property('serviceConfig').that.is.an('object');
    pottagRecordType.should.have.property('title').that.is.a('function');
    pottagRecordType.should.have.property('forms').that.is.an('object');
  });
});
