import repatriationclaimRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/repatriationclaim';
import createColumns from '../../../../../src/plugins/recordTypes/repatriationclaim/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('repatriationclaim record columns', () => {
  const repatriationclaimRecordTypePlugin = repatriationclaimRecordTypePluginFactory({});
  const configContext = createConfigContext(repatriationclaimRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
