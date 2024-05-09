import dutyOfCareRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/dutyofcare';
import createColumns from '../../../../../src/plugins/recordTypes/dutyofcare/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('dutyofcare record columns', () => {
  const dutyOfCareRecordTypePlugin = dutyOfCareRecordTypePluginFactory({});
  const configContext = createConfigContext(dutyOfCareRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
