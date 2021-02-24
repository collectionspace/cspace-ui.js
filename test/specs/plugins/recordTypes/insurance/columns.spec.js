import createColumns from '../../../../../src/plugins/recordTypes/insurance/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('insurance record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have insurerIndemnifier source column that is formatted as a refname display name', () => {
    const insurerIndemnifierColumn = columns.default.insurerIndemnifier;

    insurerIndemnifierColumn.should.have.property('formatValue').that.is.a('function');

    insurerIndemnifierColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });
});
