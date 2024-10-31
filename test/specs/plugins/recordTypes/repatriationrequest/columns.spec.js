import repatriationrequestRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/repatriationrequest';
import createColumns from '../../../../../src/plugins/recordTypes/repatriationrequest/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('repatriationrequest record columns', () => {
  const repatriationrequestRecordTypePlugin = repatriationrequestRecordTypePluginFactory({});
  const configContext = createConfigContext(repatriationrequestRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
