import createColumns from '../../../../../src/plugins/recordTypes/heldintrust/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('heldintrust record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have depositor source column that is formatted as a refname display name', () => {
    const { depositor } = columns.default;

    depositor.should.have.property('formatValue').that.is.a('function');

    depositor.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
