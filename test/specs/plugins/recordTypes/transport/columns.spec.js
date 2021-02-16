import createColumns from '../../../../../src/plugins/recordTypes/transport/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('transport record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
