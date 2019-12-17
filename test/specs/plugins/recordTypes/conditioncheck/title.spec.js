import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/conditioncheck/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('condition check record title', () => {
  const formatterContext = {
    config: {
      optionLists: {
        conditions: {
          messages: {
            injeopardy: {
              id: 'option.conditions.injeopardy',
              defaultMessage: 'in jeopardy',
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

  it('should concat the condition check number and the condition', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conditionchecks_common': {
          conditionCheckRefNumber: 'CC2017.1',
          conditionCheckGroupList: {
            conditionCheckGroup: [
              {
                condition: 'injeopardy',
              },
              {
                condition: 'exhibitableneedswork',
              },
            ],
          },
        },
      },
    });

    title(data, formatterContext).should.equal('CC2017.1 – in jeopardy');
  });

  it('should return the condition check number when the condition is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conditionchecks_common': {
          conditionCheckRefNumber: 'CC2017.1',
          conditionCheckGroupList: {
            conditionCheckGroup: [
              {
                conditionNote: 'note1',
              },
              {
                conditionNote: 'note2',
              },
            ],
          },
        },
      },
    });

    title(data, formatterContext).should.equal('CC2017.1');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conditionchecks_extension': {
          conditionCheckRefNumber: 'CC2017.1',
          conditionCheckGroupList: {
            conditionCheckGroup: [
              {
                condition: 'injeopardy',
              },
              {
                condition: 'exhibitableneedswork',
              },
            ],
          },
        },
      },
    });

    title(data).should.equal('');
  });
});
