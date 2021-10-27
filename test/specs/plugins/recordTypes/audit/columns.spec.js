import createColumns from '../../../../../src/plugins/recordTypes/audit/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('audit record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
