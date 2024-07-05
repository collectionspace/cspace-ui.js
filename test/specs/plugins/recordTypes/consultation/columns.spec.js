import consultationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/consultation';
import createColumns from '../../../../../src/plugins/recordTypes/consultation/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('consultation record columns', () => {
  const consultationRecordTypePlugin = consultationRecordTypePluginFactory({});
  const configContext = createConfigContext(consultationRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
