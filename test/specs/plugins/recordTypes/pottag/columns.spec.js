import createColumns from '../../../../../src/plugins/recordTypes/pottag/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('pot tag record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  const config = {
    optionLists: {
      printLabelOptions: {
        messages: {
          value1: {
            id: 'option.printLabelOptions.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
  };

  const intl = {
    formatMessage: message => `formatted ${message.id}`,
  };

  it('should have the correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have family column that is formatted as a refname display name', function test() {
    const familyColumn = columns.default.find(column => column.name === 'family');

    familyColumn.should.have.property('formatValue').that.is.a('function');

    familyColumn.formatValue('urn:cspace:botgarden.collectionspace.org:taxonomyauthority:name(taxon):item:name(PTFamily1501262583720)\'PTFamily\'').should
      .equal('PTFamily');
  });

  it('should have taxonName column that is formatted as a refname display name', function test() {
    const taxonNameColumn = columns.default.find(column => column.name === 'taxonName');

    taxonNameColumn.should.have.property('formatValue').that.is.a('function');

    taxonNameColumn.formatValue('urn:cspace:botgarden.collectionspace.org:taxonomyauthority:name(taxon):item:name(TaxonName1501262583720)\'TaxonName\'').should
      .equal('TaxonName');
  });

  it('should have print labels column that is formatted as an option list value', function test() {
    const printLabelsColumn = columns.default.find(column => column.name === 'printLabels');

    printLabelsColumn.should.have.property('formatValue').that.is.a('function');

    printLabelsColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.printLabelOptions.value1');
  });
});
