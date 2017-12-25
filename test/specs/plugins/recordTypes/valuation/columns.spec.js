import createColumns from '../../../../../src/plugins/recordTypes/valuation/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('valuation record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  const config = {
    optionLists: {
      valueTypes: {
        messages: {
          value1: {
            id: 'option.valueTypes.value1',
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

  it('should have value type that is formatted as an option list value', function test() {
    const valueTypeColumn = columns.default.find(column => column.name === 'valueType');

    valueTypeColumn.should.have.property('formatValue').that.is.a('function');

    valueTypeColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.valueTypes.value1');
  });
});
