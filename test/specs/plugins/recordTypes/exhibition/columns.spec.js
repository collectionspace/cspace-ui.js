import columns from '../../../../../src/plugins/recordTypes/exhibition/columns';

chai.should();

describe('exhibition record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  })
});