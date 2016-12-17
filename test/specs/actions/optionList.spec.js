import {
  ADD_OPTION_LISTS,
  addOptionLists,
} from '../../../src/actions/optionList';

chai.should();

describe('optionList action creator', function suite() {
  describe('addOptionLists', function actionSuite() {
    it('should create an ADD_OPTION_LISTS action', function test() {
      const optionLists = {
        states: {
          values: [
            'CA',
            'CT',
            'MA',
            'NY',
          ],
          messageDescriptors: {
            CA: { defaultMessage: 'California' },
            MA: { defaultMessage: 'Massachusetts' },
            NY: { defaultMessage: 'New York' },
          },
        },
      };

      const mergedOptionLists = {
        states: [
          {
            value: 'CA',
            messageDescriptor: { defaultMessage: 'California' },
          },
          {
            value: 'CT',
          },
          {
            value: 'MA',
            messageDescriptor: { defaultMessage: 'Massachusetts' },
          },
          {
            value: 'NY',
            messageDescriptor: { defaultMessage: 'New York' },
          },
        ],
      };

      addOptionLists(optionLists).should.deep.equal({
        type: ADD_OPTION_LISTS,
        payload: mergedOptionLists,
      });
    });
  });
});
