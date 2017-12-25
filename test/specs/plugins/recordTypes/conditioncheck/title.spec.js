import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/conditioncheck/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('condition check record title', function suite() {
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
      formatMessage: messageDescriptor => messageDescriptor.defaultMessage,
    },
  };

  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the condition check number and the condition', function test() {
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

  it('should return the condition check number when the condition is empty', function test() {
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

  it('should return empty string if no data is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
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
