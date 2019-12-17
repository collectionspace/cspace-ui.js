import createColumns from '../../../../../src/plugins/recordTypes/objectexit/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('object exit record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have current owner column that is formatted as a refname display name', () => {
    const currentOwnerColumn = columns.default.currentOwner;

    currentOwnerColumn.should.have.property('formatValue').that.is.a('function');

    currentOwnerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
