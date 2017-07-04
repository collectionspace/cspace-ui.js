import columns from '../../../../../src/plugins/recordTypes/conservation/columns';

chai.should();

describe('conservation record columns', function suite() {
  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have conservation status column that is formatted as a refname display name', function test() {
    const conservationStatusColumn = columns.default.find(column => column.name === 'status');

    conservationStatusColumn.should.have.property('formatValue').that.is.a('function');

    conservationStatusColumn.formatValue('urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'').should
      .equal('Treatment approved');
  });
});
