import createColumns from '../../../../../src/plugins/recordTypes/heldintrust/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('heldintrust record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have owner source column that is formatted as a refname display name', () => {
    const { owner } = columns.default;

    owner.should.have.property('formatValue').that.is.a('function');

    owner.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
