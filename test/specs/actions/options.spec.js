import {
  ADD_OPTIONS,
  addOptions,
} from '../../../src/actions/options';

chai.should();

describe('options action creator', function suite() {
  describe('addOptions', function actionSuite() {
    it('should create an ADD_OPTIONS action', function test() {
      const options = {
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

      const mergedOptions = {
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

      addOptions(options).should.deep.equal({
        type: ADD_OPTIONS,
        payload: mergedOptions,
      });
    });
  });
});
