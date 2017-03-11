import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  DATA_TYPE_LIST,
  DATA_TYPE_STRING,
  DATA_TYPE_INT,
  DATA_TYPE_FLOAT,
  DATA_TYPE_BOOL,
  DATA_TYPE_DATETIME,
} from '../../../src/constants/dataTypes';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
  OP_LT,
  OP_LTE,
  OP_GT,
  OP_GTE,
  OP_MATCH,
  OP_RANGE,
} from '../../../src/constants/searchOperators';

import {
  configKey,
} from '../../../src/helpers/configHelpers';

import {
  normalizeCondition,
  normalizeBooleanCondition,
  normalizeRangeFieldCondition,
  normalizeFieldCondition,
  normalizeFieldValue,
  normalizeListFieldValue,
  normalizeStringFieldValue,
  normalizeTimestampRangeStartValue,
  normalizeTimestampRangeEndValue,
  operatorToNXQL,
  pathToNXQL,
  valueToNXQL,
  booleanConditionToNXQL,
  rangeFieldConditionToNXQL,
  fieldConditionToNXQL,
  advancedSearchConditionToNXQL,
} from '../../../src/helpers/searchHelpers';

const expect = chai.expect;

chai.use(chaiImmutable);

describe('searchHelpers', function moduleSuite() {
  describe('normalizeBooleanCondition', function suite() {
    const fields = {};

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

      normalizeBooleanCondition(fields, condition).should.equal(Immutable.fromJS({
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

      normalizeBooleanCondition(fields, condition).should.equal(Immutable.fromJS({
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

      normalizeBooleanCondition(fields, condition).should.equal(Immutable.Map({
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

      expect(normalizeBooleanCondition(fields, condition)).to.equal(null);
    });
  });

  describe('normalizeFieldCondition', function suite() {
    const fields = {};

    it('should normalize the value of the condition', function test() {
      const condition = Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: '  hello ',
      });

      normalizeFieldCondition(fields, condition).should.equal(Immutable.Map({
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

      expect(normalizeFieldCondition(fields, condition)).to.equal(null);
    });
  });

  describe('normalizeRangeFieldCondition', function suite() {
    const fields = {
      document: {
        'ns2:part': {
          updatedAt: {
            [configKey]: {
              dataType: DATA_TYPE_DATETIME,
            },
          },
        },
      },
    };

    it('should normalize the value of the condition', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
        value: [' 2', ' 4 '],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
        value: ['2', '4'],
      }));
    });

    it('should add start/end times to timestamps', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/updatedAt',
        value: ['2017-03-04', '2017-03-08'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/updatedAt',
        value: ['2017-03-04T00:00:00.000', '2017-03-08T23:59:59.999'],
      }));
    });

    it('should return null if the value normalizes to null', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
        value: [' ', null],
      });

      expect(normalizeRangeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should return null if the condition has no value', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
      });

      expect(normalizeRangeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should return a >= condition if the end of range is omitted', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
        value: ['2'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GTE,
        path: 'ns2:part/numberOfObjects',
        value: '2',
      }));
    });

    it('should return a <= condition if the end of range is omitted', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/numberOfObjects',
        value: [undefined, '4'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/numberOfObjects',
        value: '4',
      }));
    });
  });

  describe('normalizeCondition', function suite() {
    const fields = {};

    it('should return null for null input', function test() {
      expect(normalizeCondition(fields, null)).to.equal(null);
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

      normalizeCondition(fields, condition).should.equal(Immutable.Map({
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

      normalizeCondition(fields, condition).should.equal(Immutable.Map({
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

      normalizeCondition(fields, condition).should.equal(Immutable.Map({
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

      normalizeCondition(fields, condition).should.equal(Immutable.fromJS({
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

  describe('normalizeTimestampRangeStartValue', function suite() {
    it('should return null if the value is undefined, null, or empty', function test() {
      expect(normalizeTimestampRangeStartValue(undefined)).to.equal(null);
      expect(normalizeTimestampRangeStartValue(null)).to.equal(null);
      expect(normalizeTimestampRangeStartValue('')).to.equal(null);
    });

    it('should trim the value', function test() {
      expect(normalizeTimestampRangeStartValue(' 1997-05-23T13:00:00  ')).to.equal('1997-05-23T13:00:00');
    });

    it('should add a time if the value does not have one', function test() {
      expect(normalizeTimestampRangeStartValue('1997-05-23')).to.equal('1997-05-23T00:00:00.000');
    });
  });

  describe('normalizeTimestampRangeEndValue', function suite() {
    it('should return null if the value is undefined, null, or empty', function test() {
      expect(normalizeTimestampRangeEndValue(undefined)).to.equal(null);
      expect(normalizeTimestampRangeEndValue(null)).to.equal(null);
      expect(normalizeTimestampRangeEndValue('')).to.equal(null);
    });

    it('should trim the value', function test() {
      expect(normalizeTimestampRangeEndValue(' 1997-05-23T13:00:00  ')).to.equal('1997-05-23T13:00:00');
    });

    it('should add a time if the value does not have one', function test() {
      expect(normalizeTimestampRangeEndValue('1997-05-23')).to.equal('1997-05-23T23:59:59.999');
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

  describe('operatorToNXQL', function suite() {
    it('should return an NXQL operator', function test() {
      operatorToNXQL(OP_AND).should.equal('AND');
      operatorToNXQL(OP_OR).should.equal('OR');
      operatorToNXQL(OP_EQ).should.equal('=');
      operatorToNXQL(OP_LT).should.equal('<');
      operatorToNXQL(OP_LTE).should.equal('<=');
      operatorToNXQL(OP_GT).should.equal('>');
      operatorToNXQL(OP_GTE).should.equal('>=');
      operatorToNXQL(OP_MATCH).should.equal('ILIKE');
      operatorToNXQL(OP_RANGE).should.equal('BETWEEN');
    });
  });

  describe('pathToNXQL', function suite() {
    const fields = {
      document: {
        'ns2:collectionobjects_common': {
          titleGroupList: {
            [configKey]: {
              dataType: DATA_TYPE_LIST,
            },
            titleGroup: {
              title: {},
              titleTranslationSubGroupList: {
                [configKey]: {
                  dataType: DATA_TYPE_LIST,
                },
                titleTranslationSubGroup: {
                  titleTranslation: {},
                },
              },
            },
          },
        },
      },
    };

    it('should remove ns prefix from the part name', function test() {
      pathToNXQL(fields, 'ns2:collectionspace_core/updatedAt').should
        .equal('collectionspace_core:updatedAt');
    });

    it('should separate the part and the rest of the path with :', function test() {
      pathToNXQL(fields, 'ns2:collectionobjects_common/objectNumber').should
        .equal('collectionobjects_common:objectNumber');
    });

    it('should replace list items with *', function test() {
      pathToNXQL(fields, 'ns2:collectionobjects_common/titleGroupList/titleGroup/title').should
        .equal('collectionobjects_common:titleGroupList/*/title');

      pathToNXQL(fields, 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslation').should
        .equal('collectionobjects_common:titleGroupList/*/titleTranslationSubGroupList/*/titleTranslation');
    });
  });

  describe('valueToNXQL', function suite() {
    it('should convert string typed values to quoted strings', function test() {
      valueToNXQL('foo', DATA_TYPE_STRING).should.equal('"foo"');
    });

    it('should escape quotes in strings that contain quotes', function test() {
      valueToNXQL('"I\'m not here"', DATA_TYPE_STRING).should.equal('"\\"I\'m not here\\""');
    });

    it('should convert int typed values to unquoted numeric strings', function test() {
      valueToNXQL('3', DATA_TYPE_INT).should.equal('3');
    });

    it('should convert float typed values to unquoted numeric strings', function test() {
      valueToNXQL('3.14', DATA_TYPE_FLOAT).should.equal('3.14');
    });

    it('should convert bool typed values to unquoted 0 or 1', function test() {
      valueToNXQL(true, DATA_TYPE_BOOL).should.equal('1');
      valueToNXQL(false, DATA_TYPE_BOOL).should.equal('0');
    });

    it('should convert datetime typed values to quoted strings with preceded by \'TIMESTAMP\'', function test() {
      valueToNXQL('2017-03-08T17:04:34.000Z', DATA_TYPE_DATETIME).should.equal('TIMESTAMP "2017-03-08T17:04:34.000"');
    });

    it('should convert datetime typed values to the given time zone', function test() {
      valueToNXQL('2017-03-08T17:04:34.000Z', DATA_TYPE_DATETIME, 'America/New_York').should
        .equal('TIMESTAMP "2017-03-08T12:04:34.000"');
    });
  });

  describe('booleanConditionToNXQL', function suite() {
    const fields = {};

    it('should convert AND conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:part/foo',
            value: 'val1',
          },
          {
            op: OP_EQ,
            path: 'ns2:part/bar',
            value: 'val2',
          },
          {
            op: OP_EQ,
            path: 'ns2:part/baz',
            value: 'val3',
          },
        ],
      });

      booleanConditionToNXQL(fields, condition).should
        .equal('(part:foo = "val1" AND part:bar = "val2" AND part:baz = "val3")');
    });

    it('should convert OR conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:part/foo',
            value: 'val1',
          },
          {
            op: OP_EQ,
            path: 'ns2:part/bar',
            value: 'val2',
          },
          {
            op: OP_EQ,
            path: 'ns2:part/baz',
            value: 'val3',
          },
        ],
      });

      booleanConditionToNXQL(fields, condition).should
        .equal('(part:foo = "val1" OR part:bar = "val2" OR part:baz = "val3")');
    });

    it('should convert nested AND/OR conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:part/foo',
            value: 'val1',
          },
          {
            op: OP_OR,
            value: [
              {
                op: OP_EQ,
                path: 'ns2:part/bar',
                value: 'val2',
              },
              {
                op: OP_EQ,
                path: 'ns2:part/baz',
                value: 'val3',
              },
            ],
          },
        ],
      });

      booleanConditionToNXQL(fields, condition).should
        .equal('(part:foo = "val1" AND (part:bar = "val2" OR part:baz = "val3"))');
    });

    it('should return \'\' for an unknown operator', function test() {
      const condition = Immutable.fromJS({
        op: 'foobar',
      });

      booleanConditionToNXQL(fields, condition).should.equal('');
    });
  });

  describe('rangeFieldConditionToNXQL', function suite() {
    const fields = {};

    it('should convert range conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/foo',
        value: ['c', 'g'],
      });

      rangeFieldConditionToNXQL(fields, condition).should
        .equal('part:foo BETWEEN "c" AND "g"');
    });
  });

  describe('fieldConditionToNXQL', function suite() {
    const fields = {};

    it('should convert field conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/foo',
        value: 'bar',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo <= "bar"');
    });
  });

  describe('advancedSearchConditionToNXQL', function suite() {
    const fields = {};

    it('should convert boolean conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:part/foo',
            value: 'val1',
          },
          {
            op: OP_EQ,
            path: 'ns2:part/bar',
            value: 'val2',
          },
        ],
      });

      advancedSearchConditionToNXQL(fields, condition).should
        .equal('(part:foo = "val1" AND part:bar = "val2")');
    });

    it('should convert range conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/foo',
        value: ['q', 'z'],
      });

      advancedSearchConditionToNXQL(fields, condition).should
        .equal('part:foo BETWEEN "q" AND "z"');
    });

    it('should convert field conditions to NXQL', function test() {
      const condition = Immutable.fromJS({
        op: OP_GT,
        path: 'ns2:part/foo',
        value: 'bar',
      });

      advancedSearchConditionToNXQL(fields, condition).should
        .equal('part:foo > "bar"');
    });

    it('should return null for a null condition', function test() {
      expect(advancedSearchConditionToNXQL(fields, null)).to.equal(null);
    });
  });
});
