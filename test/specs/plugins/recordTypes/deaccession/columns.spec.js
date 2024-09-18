import deaccessionRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/deaccession';
import createColumns from '../../../../../src/plugins/recordTypes/deaccession/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('deaccession record columns', () => {
  const deaccessionRecordTypePlugin = deaccessionRecordTypePluginFactory({});
  const configContext = createConfigContext(deaccessionRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
