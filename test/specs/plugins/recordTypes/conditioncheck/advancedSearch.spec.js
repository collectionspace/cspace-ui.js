import advancedSearch from '../../../../../src/plugins/recordTypes/conditioncheck/advancedSearch';

chai.should();

describe('condition check record advanced search', function suite() {
  it('should contain a top level property `op`', function test() {
    advancedSearch.should.have.property('op');
  });

  it('should contain a top level property `value` that is an array', function test() {
    advancedSearch.should.have.property('value').that.is.an('array');
  });
});
