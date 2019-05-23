import {
  ADD_OPTION_LISTS,
} from '../../../src/constants/actionCodes';

import {
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
          messages: {
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
            message: { defaultMessage: 'California' },
          },
          {
            value: 'CT',
          },
          {
            value: 'MA',
            message: { defaultMessage: 'Massachusetts' },
          },
          {
            value: 'NY',
            message: { defaultMessage: 'New York' },
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
