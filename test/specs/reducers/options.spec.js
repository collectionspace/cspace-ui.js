import {
  ADD_OPTION_LISTS,
} from '../../../src/constants/actionCodes';

import reducer, {
  get,
} from '../../../src/reducers/optionList';

chai.should();

describe('optionList reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
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

    const state = reducer({}, {
      type: ADD_OPTION_LISTS,
      payload: optionLists,
    });

    state.should.deep.equal(optionLists);

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
});
