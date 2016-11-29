import parseAuthoritySpec from '../../../src/helpers/parseAuthoritySpec';

chai.should();

describe('parseAuthoritySpec', function suite() {
  it('should parse a string into an array of objects', function test() {
    parseAuthoritySpec('person/ulan,organization/org').should.deep.equal([{
      authorityName: 'person',
      vocabularyName: 'ulan',
    }, {
      authorityName: 'organization',
      vocabularyName: 'org',
    }]);
  });
});
