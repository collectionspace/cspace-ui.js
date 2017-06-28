import columns from '../../../../../src/plugins/recordTypes/acquisition/columns';

chai.should();

describe('acquisition record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });
});
