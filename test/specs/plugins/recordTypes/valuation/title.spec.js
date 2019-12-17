import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/valuation/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('valuation record title', () => {
  const formatterContext = {
    config: {
      optionLists: {
        valueTypes: {
          messages: {
            'Current Value': {
              id: 'option.valueTypes.Current Value',
              defaultMessage: 'current value',
            },
          },
        },
      },
    },
    intl: {
      formatMessage: (messageDescriptor) => messageDescriptor.defaultMessage,
    },
  };

  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the valuation number and the value type', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:valuationcontrols_common': {
          valuationcontrolRefNumber: 'VAL2017.1',
          valueType: 'Current Value',
        },
      },
    });

    title(data, formatterContext).should.equal('VAL2017.1 – current value');
  });

  it('should return the valuation number when the value type is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:valuationcontrols_common': {
          valuationcontrolRefNumber: 'VAL2017.1',
        },
      },
    });

    title(data, formatterContext).should.equal('VAL2017.1');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:valuationcontrols_extension': {
          valuationcontrolRefNumber: 'VAL2017.1',
          valueType: 'current-value',
        },
      },
    });

    title(data).should.equal('');
  });
});
