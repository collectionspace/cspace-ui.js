import columns from '../../../../../src/plugins/recordTypes/conditioncheck/columns';

chai.should();

describe('condition check record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });
});
