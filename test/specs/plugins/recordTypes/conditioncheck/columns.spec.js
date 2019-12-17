import createColumns from '../../../../../src/plugins/recordTypes/conditioncheck/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('condition check record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  const config = {
    optionLists: {
      conditions: {
        messages: {
          value1: {
            id: 'option.conditions.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
  };

  const intl = {
    formatMessage: (message) => `formatted ${message.id}`,
  };

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have condition column that is formatted as an option list value', () => {
    const conditionColumn = columns.default.condition;

    conditionColumn.should.have.property('formatValue').that.is.a('function');

    conditionColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.conditions.value1');
  });
});
