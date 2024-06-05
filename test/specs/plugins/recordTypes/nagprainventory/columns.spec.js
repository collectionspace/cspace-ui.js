import nagpraInventoryRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/nagprainventory';
import createColumns from '../../../../../src/plugins/recordTypes/nagprainventory/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagprainventory record columns', () => {
  const nagpraInventoryRecordTypePlugin = nagpraInventoryRecordTypePluginFactory({});
  const configContext = createConfigContext(nagpraInventoryRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
