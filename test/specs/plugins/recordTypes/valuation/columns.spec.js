import columns from '../../../../../src/plugins/recordTypes/valuation/columns';

chai.should();

describe('valuation record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });
});
