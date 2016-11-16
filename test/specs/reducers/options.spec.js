import {
  ADD_OPTIONS,
} from '../../../src/actions/options';

import reducer, {
  get,
} from '../../../src/reducers/options';

chai.should();

describe('options reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle ADD_OPTIONS', function test() {
    const options = {
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
      type: ADD_OPTIONS,
      payload: options,
    });

    state.should.deep.equal(options);

    get(state, 'states').should.deep.equal(options.states);
    get(state, 'sizes').should.deep.equal(options.sizes);

    const moreOptions = {
      countries: [
        { value: 'USA', label: 'United States' },
        { value: 'CAN', label: 'Canada' },
      ],
    };

    const newState = reducer(state, {
      type: ADD_OPTIONS,
      payload: moreOptions,
    });

    get(newState, 'states').should.deep.equal(options.states);
    get(newState, 'sizes').should.deep.equal(options.sizes);
    get(newState, 'countries').should.deep.equal(moreOptions.countries);
  });
});
