import {
  READ_VOCABULARY_ITEMS_STARTED,
  READ_VOCABULARY_ITEMS_FULFILLED,
  READ_VOCABULARY_ITEMS_REJECTED,
} from '../../../src/actions/vocabulary';

import reducer, {
  get,
} from '../../../src/reducers/vocabulary';

chai.should();

describe('vocabulary reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle READ_VOCABULARY_ITEMS_STARTED', function test() {
    const vocabularyName = 'languages';

    const state = reducer({}, {
      type: READ_VOCABULARY_ITEMS_STARTED,
      meta: {
        vocabularyName,
      },
    });

    state.should.deep.equal({
      [vocabularyName]: {
        isReadPending: true,
        items: null,
      },
    });

    get(state, vocabularyName).should.deep.equal({
      isReadPending: true,
      items: null,
    });
  });

  it('should handle READ_VOCABULARY_ITEMS_FULFILLED', function test() {
    const vocabularyName = 'states';

    const items = [
      { displayName: 'California' },
      { displayName: 'New York' },
    ];

    const data = {
      'ns2:abstract-common-list': {
        'list-item': items,
      },
    };

    const state = reducer({}, {
      type: READ_VOCABULARY_ITEMS_FULFILLED,
      payload: {
        data,
      },
      meta: {
        vocabularyName,
      },
    });

    state.should.deep.equal({
      [vocabularyName]: {
        items,
      },
    });

    get(state, vocabularyName).should.deep.equal({
      items,
    });
  });

  it('should handle READ_VOCABULARY_ITEMS_REJECTED', function test() {
    const vocabularyName = 'languages';
    const error = new Error();

    const state = reducer({}, {
      type: READ_VOCABULARY_ITEMS_REJECTED,
      payload: error,
      meta: {
        vocabularyName,
      },
    });

    state.should.deep.equal({
      [vocabularyName]: {
        error,
      },
    });

    get(state, vocabularyName).should.deep.equal({
      error,
    });
  });
});
