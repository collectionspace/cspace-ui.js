import parseResourceID from '../../../src/helpers/parseResourceID';

chai.should();

describe('parseResourceID', () => {
  it('should parse a string into an array of objects', () => {
    parseResourceID('person/ulan,organization/org').should.deep.equal([{
      recordType: 'person',
      vocabulary: 'ulan',
    }, {
      recordType: 'organization',
      vocabulary: 'org',
    }]);
  });

  it('should return an empty array for a falsy input', () => {
    parseResourceID(undefined).should.deep.equal([]);
    parseResourceID(null).should.deep.equal([]);
    parseResourceID('').should.deep.equal([]);
  });
});
