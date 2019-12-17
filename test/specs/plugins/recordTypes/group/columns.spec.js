import createColumns from '../../../../../src/plugins/recordTypes/group/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('group record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have owner column that is formatted as a refname display name', () => {
    const ownerColumn = columns.default.owner;

    ownerColumn.should.have.property('formatValue').that.is.a('function');

    ownerColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
