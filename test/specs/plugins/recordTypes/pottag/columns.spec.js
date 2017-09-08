import columns from '../../../../../src/plugins/recordTypes/pottag/columns';

chai.should();

describe('pot tag record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have family column that is formatted as a refname display name', function test() {
    const familyColumn = columns.default.find(column => column.name === 'family');

    familyColumn.should.have.property('formatValue').that.is.a('function');

    familyColumn.formatValue('urn:cspace:botgarden.collectionspace.org:taxonomyauthority:name(taxon):item:name(PTFamily1501262583720)\'PTFamily\'').should
      .equal('PTFamily');
  });
});
