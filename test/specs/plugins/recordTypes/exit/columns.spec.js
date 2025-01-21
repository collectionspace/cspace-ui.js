import createColumns from '../../../../../src/plugins/recordTypes/exit/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('exit record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have owner column that can format a refname', () => {
    const { owner } = columns.default;

    owner.should.have.property('formatValue').that.is.a('function');

    owner.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
