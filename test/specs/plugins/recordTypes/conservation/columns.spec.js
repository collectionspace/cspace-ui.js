import createColumns from '../../../../../src/plugins/recordTypes/conservation/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('conservation record columns', function suite() {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have conservation status column that is formatted as a refname display name', function test() {
    const conservationStatusColumn = columns.default.status;

    conservationStatusColumn.should.have.property('formatValue').that.is.a('function');

    conservationStatusColumn.formatValue('urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'').should
      .equal('Treatment approved');
  });
});
