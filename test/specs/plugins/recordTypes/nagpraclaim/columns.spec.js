import nagpraclaimRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/nagpraclaim';
import createColumns from '../../../../../src/plugins/recordTypes/nagpraclaim/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('nagpraclaim record columns', () => {
  const nagpraclaimRecordTypePlugin = nagpraclaimRecordTypePluginFactory({});
  const configContext = createConfigContext(nagpraclaimRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
