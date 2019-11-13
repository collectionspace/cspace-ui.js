import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  ADD_OPTION_LISTS,
  DELETE_OPTION_LIST,
} from '../../../src/constants/actionCodes';

import reducer, {
  get,
} from '../../../src/reducers/optionList';

chai.use(chaiImmutable);
chai.should();

describe('optionList reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal(Immutable.Map());
  });

  it('should handle ADD_OPTION_LISTS', function test() {
    const optionLists = {
      states: [
        { value: 'CA', label: 'California' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'NY', label: 'New York' },
      ],
      sizes: [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ],
    };

    const state = reducer(Immutable.Map(), {
      type: ADD_OPTION_LISTS,
      payload: optionLists,
    });

    state.should.deep.equal(Immutable.Map(optionLists));

    get(state, 'states').should.deep.equal(optionLists.states);
    get(state, 'sizes').should.deep.equal(optionLists.sizes);

    const moreOptionLists = {
      countries: [
        { value: 'USA', label: 'United States' },
        { value: 'CAN', label: 'Canada' },
      ],
    };

    const newState = reducer(state, {
      type: ADD_OPTION_LISTS,
      payload: moreOptionLists,
    });

    get(newState, 'states').should.deep.equal(optionLists.states);
    get(newState, 'sizes').should.deep.equal(optionLists.sizes);
    get(newState, 'countries').should.deep.equal(moreOptionLists.countries);
  });

  it('should handle DELETE_OPTION_LIST', function test() {
    const initialState = Immutable.Map({
      states: [
        { value: 'CA', label: 'California' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'NY', label: 'New York' },
      ],
      sizes: [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ],
    });

    const state = reducer(initialState, {
      type: DELETE_OPTION_LIST,
      payload: 'states',
    });

    state.toJS().should.deep.equal({
      sizes: [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
      ],
    });
  });
});
