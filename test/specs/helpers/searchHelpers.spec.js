import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  DATA_TYPE_STRING,
  DATA_TYPE_INT,
  DATA_TYPE_FLOAT,
  DATA_TYPE_BOOL,
  DATA_TYPE_DATETIME,
  DATA_TYPE_STRUCTURED_DATE,
  DATA_TYPE_DATE,
} from '../../../src/constants/dataTypes';

import {
  OP_AND,
  OP_COMPLETE,
  OP_CONTAIN,
  OP_OR,
  OP_EQ,
  OP_LT,
  OP_LTC,
  OP_LTE,
  OP_GT,
  OP_GTC,
  OP_GTE,
  OP_GROUP,
  OP_MATCH,
  OP_NOT_MATCH,
  OP_NOT_COMPLETE,
  OP_NOT_EQ,
  OP_NOT_CONTAIN,
  OP_NOT_RANGE,
  OP_NULL,
  OP_NOT_NULL,
  OP_RANGE,
} from '../../../src/constants/searchOperators';

import {
  configKey,
} from '../../../src/helpers/configHelpers';

import {
  clearAdvancedSearchConditionValues,
  createCounter,
  dateEndTimestamp,
  dateStartTimestamp,
  normalizeCondition,
  normalizeBooleanCondition,
  normalizeGroupCondition,
  normalizeRangeFieldCondition,
  normalizeFieldCondition,
  normalizeFieldValue,
  normalizeListFieldValue,
  normalizeStringFieldValue,
  operatorToNXQL,
  pathToNXQL,
  patternValueToNXQL,
  valueToNXQL,
  booleanConditionToNXQL,
  groupConditionToNXQL,
  rangeFieldConditionToNXQL,
  fieldConditionToNXQL,
  structuredDateFieldConditionToNXQL,
  advancedSearchConditionToNXQL,
  searchDescriptorToLocation,
  getListType,
  getNextPageSearchDescriptor,
  getPreviousPageSearchDescriptor,
  getFirstItem,
  getSubrecordSearchName,
} from '../../../src/helpers/searchHelpers';

const { expect } = chai;

chai.use(chaiImmutable);

describe('searchHelpers', () => {
  describe('normalizeBooleanCondition', () => {
    const fields = {};

    it('should normalize the child conditions', () => {
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

    it('should remove child conditions that normalize to null', () => {
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

    it('should return the child condition if only one child condition remains after normalization', () => {
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

    it('should return null if no child conditions remain after normalization', () => {
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

  describe('normalizeGroupCondition', () => {
    const fields = {};

    it('should normalize the child conditions of the boolean child condition', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_AND,
          value: [{
            op: OP_RANGE,
            path: 'collectionobjects_common/titleGroupList/titleGroup/title',
            value: ['aaa', null],
          }],
        },
      });

      normalizeGroupCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_AND,
          value: [{
            op: OP_GTE,
            path: 'collectionobjects_common/titleGroupList/titleGroup/title',
            value: 'aaa',
          }],
        },
      }));
    });

    it('should return null if the condition has no path', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
      });

      expect(normalizeGroupCondition(fields, condition)).to.equal(null);
    });

    it('should return null if the condition has no child condition value', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
      });

      expect(normalizeGroupCondition(fields, condition)).to.equal(null);
    });

    it('should wrap a non-boolean child condition in an AND condition', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_EQ,
          path: 'collectionobjects_common/titleGroupList/titleGroup/title',
          value: 'the title',
        },
      });

      normalizeGroupCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_AND,
          value: [{
            op: OP_EQ,
            path: 'collectionobjects_common/titleGroupList/titleGroup/title',
            value: 'the title',
          }],
        },
      }));
    });

    it('should return null if the boolean child condition has no child conditions', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_AND,
        },
      });

      expect(normalizeGroupCondition(fields, condition)).to.equal(null);
    });

    it('should return null if the normalized boolean child condition has no child conditions', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/titleGroupList/titleGroup',
        value: {
          op: OP_AND,
          value: [{
            op: OP_EQ,
            path: 'collectionobjects_common/titleGroupList/titleGroup/title',
          }],
        },
      });

      expect(normalizeGroupCondition(fields, condition)).to.equal(null);
    });
  });

  describe('normalizeFieldCondition', () => {
    const fields = {};

    it('should return null if the condition has no path', () => {
      const condition = Immutable.Map({
        path: null,
      });

      expect(normalizeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should normalize the value of the condition', () => {
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

    it('should return null if the normalized value is null, but the operator expects a value', () => {
      const condition = Immutable.Map({
        op: OP_MATCH,
        path: 'collectionobjects_common/objectNumber',
        value: '   ',
      });

      expect(normalizeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should return a value-less condition if the normalized value is null, and the operator does not expect a value', () => {
      const condition = Immutable.Map({
        op: OP_NULL,
        path: 'collectionobjects_common/objectNumber',
        value: '   ',
      });

      normalizeFieldCondition(fields, condition).should.equal(Immutable.Map({
        op: OP_NULL,
        path: 'collectionobjects_common/objectNumber',
      }));
    });
  });

  describe('normalizeRangeFieldCondition', () => {
    const fields = {
      document: {
        'ns2:part': {
          fuzzyDate: {
            [configKey]: {
              dataType: DATA_TYPE_STRUCTURED_DATE,
            },
            dateEarliestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
            dateLatestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
          },
        },
      },
    };

    it('should return null if the condition has no path', () => {
      const condition = Immutable.Map({
        path: null,
      });

      expect(normalizeRangeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should normalize the value of the condition', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: [' 2', ' 4 '],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: ['2', '4'],
      }));
    });

    it('should return null if the value normalizes to null', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: [' ', null],
      });

      expect(normalizeRangeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should return null if the condition has no value', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
      });

      expect(normalizeRangeFieldCondition(fields, condition)).to.equal(null);
    });

    it('should return a >= condition if the value is not a list and the field is not a structured date', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: '2',
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GTE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: '2',
      }));
    });

    it('should return a >= condition if the end of range is omitted and the field is not a structured date', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: ['2'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GTE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: '2',
      }));
    });

    it('should return a > or contains condition if the end of range is omitted and the field is a structured date', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/fuzzyDate',
        value: ['2000-01-01'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GTC,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      }));
    });

    it('should return a <= condition if the start of range is omitted and the field is not a structured date', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: [undefined, '4'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/objectCountGroupList/objectCountGroup/objectCount',
        value: '4',
      }));
    });

    it('should return a < or contains condition if the start of range is omitted and the field is a structured date', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/fuzzyDate',
        value: [undefined, '2000-01-01'],
      });

      normalizeRangeFieldCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_LTC,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      }));
    });
  });

  describe('normalizeCondition', () => {
    const fields = {};

    it('should return null for null input', () => {
      expect(normalizeCondition(fields, null)).to.equal(null);
    });

    it('should normalize OP_AND conditions', () => {
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

    it('should normalize OP_OR conditions', () => {
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

    it('should normalize OP_MATCH conditions', () => {
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

    it('should normalize OP_RANGE conditions', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/objectCountGroupList/objectCountGroup/objectCount',
        value: [' 2', ' 4 '],
      });

      normalizeCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_RANGE,
        path: 'collectionobjects_common/objectCountGroupList/objectCountGroup/objectCount',
        value: ['2', '4'],
      }));
    });

    it('should normalize OP_GROUP conditions', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/materialGroupList/materialGroup',
        value: {
          op: OP_AND,
          value: [
            {
              op: OP_EQ,
              path: 'collectionobjects_common/materialGroupList/materialGroup/material',
              value: 'glass',
            },
            {
              path: null,
            },
          ],
        },
      });

      normalizeCondition(fields, condition).should.equal(Immutable.fromJS({
        op: OP_GROUP,
        path: 'collectionobjects_common/materialGroupList/materialGroup',
        value: {
          op: OP_AND,
          value: [
            {
              op: OP_EQ,
              path: 'collectionobjects_common/materialGroupList/materialGroup/material',
              value: 'glass',
            },
          ],
        },
      }));
    });
  });

  describe('normalizeListFieldValue', () => {
    it('should return null if the list is undefined, null, or empty', () => {
      expect(normalizeListFieldValue(undefined)).to.equal(null);
      expect(normalizeListFieldValue(null)).to.equal(null);
      expect(normalizeListFieldValue(Immutable.List())).to.equal(null);
    });

    it('should remove empty and whitespace-only list items', () => {
      normalizeListFieldValue(Immutable.List([
        'foo', '', 'bar', null, 'baz', undefined, 'abc', '  ',
      ])).should.equal(Immutable.List([
        'foo', 'bar', 'baz', 'abc',
      ]));
    });

    it('should normalize items', () => {
      normalizeListFieldValue(Immutable.List([
        '  foo ', '\t', ' bar baz',
      ])).should.equal(Immutable.List([
        'foo', 'bar baz',
      ]));
    });

    it('should return null if the list is empty after normalizing items', () => {
      expect(normalizeListFieldValue(Immutable.List([
        '   ', '\t', null, undefined, '',
      ]))).to.equal(null);
    });

    it('should return the item if the list contains only one item', () => {
      normalizeListFieldValue(Immutable.List(['foo'])).should.equal('foo');
    });
  });

  describe('normalizeStringFieldValue', () => {
    it('should return null if the value is undefined, null, or empty', () => {
      expect(normalizeStringFieldValue(undefined)).to.equal(null);
      expect(normalizeStringFieldValue(null)).to.equal(null);
      expect(normalizeStringFieldValue('')).to.equal(null);
    });

    it('should trim the value', () => {
      normalizeStringFieldValue(' foo ').should.equal('foo');
      normalizeStringFieldValue('foo bar ').should.equal('foo bar');
      normalizeStringFieldValue('   foo').should.equal('foo');
    });

    it('should return null if the value contains only whitespace', () => {
      expect(normalizeStringFieldValue(' ')).to.equal(null);
      expect(normalizeStringFieldValue('\t  \n')).to.equal(null);
    });
  });

  describe('normalizeFieldValue', () => {
    it('should normalize list values', () => {
      normalizeFieldValue(Immutable.List([
        'foo', '', 'bar', null, 'baz', undefined, 'abc', '  ',
      ])).should.equal(Immutable.List([
        'foo', 'bar', 'baz', 'abc',
      ]));
    });

    it('should normalize string values', () => {
      normalizeStringFieldValue('foo bar ').should.equal('foo bar');
    });
  });

  describe('operatorToNXQL', () => {
    it('should return an NXQL operator', () => {
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

  describe('pathToNXQL', () => {
    const fields = {
      document: {
        'ns2:collectionobjects_common': {
          titleGroupList: {
            titleGroup: {
              [configKey]: {
                repeating: true,
              },
              title: {},
              titleTranslationSubGroupList: {
                titleTranslationSubGroup: {
                  [configKey]: {
                    repeating: true,
                  },
                  titleTranslation: {},
                },
              },
            },
          },
        },
      },
    };

    it('should remove ns prefix from the part name', () => {
      pathToNXQL(fields, 'ns2:collectionspace_core/updatedAt').should
        .equal('collectionspace_core:updatedAt');
    });

    it('should separate the part and the rest of the path with :', () => {
      pathToNXQL(fields, 'ns2:collectionobjects_common/objectNumber').should
        .equal('collectionobjects_common:objectNumber');
    });

    it('should replace repeating items with *', () => {
      pathToNXQL(fields, 'ns2:collectionobjects_common/titleGroupList/titleGroup/title').should
        .equal('collectionobjects_common:titleGroupList/*/title');

      pathToNXQL(fields, 'ns2:collectionobjects_common/titleGroupList/titleGroup/titleTranslationSubGroupList/titleTranslationSubGroup/titleTranslation').should
        .equal('collectionobjects_common:titleGroupList/*/titleTranslationSubGroupList/*/titleTranslation');
    });
  });

  describe('dateStartTimestamp', () => {
    it('should add a time if the value does not have one', () => {
      expect(dateStartTimestamp('1997-05-23')).to.equal('1997-05-23T00:00:00.000');
    });
  });

  describe('dateEndTimestamp', () => {
    it('should add a time if the value does not have one', () => {
      expect(dateEndTimestamp('1997-05-23')).to.equal('1997-05-23T23:59:59.999');
    });
  });

  describe('patternValueToNXQL', () => {
    it('should return the value if the value is undefined, null, or empty', () => {
      expect(patternValueToNXQL(undefined)).to.equal(undefined);
      expect(patternValueToNXQL(null)).to.equal(null);
      expect(patternValueToNXQL('')).to.equal('');
    });

    it('should replace * not preceded by an odd number of backslashes with %', () => {
      expect(patternValueToNXQL('foo*bar*baz')).to.equal('foo%bar%baz');
      expect(patternValueToNXQL('*foo')).to.equal('%foo');
      expect(patternValueToNXQL('foo*')).to.equal('foo%');
      expect(patternValueToNXQL('foo**bar')).to.equal('foo%bar');
      expect(patternValueToNXQL('foo*\\*bar')).to.equal('foo%\\*bar');
      expect(patternValueToNXQL('foo\\*\\*bar')).to.equal('foo\\*\\*bar');
      expect(patternValueToNXQL('foo\\*bar')).to.equal('foo\\*bar');
      expect(patternValueToNXQL('foo\\\\*bar')).to.equal('foo\\\\%bar');
      expect(patternValueToNXQL('\\*foo\\\\\\*bar')).to.equal('\\*foo\\\\\\%bar');
      expect(patternValueToNXQL('\\\\*foo\\***bar')).to.equal('\\\\%foo\\*%bar');
    });
  });

  describe('valueToNXQL', () => {
    const fields = {
      document: {
        stringField: {
          [configKey]: {
            dataType: DATA_TYPE_STRING,
          },
        },
        anotherStringField: {},
        intField: {
          [configKey]: {
            dataType: DATA_TYPE_INT,
          },
        },
        floatField: {
          [configKey]: {
            dataType: DATA_TYPE_FLOAT,
          },
        },
        boolField: {
          [configKey]: {
            dataType: DATA_TYPE_BOOL,
          },
        },
        dateTimeField: {
          [configKey]: {
            dataType: DATA_TYPE_DATETIME,
          },
        },
        transformedStringField: {
          [configKey]: {
            searchTransform: ({ data }) => `transformed ${data}`,
          },
        },
      },
    };

    it('should convert string typed values to quoted strings', () => {
      valueToNXQL('foo', 'stringField', fields).should.equal('"foo"');
    });

    it('should escape quotes in strings that contain quotes', () => {
      valueToNXQL('"I\'m not here"', 'anotherStringField', fields).should.equal('"\\"I\'m not here\\""');
    });

    it('should convert int typed values to unquoted numeric strings', () => {
      valueToNXQL('3', 'intField', fields).should.equal('3');
      valueToNXQL('3.14', 'intField', fields).should.equal('3.14');
      valueToNXQL('-24', 'intField', fields).should.equal('-24');
      valueToNXQL('0.0', 'intField', fields).should.equal('0');
    });

    it('should convert float typed values to unquoted numeric strings', () => {
      valueToNXQL('3', 'floatField', fields).should.equal('3');
      valueToNXQL('3.14', 'floatField', fields).should.equal('3.14');
      valueToNXQL('-24', 'floatField', fields).should.equal('-24');
      valueToNXQL('0.0', 'floatField', fields).should.equal('0');
    });

    it('should convert bool typed values to unquoted 0 or 1', () => {
      valueToNXQL(true, 'boolField', fields).should.equal('1');
      valueToNXQL(false, 'boolField', fields).should.equal('0');
    });

    it('should convert datetime typed values to quoted strings preceded by \'TIMESTAMP\'', () => {
      valueToNXQL('2017-03-08T17:04:34.000Z', 'dateTimeField', fields).should.equal('TIMESTAMP "2017-03-08T17:04:34.000Z"');
    });

    it('should convert datetime typed values to UTC', () => {
      valueToNXQL('2017-03-08T17:04:34.000-08:00', 'dateTimeField', fields).should
        .equal('TIMESTAMP "2017-03-09T01:04:34.000Z"');
    });

    it('should transform the value using the configured searchTransform function, if present', () => {
      valueToNXQL('foo', 'transformedStringField', fields).should.equal('"transformed foo"');
    });
  });

  describe('booleanConditionToNXQL', () => {
    const fields = {};

    it('should convert AND conditions to NXQL', () => {
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

    it('should convert OR conditions to NXQL', () => {
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

    it('should convert nested AND/OR conditions to NXQL', () => {
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

    it('should return \'\' for an unknown operator', () => {
      const condition = Immutable.fromJS({
        op: 'foobar',
      });

      booleanConditionToNXQL(fields, condition).should.equal('');
    });
  });

  describe('groupConditionToNXQL', () => {
    const fields = {
      document: {
        'ns2:part': {
          groupList: {
            group: {
              [configKey]: {
                repeating: true,
              },
              foo: {},
              bar: {},
              baz: {},
              nestedGroupList: {
                nestedGroup: {
                  [configKey]: {
                    repeating: true,
                  },
                  geordi: {},
                  worf: {},
                },
              },
            },
          },
        },
      },
    };

    it('should correlate paths to the fields in the group', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'ns2:part/groupList/group',
        value: {
          op: OP_AND,
          value: [
            {
              op: OP_EQ,
              path: 'ns2:part/groupList/group/foo',
              value: 'val1',
            },
            {
              op: OP_EQ,
              path: 'ns2:part/groupList/group/bar',
              value: 'val2',
            },
            {
              op: OP_EQ,
              path: 'ns2:part/groupList/group/baz',
              value: 'val3',
            },
          ],
        },
      });

      groupConditionToNXQL(fields, condition, createCounter()).should
        .equal('(part:groupList/*1/foo = "val1" AND part:groupList/*1/bar = "val2" AND part:groupList/*1/baz = "val3")');
    });

    it('should correlate paths to the fields in nested groups', () => {
      const condition = Immutable.fromJS({
        op: OP_GROUP,
        path: 'ns2:part/groupList/group/nestedGroupList/nestedGroup',
        value: {
          op: OP_OR,
          value: [
            {
              op: OP_GT,
              path: 'ns2:part/groupList/group/nestedGroupList/nestedGroup/worf',
              value: 'val1',
            },
            {
              op: OP_LT,
              path: 'ns2:part/groupList/group/nestedGroupList/nestedGroup/geordi',
              value: 'val2',
            },
          ],
        },
      });

      groupConditionToNXQL(fields, condition, createCounter()).should
        .equal('(part:groupList/*2/nestedGroupList/*1/worf > "val1" OR part:groupList/*2/nestedGroupList/*1/geordi < "val2")');
    });
  });

  describe('rangeFieldConditionToNXQL', () => {
    const fields = {
      document: {
        'ns2:part': {
          date: {
            [configKey]: {
              dataType: DATA_TYPE_STRUCTURED_DATE,
            },
          },
          updatedAt: {
            [configKey]: {
              dataType: DATA_TYPE_DATETIME,
            },
          },
          id: {
            [configKey]: {
              dataType: DATA_TYPE_STRING,
              searchCompareField: 'ns2:part/sortableID',
            },
          },
        },
      },
    };

    it('should convert range conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/foo',
        value: ['c', 'g'],
      });

      rangeFieldConditionToNXQL(fields, condition).should
        .equal('part:foo BETWEEN "c" AND "g"');
    });

    it('should add start/end times to timestamps', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/updatedAt',
        value: ['2017-03-04', '2017-03-08'],
      });

      rangeFieldConditionToNXQL(fields, condition).should
        .match(new RegExp('^part:updatedAt BETWEEN TIMESTAMP "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z" AND TIMESTAMP "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z"$'));
    });

    it('should convert structured date range conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/date',
        value: ['2000-01-01', '2000-12-31'],
      });

      rangeFieldConditionToNXQL(fields, condition).should
        .equal('(part:date/dateEarliestScalarValue <= "2000-12-31" AND part:date/dateLatestScalarValue > "2000-01-01")');
    });

    it('should resolve the sortCompareField path', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/id',
        value: ['c', 'g'],
      });

      rangeFieldConditionToNXQL(fields, condition).should
        .equal('part:sortableID BETWEEN "c" AND "g"');
    });
  });

  describe('fieldConditionToNXQL', () => {
    const fields = {
      document: {
        'ns2:part': {
          date: {
            [configKey]: {
              dataType: DATA_TYPE_STRUCTURED_DATE,
            },
            dateEarliestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
            dateLatestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
          },
          updatedAt: {
            [configKey]: {
              dataType: DATA_TYPE_DATETIME,
            },
          },
          id: {
            [configKey]: {
              dataType: DATA_TYPE_STRING,
              searchCompareField: 'ns2:part/sortableID',
            },
          },
        },
      },
    };

    it('should convert field conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/foo',
        value: 'bar',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo <= "bar"');
    });

    it('should convert is null conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NULL,
        path: 'ns2:part/foo',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo IS NULL');
    });

    it('should convert is not null conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_NULL,
        path: 'ns2:part/foo',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo IS NOT NULL');
    });

    it('should convert structured date field conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_LT,
        path: 'ns2:part/date',
        value: '2000-01-01',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:date/dateLatestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z"');
    });

    it('should convert contain operation to match operation with wildcards on either end', () => {
      const condition = Immutable.fromJS({
        op: OP_CONTAIN,
        path: 'ns2:part/foo',
        value: 'bar%baz',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo ILIKE "%bar%baz%"');
    });

    it('should convert not contain operation to not match operation with wildcards on either end', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_CONTAIN,
        path: 'ns2:part/foo',
        value: 'bar%baz',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo NOT ILIKE "%bar%baz%"');
    });

    it('should substitute * in the value of a match operation with %', () => {
      const condition = Immutable.fromJS({
        op: OP_MATCH,
        path: 'ns2:part/foo',
        value: 'hello*world',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo ILIKE "hello%world"');
    });

    it('should substitute * in the value of a not match operation with %', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_MATCH,
        path: 'ns2:part/foo',
        value: 'hello*world',
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('part:foo NOT ILIKE "hello%world"');
    });

    it('should expand list values into multiple OR clauses', () => {
      const condition = Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/foo',
        value: ['bar', 'baz'],
      });

      fieldConditionToNXQL(fields, condition).should
        .equal('(part:foo <= "bar" OR part:foo <= "baz")');
    });

    it('should convert = and not = operations on datetimes to range searches', () => {
      const eqCondition = Immutable.fromJS({
        op: OP_EQ,
        path: 'ns2:part/updatedAt',
        value: '2015-08-16',
      });

      fieldConditionToNXQL(fields, eqCondition).should
        .match(new RegExp('part:updatedAt BETWEEN TIMESTAMP "2015-08-1\\dT\\d\\d:00:00.000Z" AND TIMESTAMP "2015-08-1\\dT\\d\\d:59:59.999Z"'));

      const notEqCondition = Immutable.fromJS({
        op: OP_NOT_EQ,
        path: 'ns2:part/updatedAt',
        value: '2015-08-16',
      });

      fieldConditionToNXQL(fields, notEqCondition).should
        .match(new RegExp('part:updatedAt NOT BETWEEN TIMESTAMP "2015-08-1\\dT\\d\\d:00:00.000Z" AND TIMESTAMP "2015-08-1\\dT\\d\\d:59:59.999Z"'));
    });

    it('should add the latest timestamp to the date value of a > operation on datetimes', () => {
      const condition = Immutable.fromJS({
        op: OP_GT,
        path: 'ns2:part/updatedAt',
        value: '2015-08-16',
      });

      fieldConditionToNXQL(fields, condition).should
        .match(/part:updatedAt > TIMESTAMP "2015-08-1\dT\d\d:59:59.999Z"/);
    });

    it('should add the latest timestamp to the date value of a <= operation on datetimes', () => {
      const condition = Immutable.fromJS({
        op: OP_LTE,
        path: 'ns2:part/updatedAt',
        value: '2015-08-16',
      });

      fieldConditionToNXQL(fields, condition).should
        .match(/part:updatedAt <= TIMESTAMP "2015-08-1\dT\d\d:59:59.999Z"/);
    });

    it('should add the earliest timestamp to the date value of other operations on datetimes', () => {
      const condition = Immutable.fromJS({
        op: OP_LT,
        path: 'ns2:part/updatedAt',
        value: '2015-08-16',
      });

      fieldConditionToNXQL(fields, condition).should
        .match(/part:updatedAt < TIMESTAMP "2015-08-1\dT\d\d:00:00.000Z"/);
    });

    it('should resolve the searchCompareField path when the condition has a comparison operator', () => {
      const condition = Immutable.fromJS({
        op: OP_LT,
        path: 'ns2:part/id',
        value: '2020.1',
      });

      fieldConditionToNXQL(fields, condition).should
        .match(/part:sortableID < "2020.1"/);
    });

    it('should not resolve the searchCompareField path when the condition does not have a comparison operator', () => {
      const condition = Immutable.fromJS({
        op: OP_CONTAIN,
        path: 'ns2:part/id',
        value: '2020.1',
      });

      fieldConditionToNXQL(fields, condition).should
        .match(/part:id ILIKE "%2020.1%"/);
    });
  });

  describe('advancedSearchConditionToNXQL', () => {
    const fields = {};

    it('should convert boolean conditions to NXQL', () => {
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

    it('should convert range conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/foo',
        value: ['q', 'z'],
      });

      advancedSearchConditionToNXQL(fields, condition).should
        .equal('part:foo BETWEEN "q" AND "z"');
    });

    it('should convert field conditions to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_GT,
        path: 'ns2:part/foo',
        value: 'bar',
      });

      advancedSearchConditionToNXQL(fields, condition).should
        .equal('part:foo > "bar"');
    });

    it('should return null for a null condition', () => {
      expect(advancedSearchConditionToNXQL(fields, null)).to.equal(null);
    });
  });

  describe('structuredDateFieldConditionToNXQL', () => {
    const fields = {
      document: {
        'ns2:part': {
          fuzzyDate: {
            [configKey]: {
              dataType: DATA_TYPE_STRUCTURED_DATE,
            },
            dateEarliestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
            dateLatestScalarValue: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
              },
            },
          },
        },
      },
    };

    it('should convert range operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_RANGE,
        path: 'ns2:part/fuzzyDate',
        value: ['2000-01-01', '2000-12-31'],
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue <= TIMESTAMP "2000-12-31T00:00:00.000Z" AND part:fuzzyDate/dateLatestScalarValue > TIMESTAMP "2000-01-01T00:00:00.000Z")');
    });

    it('should convert not range operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_RANGE,
        path: 'ns2:part/fuzzyDate',
        value: ['2000-01-01', '2000-12-31'],
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue > TIMESTAMP "2000-12-31T00:00:00.000Z" OR part:fuzzyDate/dateLatestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z")');
    });

    it('should convert contain operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_CONTAIN,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z" AND part:fuzzyDate/dateLatestScalarValue > TIMESTAMP "2000-01-01T00:00:00.000Z")');
    });

    it('should convert not contain operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_CONTAIN,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue > TIMESTAMP "2000-01-01T00:00:00.000Z" OR part:fuzzyDate/dateLatestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z")');
    });

    it('should convert = operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_EQ,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue = TIMESTAMP "2000-01-01T00:00:00.000Z" AND part:fuzzyDate/dateLatestScalarValue = TIMESTAMP "2000-01-02T00:00:00.000Z")');
    });

    it('should convert not = operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_EQ,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue <> TIMESTAMP "2000-01-01T00:00:00.000Z" OR part:fuzzyDate/dateLatestScalarValue <> TIMESTAMP "2000-01-02T00:00:00.000Z")');
    });

    it('should convert < operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_LT,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('part:fuzzyDate/dateLatestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z"');
    });

    it('should convert < or contains operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_LTC,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('part:fuzzyDate/dateEarliestScalarValue <= TIMESTAMP "2000-01-01T00:00:00.000Z"');
    });

    it('should convert > operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_GT,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('part:fuzzyDate/dateEarliestScalarValue > TIMESTAMP "2000-01-01T00:00:00.000Z"');
    });

    it('should convert > or contains operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_GTC,
        path: 'ns2:part/fuzzyDate',
        value: '2000-01-01',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('part:fuzzyDate/dateLatestScalarValue > TIMESTAMP "2000-01-01T00:00:00.000Z"');
    });

    it('should convert complete operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_COMPLETE,
        path: 'ns2:part/fuzzyDate',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue IS NOT NULL AND part:fuzzyDate/dateLatestScalarValue IS NOT NULL)');
    });

    it('should convert not complete operations to NXQL', () => {
      const condition = Immutable.fromJS({
        op: OP_NOT_COMPLETE,
        path: 'ns2:part/fuzzyDate',
      });

      structuredDateFieldConditionToNXQL(fields, condition).should
        .equal('(part:fuzzyDate/dateEarliestScalarValue IS NULL OR part:fuzzyDate/dateLatestScalarValue IS NULL)');
    });
  });

  describe('searchDescriptorToLocation', () => {
    it('should put the record type, vocabulary, csid, and subresource into the location\'s pathname', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'person',
        vocabulary: 'local',
        csid: '1234',
        subresource: 'terms',
        searchQuery: {},
      });

      searchDescriptorToLocation(searchDescriptor).should.include({
        pathname: '/list/person/local/1234/terms',
      });
    });

    it('should stringify the searchQuery, and put it into the location\'s search', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'person',
        vocabulary: 'local',
        csid: '1234',
        subresource: 'terms',
        searchQuery: {
          p: 2,
          size: 10,
          as: {
            op: OP_GT,
            path: 'ns2:part/foo',
            value: 'bar',
          },
        },
      });

      searchDescriptorToLocation(searchDescriptor).should.deep.equal({
        pathname: '/list/person/local/1234/terms',
        search: '?p=3&size=10&as=%7B%22op%22%3A%22gt%22%2C%22path%22%3A%22ns2%3Apart%2Ffoo%22%2C%22value%22%3A%22bar%22%7D',
      });
    });

    it('should increment the page number by one (to make it human readable)', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 0,
          size: 10,
        },
      });

      searchDescriptorToLocation(searchDescriptor).should.deep.equal({
        pathname: '/list/collectionobject',
        search: '?p=1&size=10',
      });
    });
  });

  describe('getListType', () => {
    it('should return the list type of the given search descriptor\'s subresource, if it has one', () => {
      const config = {
        subresources: {
          refs: {
            listType: 'refDoc',
          },
        },
      };

      const searchDescriptor = Immutable.fromJS({
        recordType: 'person',
        vocabulary: 'local',
        subresource: 'refs',
      });

      getListType(config, searchDescriptor).should.equal('refDoc');
    });

    it('should return \'common\' if the given search desriptor does not have a subresource', () => {
      const config = {
        subresources: {
          refs: {
            listType: 'refDoc',
          },
        },
      };

      const searchDescriptor = Immutable.fromJS({
        recordType: 'group',
      });

      getListType(config, searchDescriptor).should.equal('common');
    });
  });

  describe('getNextPageSearchDescriptor', () => {
    it('should increment the page number of the given search descriptor', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 6,
          size: 20,
        },
      });

      getNextPageSearchDescriptor(searchDescriptor).should.equal(Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 7,
          size: 20,
        },
      }));
    });

    it('should treat the given search descriptor as having page 0 if it has no page', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          size: 20,
        },
      });

      getNextPageSearchDescriptor(searchDescriptor).should.equal(Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 1,
          size: 20,
        },
      }));
    });
  });

  describe('getPreviousPageSearchDescriptor', () => {
    it('should decrement the page number of the given search descriptor', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 6,
          size: 20,
        },
      });

      getPreviousPageSearchDescriptor(searchDescriptor).should.equal(Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 5,
          size: 20,
        },
      }));
    });

    it('should return null if the given search descriptor is on page 0', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          p: 0,
          size: 20,
        },
      });

      expect(getPreviousPageSearchDescriptor(searchDescriptor)).to.equal(null);
    });

    it('should treat the given search descriptor as having page 0 if it has no page', () => {
      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobject',
        searchQuery: {
          size: 20,
        },
      });

      expect(getPreviousPageSearchDescriptor(searchDescriptor)).to.equal(null);
    });
  });

  describe('getFirstItem', () => {
    it('should return the first item of a list result', () => {
      const config = {
        listTypes: {
          myListType: {
            listNodeName: 'my-list',
            itemNodeName: 'list-item',
          },
        },
      };

      const listData = Immutable.fromJS({
        'my-list': {
          'list-item': [
            {
              foo: 'abc',
            },
            {
              foo: 'def',
            },
            {
              foo: 'ghi',
            },
          ],
        },
      });

      getFirstItem(config, listData, 'myListType').should.equal(Immutable.Map({
        foo: 'abc',
      }));
    });

    it('should return undefined if there are no items in the list result', () => {
      const config = {
        listTypes: {
          myListType: {
            listNodeName: 'my-list',
            itemNodeName: 'list-item',
          },
        },
      };

      const listData = Immutable.fromJS({
        'my-list': {},
      });

      expect(getFirstItem(config, listData, 'myListType')).to.equal(undefined);
    });

    it('should return the item in a single (non-array) list result', () => {
      const config = {
        listTypes: {
          myListType: {
            listNodeName: 'my-list',
            itemNodeName: 'list-item',
          },
        },
      };

      const listData = Immutable.fromJS({
        'my-list': {
          'list-item': {
            foo: 'abc',
          },
        },
      });

      getFirstItem(config, listData, 'myListType').should.equal(Immutable.Map({
        foo: 'abc',
      }));
    });

    it('should default to the \'common\' list type if no list type is supplied', () => {
      const config = {
        listTypes: {
          common: {
            listNodeName: 'ns2:abstract-common-list',
            itemNodeName: 'list-item',
          },
        },
      };

      const listData = Immutable.fromJS({
        'ns2:abstract-common-list': {
          'list-item': [
            {
              foo: 'abc',
            },
            {
              foo: 'def',
            },
            {
              foo: 'ghi',
            },
          ],
        },
      });

      getFirstItem(config, listData).should.equal(Immutable.Map({
        foo: 'abc',
      }));
    });

    it('should return null if the specified list type is not found in the configuration', () => {
      const config = {
        listTypes: {
          common: {
            listNodeName: 'ns2:abstract-common-list',
            itemNodeName: 'list-item',
          },
        },
      };

      const listData = Immutable.Map();

      expect(getFirstItem(config, listData, 'badListType')).to.equal(null);
    });

    it('should return null if no list data is supplied', () => {
      const config = {
        listTypes: {
          common: {
            listNodeName: 'ns2:abstract-common-list',
            itemNodeName: 'list-item',
          },
        },
      };

      expect(getFirstItem(config)).to.equal(null);
    });
  });

  describe('getSubrecordSearchName', () => {
    it('should return the search name for the given csid and subrecord name', () => {
      const csid = '1234';
      const subrecordName = 'contact';

      getSubrecordSearchName(csid, subrecordName).should.equal(`subrecord/${csid}/${subrecordName}`);
    });
  });

  describe('clearAdvancedSearchConditionValues', () => {
    it('should clear values from field conditions in the search condition', () => {
      const condition = Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'path1',
            value: 'value1',
          },
          {
            op: OP_OR,
            value: [
              {
                op: OP_RANGE,
                path: 'path2',
                value: ['value2-1', 'value2-2'],
              },
              {
                op: OP_NULL,
                path: 'path3',
              },
              {
                op: OP_GROUP,
                value: {
                  op: OP_AND,
                  value: {
                    op: OP_EQ,
                    path: 'path6',
                    value: 'value 6',
                  },
                },
              },
            ],
          },
          {
            op: OP_GROUP,
            path: 'path3',
            value: {
              op: OP_AND,
              value: [
                {
                  op: OP_GT,
                  path: 'path4',
                  value: 'value4',
                },
                {
                  op: OP_LT,
                  path: 'path5',
                  value: 'value5',
                },
              ],
            },
          },
        ],
      });

      clearAdvancedSearchConditionValues(condition).should.equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'path1',
          },
          {
            op: OP_OR,
            value: [
              {
                op: OP_RANGE,
                path: 'path2',
              },
              {
                op: OP_NULL,
                path: 'path3',
              },
              {
                op: OP_GROUP,
                value: {
                  op: OP_AND,
                  value: {
                    op: OP_EQ,
                    path: 'path6',
                  },
                },
              },
            ],
          },
          {
            op: OP_GROUP,
            path: 'path3',
            value: {
              op: OP_AND,
              value: [
                {
                  op: OP_GT,
                  path: 'path4',
                },
                {
                  op: OP_LT,
                  path: 'path5',
                },
              ],
            },
          },
        ],
      }));
    });

    it('should return the condition if it is null or undefined', () => {
      expect(clearAdvancedSearchConditionValues(null)).to.equal(null);
      expect(clearAdvancedSearchConditionValues(undefined)).to.equal(undefined);
    });
  });
});
