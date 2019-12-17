import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import prepareForSending from '../../../../../src/plugins/recordTypes/collectionobject/prepareForSending';

chai.use(chaiImmutable);
chai.should();

describe('collectionobject prepareForSending', () => {
  it('should remove the computedCurrentLocation field', () => {
    prepareForSending(Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1234',
          computedCurrentLocation: 'foo',
        },
      },
    })).should.equal(Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1234',
        },
      },
    }));
  });
});
