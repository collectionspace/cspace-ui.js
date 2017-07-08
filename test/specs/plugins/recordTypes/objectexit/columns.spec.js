import columns from '../../../../../src/plugins/recordTypes/objectexit/columns';

chai.should();

describe('object exit record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });
});
