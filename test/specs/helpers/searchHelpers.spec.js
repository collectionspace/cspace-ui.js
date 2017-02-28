import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  normalizeCondition,
  normalizeBooleanCondition,
  normalizeRangeFieldCondition,
  normalizeFieldCondition,
  normalizeFieldValue,
  normalizeListFieldValue,
  normalizeStringFieldValue,
} from '../../../src/helpers/searchHelpers';

import {
  OP_AND,
  OP_OR,
  OP_GTE,
  OP_LTE,
  OP_MATCH,
  OP_RANGE,
} from '../../../src/constants/searchOperators';

const expect = chai.expect;

chai.use(chaiImmutable);

describe('searchHelpers', function moduleSuite() {
  describe('normalizeBooleanCondition', function suite() {
    it('should normalize the child conditions', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: '  hello ',
          },
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/comment',
            value: 'foo',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: '  2007-02-10 ',
          },
        ],
      });

      normalizeBooleanCondition(condition).should.equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: 'hello',
          },
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/comment',
            value: 'foo',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: '2007-02-10',
          },
        ],
      }));
    });

    it('should remove child conditions that normalize to null', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: '  hello ',
          },
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/comment',
            value: ' ',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: '  2007-02-10 ',
          },
        ],
      });

      normalizeBooleanCondition(condition).should.equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: 'hello',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: '2007-02-10',
          },
        ],
      }));
    });

    it('should return the child condition if only one child condition remains after normalization', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: '  hello ',
          },
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/comment',
            value: ' ',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: null,
          },
        ],
      });

      normalizeBooleanCondition(condition).should.equal(Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: 'hello',
      }));
    });

    it('should return null if no child conditions remain after normalization', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: undefined,
          },
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/comment',
            value: ' ',
          },
          {
            op: OP_MATCH,
            path: 'collectionspace_core/updatedAt',
            value: null,
          },
        ],
      });

      expect(normalizeBooleanCondition(condition)).to.equal(null);
    });
  });

  describe('normalizeFieldCondition', function suite() {
    it('should normalize the value of the condition', function test() {
      const condition = Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: '  hello ',
      });

      normalizeFieldCondition(condition).should.equal(Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: 'hello',
      }));
    });

    it('should return null if the normalized value is null', function test() {
      const condition = Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: '   ',
      });

      expect(normalizeFieldCondition(condition)).to.equal(null);
    });
  });

  describe('normalizeRangeFieldCondition', function suite() {
    it('should normalize the value of the condition', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: [' 2', ' 4 '],
      });

      normalizeRangeFieldCondition(condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: ['2', '4'],
      }));
    });

    it('should return null if the value normalizes to null', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: [' ', null],
      });

      expect(normalizeRangeFieldCondition(condition)).to.equal(null);
    });

    it('should return null if the condition value is null', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
      });

      expect(normalizeRangeFieldCondition(condition)).to.equal(null);
    });

    it('should return a >= condition if the end of range is omitted', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: ['2'],
      });

      normalizeRangeFieldCondition(condition).should.equal(Immutable.fromJS({
        op: OP_GTE,
        path: 'collectionobjects_common/numberOfObjects',
        value: '2',
      }));
    });

    it('should return a <= condition if the end of range is omitted', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: [undefined, '4'],
      });

      normalizeRangeFieldCondition(condition).should.equal(Immutable.fromJS({
        op: OP_LTE,
        path: 'collectionobjects_common/numberOfObjects',
        value: '4',
      }));
    });
  });

  describe('normalizeCondition', function suite() {
    it('should return null for null input', function test() {
      expect(normalizeCondition(null)).to.equal(null);
    });

    it('should normalize OP_AND conditions', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: '  hello ',
          },
        ],
      });

      normalizeCondition(condition).should.equal(Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: 'hello',
      }));
    });

    it('should normalize OP_OR conditions', function test() {
      const condition = Immutable.fromJS({
        op: OP_OR,
        value: [
          {
            op: OP_MATCH,
            path: 'collectionobjects_common/objectNumber',
            value: '  hello ',
          },
        ],
      });

      normalizeCondition(condition).should.equal(Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: 'hello',
      }));
    });

    it('should normalize OP_MATCH conditions', function test() {
      const condition = Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: '  hello ',
      });

      normalizeCondition(condition).should.equal(Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: 'hello',
      }));
    });

    it('should normalize OP_RANGE conditions', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: [' 2', ' 4 '],
      });

      normalizeCondition(condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/numberOfObjects',
        value: ['2', '4'],
      }));
    });
  });

  describe('normalizeListFieldValue', function suite() {
    it('should return null if the list is undefined, null, or empty', function test() {
      expect(normalizeListFieldValue(undefined)).to.equal(null);
      expect(normalizeListFieldValue(null)).to.equal(null);
      expect(normalizeListFieldValue(Immutable.List())).to.equal(null);
    });

    it('should remove empty and whitespace-only list items', function test() {
      normalizeListFieldValue(Immutable.List([
        'foo', '', 'bar', null, 'baz', undefined, 'abc', '  ',
      ])).should.equal(Immutable.List([
        'foo', 'bar', 'baz', 'abc',
      ]));
    });

    it('should normalize items', function test() {
      normalizeListFieldValue(Immutable.List([
        '  foo ', '\t', ' bar baz',
      ])).should.equal(Immutable.List([
        'foo', 'bar baz',
      ]));
    });

    it('should return null if the list is empty after normalizing items', function test() {
      expect(normalizeListFieldValue(Immutable.List([
        '   ', '\t', null, undefined, '',
      ]))).to.equal(null);
    });
  });

  describe('normalizeStringFieldValue', function suite() {
    it('should return null if the value is undefined, null, or empty', function test() {
      expect(normalizeStringFieldValue(undefined)).to.equal(null);
      expect(normalizeStringFieldValue(null)).to.equal(null);
      expect(normalizeStringFieldValue('')).to.equal(null);
    });

    it('should trim the value', function test() {
      normalizeStringFieldValue(' foo ').should.equal('foo');
      normalizeStringFieldValue('foo bar ').should.equal('foo bar');
      normalizeStringFieldValue('   foo').should.equal('foo');
    });

    it('should return null if the value contains only whitespace', function test() {
      expect(normalizeStringFieldValue(' ')).to.equal(null);
      expect(normalizeStringFieldValue('\t  \n')).to.equal(null);
    });
  });

  describe('normalizeFieldValue', function suite() {
    it('should normalize list values', function test() {
      normalizeFieldValue(Immutable.List([
        'foo', '', 'bar', null, 'baz', undefined, 'abc', '  ',
      ])).should.equal(Immutable.List([
        'foo', 'bar', 'baz', 'abc',
      ]));
    });

    it('should normalize string values', function test() {
      normalizeStringFieldValue('foo bar ').should.equal('foo bar');
    });
  });
});
