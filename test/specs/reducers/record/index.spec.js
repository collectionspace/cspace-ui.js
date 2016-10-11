import chai from 'chai';
import Immutable from 'immutable';

import reducer, {
  getData,
  getNewData,
  isReadPending,
  isSavePending,
} from '../../../../src/reducers/record';

const expect = chai.expect;

chai.should();

describe('record reducer', function suite() {
  it('should compose the initial states of its composed reducers', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({
      data: {},
      readsPending: {},
      savesPending: {},
    });

    expect(getData(state, '1234')).to.equal(undefined);
    expect(getNewData(state)).to.equal(undefined);
    expect(isReadPending(state, '1234')).to.equal(undefined);
    expect(isSavePending(state, '1234')).to.equal(undefined);
  });

  describe('getData selector', function selectorSuite() {
    it('should select from the data key', function test() {
      const data = Immutable.Map();

      getData({
        data: {
          1234: data,
        },
      }, '1234').should.equal(data);
    });
  });

  describe('getNewData selector', function selectorSuite() {
    it('should select from the data key', function test() {
      const data = Immutable.Map();

      getNewData({
        data: {
          '': data,
        },
      }).should.equal(data);
    });
  });

  describe('isReadPending selector', function selectorSuite() {
    it('should select from the readsPending key', function test() {
      isReadPending({
        readsPending: {
          1234: true,
        },
      }, '1234').should.equal(true);
    });
  });

  describe('isSavePending selector', function selectorSuite() {
    it('should select from the savesPending key', function test() {
      isSavePending({
        savesPending: {
          1234: true,
        },
      }, '1234').should.equal(true);
    });
  });
});
