import createConfigContext from '../../../../../src/helpers/createConfigContext';
import advancedSearch from '../../../../../src/plugins/recordTypes/exit/advancedSearch';

chai.should();

describe('exit record advanced search', () => {
  const configContext = createConfigContext();

  it('should contain a top level property `op`', () => {
    advancedSearch(configContext).should.have.property('op');
  });

  it('should contain a top level property `value` that is an array', () => {
    advancedSearch(configContext).should.have.property('value').that.is.an('array');
  });

  it('should include a search operation for `exitNumber`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_CONTAIN,
      path: 'ns2:exits_common/exitNumber',
    });
  });
});
