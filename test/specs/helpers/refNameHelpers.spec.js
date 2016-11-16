import {
  getDisplayName,
} from '../../../src/helpers/refNameHelpers';

const expect = chai.expect;

chai.should();

describe('getDisplayName', function suite() {
  it('should return null if the refname has no display name', function test() {
    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)'
    )).to.equal(null);
  });

  it('should return null if the refname has a malformed display name', function test() {
    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Uh oh no closing quote'
    )).to.equal(null);

    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)Uh oh no opening quote\''
    )).to.equal(null);
  });

  it('should return the display name', function test() {
    getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    ).should.equal('Ancient Greek');
  });

  it('should return an empty display name', function test() {
    getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'\''
    ).should.equal('');
  });
});
