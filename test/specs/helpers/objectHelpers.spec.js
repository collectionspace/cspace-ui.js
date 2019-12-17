import {
  diff,
  flatten,
} from '../../../src/helpers/objectHelpers';

describe('objectHelpers', () => {
  describe('flatten', () => {
    const obj = {
      key1: {
        key2: 'foo',
      },
      key3: 123,
      key4: {
        key5: 'bar',
        key6: {
          key7: 'baz',
          key8: 'hello',
        },
      },
    };

    it('should flatten deeply nested objects', () => {
      flatten(obj).should.deep.equal({
        'key1.key2': 'foo',
        key3: 123,
        'key4.key5': 'bar',
        'key4.key6.key7': 'baz',
        'key4.key6.key8': 'hello',
      });
    });

    it('should flatten to the given maximum depth', () => {
      flatten(obj, 1).should.deep.equal(obj);

      flatten(obj, 2).should.deep.equal({
        'key1.key2': 'foo',
        key3: 123,
        'key4.key5': 'bar',
        'key4.key6': {
          key7: 'baz',
          key8: 'hello',
        },
      });
    });
  });

  describe('diff', () => {
    it('should return a map of paths that differ', () => {
      diff({
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'b',
        },
      }, {
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'c',
        },
      }).should.deep.equal({
        'key2.key4': true,
      });

      diff({
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'b',
        },
      }, {
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'c',
        },
        key5: 'd',
      }).should.deep.equal({
        'key2.key4': true,
        key5: true,
      });

      diff({
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'b',
        },
        key5: 'd',
      }, {
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'c',
        },
      }).should.deep.equal({
        'key2.key4': true,
        key5: true,
      });

      diff({
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'b',
        },
      }, {
        key1: 1,
      }).should.deep.equal({
        'key2.key3': true,
        'key2.key4': true,
      });

      diff({
        key1: 1,
      }, {
        key1: 1,
        key2: {
          key3: 'a',
          key4: 'b',
        },
      }).should.deep.equal({
        'key2.key3': true,
        'key2.key4': true,
      });

      diff({
        key1: 1,
      }, {
        key1: 4,
      }).should.deep.equal({
        key1: true,
      });

      diff({
        key1: 1,
      }, {
        key1: 1,
      }).should.deep.equal({
      });

      diff({
        key1: 1,
      }, {
      }).should.deep.equal({
        key1: true,
      });

      diff({
      }, {
        key1: 1,
      }).should.deep.equal({
        key1: true,
      });

      diff({
      }, {
      }).should.deep.equal({
      });
    });

    it('should compare to the given maximum depth', () => {
      const obj1 = {
        key1: {
          key2: 'foo',
        },
        key3: 123,
        key4: {
          key5: 'bar',
          key6: {
            key7: 'baz',
            key8: 'hello',
          },
        },
      };

      const obj2 = {
        key1: {
          key2: 'foo',
        },
        key3: 123,
        key4: {
          key5: 'bar',
          key6: {
            key7: 'something',
            key8: 'else',
          },
        },
      };

      diff(obj1, obj2, 2).should.deep.equal({
        'key4.key6': true,
      });
    });
  });
});
