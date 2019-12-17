/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import { configKey } from '../../../src/helpers/configHelpers';

import {
  ERR_DATA_TYPE,
  ERR_MISSING_REQ_FIELD,
  ERR_UNABLE_TO_VALIDATE,
  ERR_VALIDATION,
} from '../../../src/constants/errorCodes';

import {
  DATA_TYPE_BOOL,
  DATA_TYPE_DATE,
  DATA_TYPE_DATETIME,
  DATA_TYPE_FLOAT,
  DATA_TYPE_INT,
  DATA_TYPE_MAP,
  DATA_TYPE_STRING,
} from '../../../src/constants/dataTypes';

import {
  placeholderCsid,
} from '../../../src/helpers/relationListHelpers';

import {
  applyDefaults,
  attributePropertiesToTop,
  clearUncloneable,
  cloneRecordData,
  computeField,
  computeRecordData,
  copyValue,
  createBlankRecord,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
  getCommonFieldValue,
  getCoreFieldValue,
  getCsid,
  getRefName,
  getDocument,
  getPart,
  getPartPropertyName,
  getPartNSPropertyName,
  getCreatedTimestamp,
  getCreatedUser,
  getStickyFieldValues,
  getUpdatedTimestamp,
  getUpdatedUser,
  getWorkflowState,
  hasHierarchyRelations,
  hasNarrowerHierarchyRelations,
  initializeChildren,
  isNewRecord,
  isExistingRecord,
  isRecordDeprecated,
  isRecordImmutable,
  isRecordLocked,
  isRecordReplicated,
  isSecurityRecordImmutable,
  normalizeFieldValue,
  normalizeRecordData,
  prepareClonedHierarchy,
  prepareForSending,
  setXmlNamespaceAttribute,
  spreadDefaultValue,
  validateField,
  validateRecordData,
  ERROR_KEY,
} from '../../../src/helpers/recordDataHelpers';

const { expect } = chai;

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.should();

describe('recordDataHelpers', () => {
  describe('getPartPropertyName', () => {
    it('should return the part name prepended with the namespace prefix', () => {
      getPartPropertyName('collectionspace_core').should.equal('ns2:collectionspace_core');
    });
  });

  describe('getPartNSPropertyName', () => {
    it('should return the suppplied namespace prefix prepended with \'@xmlns:\'', () => {
      getPartNSPropertyName('ns2').should.equal('@xmlns:ns2');
    });
  });

  describe('getPart', () => {
    it('should return the named part from the given data', () => {
      const corePart = Immutable.Map();

      const data = Immutable.fromJS({
        document: {
          '@name': 'groups',
          'ns2:collectionspace_core': corePart,
        },
      });

      getPart(data, 'collectionspace_core').should.equal(corePart);
    });
  });

  describe('deepGet', () => {
    it('should throw when path is not an array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepGet.bind(data, 'color')).to.throw(Error);
    });

    it('should throw when path is an empty array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepGet.bind(data, [])).to.throw(Error);
    });

    it('should return undefined when data is null or undefined', () => {
      expect(deepGet(null, ['color'])).to.equal(undefined);
      expect(deepGet(undefined, ['color'])).to.equal(undefined);
    });

    it('should get a child value', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      deepGet(data, ['color']).should.equal('red');
    });

    it('should get a nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
        },
      });

      deepGet(data, ['common', 'color']).should.equal('red');
    });

    it('should get a deeply nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      deepGet(data, ['common', 'otherNumber', 'number']).should.equal('123');
    });

    it('should return undefined for a non-existent path', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      expect(deepGet(data, ['common', 'something', 'number'])).to.equal(undefined);
    });

    it('should get a nested list value', () => {
      const data = Immutable.fromJS({
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      deepGet(data, ['comment', '0']).should.equal('comment 1');
      deepGet(data, ['comment', '1']).should.equal('comment 2');
    });

    it('should set a deeply nested list value', () => {
      const data = Immutable.fromJS({
        common: {
          otherNumber: [
            {
              number: '123',
              type: 'type 1',
              comment: [
                'number comment 1',
                'number comment 2',
              ],
            },
            {
              number: '456',
              type: 'type 2',
            },
          ],
        },
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      deepGet(data, ['common', 'otherNumber', '0', 'comment', '1']).should.equal('number comment 2');
    });

    it('should treat a single (non-list) value as a list when it is keyed by \'0\'', () => {
      const data = Immutable.fromJS({
        common: {
          otherNumber: {
            number: '123',
            type: 'type 1',
            comment: [
              'number comment 1',
              'number comment 2',
            ],
          },
        },
      });

      deepGet(data, ['common', 'otherNumber', '0', 'comment', '1']).should.equal('number comment 2');
      deepGet(data, ['common', 'otherNumber', '0', 'number', '0']).should.equal('123');
    });
  });

  describe('deepSet', () => {
    it('should throw when path is not an array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepSet.bind(data, 'color', 'blue')).to.throw(Error);
    });

    it('should throw when path is an empty array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepSet.bind(data, [], 'blue')).to.throw(Error);
    });

    it('should set a child value', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      let updatedData;

      updatedData = deepSet(data, ['color'], 'blue').toJS();

      updatedData.should.deep.equal({
        color: 'blue',
      });

      updatedData = deepSet(data, ['name'], 'name 1').toJS();

      updatedData.should.deep.equal({
        color: 'red',
        name: 'name 1',
      });
    });

    it('should set a nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
        },
      });

      const updatedData = deepSet(data, ['common', 'color'], 'blue').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'blue',
        },
      });
    });

    it('should set a deeply nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      const updatedData = deepSet(data, ['common', 'otherNumber', 'number'], '456').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '456',
          },
        },
      });
    });

    it('should set a nested list value', () => {
      const data = Immutable.fromJS({
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      const updatedData = deepSet(data, ['comment', '1'], 'new comment').toJS();

      updatedData.should.deep.equal({
        comment: [
          'comment 1',
          'new comment',
        ],
      });
    });

    it('should set a deeply nested list value', () => {
      const data = Immutable.fromJS({
        common: {
          otherNumber: [
            {
              number: '123',
              type: 'type 1',
              comment: [
                'number comment 1',
                'number comment 2',
              ],
            },
            {
              number: '456',
              type: 'type 2',
            },
          ],
        },
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      const updatedData = deepSet(data,
        ['common', 'otherNumber', '0', 'comment', '1'], 'new type').toJS();

      updatedData.should.deep.equal({
        common: {
          otherNumber: [
            {
              number: '123',
              type: 'type 1',
              comment: [
                'number comment 1',
                'new type',
              ],
            },
            {
              number: '456',
              type: 'type 2',
            },
          ],
        },
        comment: [
          'comment 1',
          'comment 2',
        ],
      });
    });

    it('should create missing Maps', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      let updatedData;

      updatedData = deepSet(data, ['common', 'titleGroup', 'title'], 'title 1').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
          titleGroup: {
            title: 'title 1',
          },
        },
      });

      updatedData = deepSet(data,
        ['common', 'otherNumber', 'nestedGroup', 'nestedField'], 'some value').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
            nestedGroup: {
              nestedField: 'some value',
            },
          },
        },
      });
    });

    it('should create missing Lists', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      const updatedData = deepSet(data,
        ['common', 'titleGroupList', 'titleGroup', '0', 'title'], 'title 1').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
          titleGroupList: {
            titleGroup: [
              {
                title: 'title 1',
              },
            ],
          },
        },
      });
    });

    it('should promote non-list values to lists when keyed with a numeric key', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      let updatedData;

      updatedData = deepSet(data, ['common', 'color', '1'], 'blue').toJS();

      updatedData.should.deep.equal({
        common: {
          color: [
            'red',
            'blue',
          ],
          otherNumber: {
            number: '123',
          },
        },
      });

      updatedData = deepSet(data, ['common', 'otherNumber', '1', 'number'], '456').toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: [
            {
              number: '123',
            },
            {
              number: '456',
            },
          ],
        },
      });
    });
  });

  describe('deepDelete', () => {
    it('should throw when path is not an array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepDelete.bind(data, 'color')).to.throw(Error);
    });

    it('should throw when path is an empty array', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepDelete.bind(data, [])).to.throw(Error);
    });

    it('should delete a child value', () => {
      const data = Immutable.fromJS({
        color: 'red',
      });

      const updatedData = deepDelete(data, ['color']).toJS();

      updatedData.should.deep.equal({});
    });

    it('should delete a nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
        },
      });

      const updatedData = deepDelete(data, ['common', 'color']).toJS();

      updatedData.should.deep.equal({
        common: {},
      });
    });

    it('should delete a deeply nested Map value', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      const updatedData = deepDelete(data, ['common', 'otherNumber', 'number']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {},
        },
      });
    });

    it('should delete a nested list value', () => {
      const data = Immutable.fromJS({
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      const updatedData = deepDelete(data, ['comment', '1']).toJS();

      updatedData.should.deep.equal({
        comment: [
          'comment 1',
        ],
      });
    });

    it('should delete a deeply nested list value', () => {
      const data = Immutable.fromJS({
        common: {
          otherNumber: [
            {
              number: '123',
              type: 'type 1',
              comment: [
                'number comment 1',
                'number comment 2',
              ],
            },
            {
              number: '456',
              type: 'type 2',
            },
          ],
        },
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      const updatedData = deepDelete(data,
        ['common', 'otherNumber', '0', 'comment', '1']).toJS();

      updatedData.should.deep.equal({
        common: {
          otherNumber: [
            {
              number: '123',
              type: 'type 1',
              comment: [
                'number comment 1',
              ],
            },
            {
              number: '456',
              type: 'type 2',
            },
          ],
        },
        comment: [
          'comment 1',
          'comment 2',
        ],
      });
    });

    it('should create missing Maps', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      let updatedData;

      updatedData = deepDelete(data, ['common', 'titleGroup', 'title']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
          titleGroup: {},
        },
      });

      updatedData = deepDelete(data,
        ['common', 'otherNumber', 'nestedGroup', 'nestedField']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
            nestedGroup: {},
          },
        },
      });
    });

    it('should create missing Lists', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      const updatedData = deepDelete(data,
        ['common', 'titleGroupList', 'titleGroup', '0', 'title']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
          titleGroupList: {
            titleGroup: [
              {},
            ],
          },
        },
      });
    });

    it('should promote non-list values to lists when keyed with a numeric key', () => {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
          otherNumber: {
            number: '123',
          },
        },
      });

      let updatedData;

      updatedData = deepDelete(data, ['common', 'color', '1']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: [
            'red',
          ],
          otherNumber: {
            number: '123',
          },
        },
      });

      updatedData = deepDelete(data, ['common', 'otherNumber', '1', 'number']).toJS();

      updatedData.should.deep.equal({
        common: {
          color: 'red',
          otherNumber: [
            {
              number: '123',
            },
            {},
          ],
        },
      });
    });
  });

  describe('createBlankRecord', () => {
    const groupConfig = {
      fields: {
        document: {
          'ns2:groups_common': {
            [configKey]: {
              service: {
                ns: 'http://collectionspace.org/services/group',
              },
            },
          },
          'ns2:groups_extension': {
            [configKey]: {
              service: {
                ns: 'http://collectionspace.org/services/extension/group',
              },
            },
          },
        },
      },
    };

    const roleConfig = {
      fields: {
        'ns2:role': {
          [configKey]: {
            service: {
              ns: 'http://collectionspace.org/services/role',
            },
          },
        },
      },
    };

    it('should return an Immutable.Map', () => {
      Immutable.Map.isMap(createBlankRecord(groupConfig)).should.equal(true);
    });

    it('should create properties for the document', () => {
      const data = createBlankRecord(roleConfig);

      data.get('ns2:role').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/role',
      });
    });

    it('should create properties for each part', () => {
      const data = createBlankRecord(groupConfig);

      data.get('document').get('ns2:groups_common').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/group',
      });

      data.get('document').get('ns2:groups_extension').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/extension/group',
      });
    });
  });

  describe('createRecordData', () => {
    const recordTypeConfig = {
      serviceConfig: {
        documentName: 'groups',
      },
      fields: {
        document: {
          'ns2:groups_common': {
            [configKey]: {
              service: {
                ns: 'http://collectionspace.org/services/group',
              },
            },
          },
          'ns2:groups_extension': {
            [configKey]: {
              service: {
                ns: 'http://collectionspace.org/services/extension/group',
              },
            },
          },
        },
      },
    };

    it('should return an Immutable.Map', () => {
      Immutable.Map.isMap(createRecordData(recordTypeConfig)).should.equal(true);
    });

    it('should have a document property', () => {
      createRecordData(recordTypeConfig).get('document').should.be.an('object');
    });
  });

  describe('getDocument', () => {
    const recordData = Immutable.Map({
      document: {
        '@name': 'collectionobjects',
      },
    });

    it('should return the document object from the record data', () => {
      getDocument(recordData).should
        .be.an('object')
        .with.property('@name', 'collectionobjects');
    });
  });

  describe('attributePropertiesToTop', () => {
    it('should return -1 if the first argument starts with \'@\' and the second does not', () => {
      attributePropertiesToTop('@foo', 'bar').should.equal(-1);
    });

    it('should return 1 if the second argument starts with \'@\' and the first does not', () => {
      attributePropertiesToTop('foo', '@bar').should.equal(1);
    });

    it('should return 0 if both arguments start with \'@\'', () => {
      attributePropertiesToTop('@foo', '@bar').should.equal(0);
    });

    it('should return 0 if neither argument starts with \'@\'', () => {
      attributePropertiesToTop('foo', 'bar').should.equal(0);
    });
  });

  describe('prepareForSending', () => {
    const recordData = Immutable.fromJS({
      document: {
        '@name': 'groups',
        'ns2:collectionspace_core': {},
        'ns2:groups_common': {
          name: 'Name',
          '@attr1': 'Attribute 1',
          date: '2000-01-01',
          '@xmlns:ns2': 'http://collectionspace.org',
        },
        'ns2:groups_extension': {
          blobCsid: 'not a csid',
        },
        'ns2:account_permission': {},
        'rel:relations-common-list': {
          'relation-list-item': [
            {
              predicate: 'hasBroader',
              relationshipMetaType: undefined,
              subject: {
                refName: undefined,
              },
              object: {
                csid: '1111',
              },
            },
            {
              predicate: 'hasBroader',
              relationshipMetaType: undefined,
              subject: {
                csid: '1111',
              },
              object: {
                refName: undefined,
              },
            },
          ],
        },
      },
    });

    const recordTypeConfig = {
      subrecords: {
        blob: {
          csidField: ['document', 'ns2:groups_extension', 'blobCsid'],
        },
      },
    };

    it('should remove the collectionspace_core part', () => {
      prepareForSending(recordData, recordTypeConfig).get('document').has('ns2:collectionspace_core').should.equal(false);
    });

    it('should remove the account_permission part', () => {
      prepareForSending(recordData, recordTypeConfig).get('document').has('ns2:account_permission').should.equal(false);
    });

    it('should sort attribute and namespace declaration properties to the top of each part', () => {
      prepareForSending(recordData, recordTypeConfig).get('document').get('ns2:groups_common').keySeq()
        .toArray().should.deep.equal(['@attr1', '@xmlns:ns2', 'name', 'date']);
    });

    it('should filter out incomplete relation items', () => {
      prepareForSending(recordData, recordTypeConfig)
        .getIn(['document', 'rel:relations-common-list', 'relation-list-item']).size.should
        .equal(0);
    });

    it('should filter out incomplete relation items', () => {
      prepareForSending(recordData, recordTypeConfig)
        .getIn(['document', 'rel:relations-common-list', 'relation-list-item']).size.should
        .equal(0);
    });

    it('should set subrecord csid fields that don\'t contain valid csids to null', () => {
      expect(
        prepareForSending(recordData, recordTypeConfig)
          .getIn(['document', 'ns2:groups_extension', 'blobCsid']),
      ).to.equal(null);
    });

    it('should sort attribute and namespace properties of the root to the top', () => {
      const roleRecordData = Immutable.fromJS({
        'ns2:role': {
          createdAt: '1234',
          '@csid': 'abcd',
          displayName: 'Test Role',
          '@xmlns:ns2': 'http://collectionspace.org',
        },
      });

      prepareForSending(roleRecordData, recordTypeConfig).get('ns2:role').keySeq()
        .toArray().should.deep.equal(['@csid', '@xmlns:ns2', 'createdAt', 'displayName']);
    });

    it('should call a configured prepareForSending function', () => {
      let prepareForSendingData = null;
      let prepareForSendingRecordTypeConfig = null;

      const customRecordTypeConfig = {
        ...recordTypeConfig,
        prepareForSending: (dataArg, recordTypeConfigArg) => {
          prepareForSendingData = dataArg;
          prepareForSendingRecordTypeConfig = recordTypeConfigArg;

          return dataArg.setIn(['document', 'ns2:groups_common', 'prepared'], true);
        },
      };

      prepareForSending(recordData, customRecordTypeConfig)
        .getIn(['document', 'ns2:groups_common', 'prepared']).should.equal(true);

      prepareForSendingData.should.equal(recordData);
      prepareForSendingRecordTypeConfig.should.equal(customRecordTypeConfig);
    });
  });

  describe('copyValue', () => {
    it('should copy a scalar value from the source to the destination', () => {
      const sourceData = Immutable.fromJS({
        foo: 'abc',
      });

      const destData = Immutable.fromJS({
        bar: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: 'abc',
        bar: 'xyz',
      }));
    });

    it('should overwrite existing destination values', () => {
      const sourceData = Immutable.fromJS({
        foo: 'abc',
      });

      const destData = Immutable.fromJS({
        foo: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: 'abc',
      }));
    });

    it('should copy a list value from the source to the destination', () => {
      const sourceData = Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
      });

      const destData = Immutable.fromJS({
        bar: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
        bar: 'xyz',
      }));
    });

    it('should overwrite an existing scalar value with a list value copied from the source', () => {
      const sourceData = Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
      });

      const destData = Immutable.fromJS({
        foo: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
      }));
    });

    it('should overwrite an existing list value with a list value copied from the source', () => {
      const sourceData = Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
      });

      const destData = Immutable.fromJS({
        foo: ['a', 'b'],
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: ['value 1', 'value 2', 'value 3'],
      }));
    });

    it('should recursively copy a complex value from the source to the destination', () => {
      const sourceData = Immutable.fromJS({
        foo: {
          child1: {
            child2: {
              child3: 'abc',
            },
            child4: 'def',
          },
        },
      });

      const destData = Immutable.fromJS({
        bar: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: {
          child1: {
            child2: {
              child3: 'abc',
            },
            child4: 'def',
          },
        },
        bar: 'xyz',
      }));
    });

    it('should recursively copy lists of complex values from the source to the destination', () => {
      const sourceData = Immutable.fromJS({
        foo: {
          child1: [
            {
              child2: {
                child3: 'abc',
              },
            },
            {
              child2: {
                child3: 'ghi',
              },
              child4: 'jkl',
            },
            {
              child2: {
                child3: 'mno',
              },
              child4: 'pqr',
            },
          ],
          baz: '123',
        },
      });

      const destData = Immutable.fromJS({
        foo: {
          child1: [
            {
              child2: {
                child3: 'xyz',
              },
              child4: 'def',
            },
          ],
        },
        bar: 'xyz',
      });

      copyValue(['foo'], sourceData, destData).should.equal(Immutable.fromJS({
        foo: {
          child1: [
            {
              child2: {
                child3: 'abc',
              },
            },
            {
              child2: {
                child3: 'ghi',
              },
              child4: 'jkl',
            },
            {
              child2: {
                child3: 'mno',
              },
              child4: 'pqr',
            },
          ],
          baz: '123',
        },
        bar: 'xyz',
      }));
    });
  });

  describe('spreadDefaultValue', () => {
    it('should set the value if the path does not exist', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {},
        },
      });

      const updatedData = spreadDefaultValue(
        'new',
        [
          'document',
          'common',
          'recordStatus',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'new',
          },
        },
      });
    });

    it('should set the value if the current value is undefined', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            recordStatus: undefined,
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'new',
        [
          'document',
          'common',
          'recordStatus',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'new',
          },
        },
      });
    });

    it('should not set the value if the current value is not undefined', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            recordStatus: 'in progress',
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'new',
        [
          'document',
          'common',
          'recordStatus',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'in progress',
          },
        },
      });
    });

    it('should return the data unchanged if it is an unexpected type', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: '1234',
        },
      });

      const updatedData = spreadDefaultValue(
        'new',
        [
          'document',
          'common',
          'recordStatus',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: '1234',
        },
      });
    });

    it('should set the value in all existing undefined instances of a repeating field', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            comments: {
              comment: [
                undefined,
                'hello',
                undefined,
              ],
            },
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'defaultval',
        [
          'document',
          'common',
          'comments',
          'comment',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            comments: {
              comment: [
                'defaultval',
                'hello',
                'defaultval',
              ],
            },
          },
        },
      });
    });

    it('should set the value in all existing instances of a field in a repeating group', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                },
                {
                  title: 'Another Title',
                },
              ],
            },
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'defaultval',
        [
          'document',
          'common',
          'titleGroupList',
          'titleGroup',
          'titleLanguage',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                  titleLanguage: 'defaultval',
                },
                {
                  title: 'Another Title',
                  titleLanguage: 'defaultval',
                },
              ],
            },
          },
        },
      });
    });

    it('should set the value in all existing instances of a field in a nested repeating group', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Le titre',
                      },
                      {
                        titleTranslation: 'El título',
                      },
                    ],
                  },
                },
                {
                  title: 'Another Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Un autre titre',
                        titleTranslationLanguage: 'French',
                      },
                      {
                        titleTranslation: 'Otre título',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'defaultval',
        [
          'document',
          'common',
          'titleGroupList',
          'titleGroup',
          'titleTranslationSubgroupList',
          'titleTranslationSubgroup',
          'titleTranslationLanguage',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Le titre',
                        titleTranslationLanguage: 'defaultval',
                      },
                      {
                        titleTranslation: 'El título',
                        titleTranslationLanguage: 'defaultval',
                      },
                    ],
                  },
                },
                {
                  title: 'Another Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Un autre titre',
                        titleTranslationLanguage: 'French',
                      },
                      {
                        titleTranslation: 'Otre título',
                        titleTranslationLanguage: 'defaultval',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });
    });

    it('should set the value in undefined instances of a repeating group', () => {
      const recordData = Immutable.fromJS({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Le titre',
                        titleTranslationLanguage: 'French',
                      },
                      undefined,
                    ],
                  },
                },
              ],
            },
          },
        },
      });

      const updatedData = spreadDefaultValue(
        'defaultval',
        [
          'document',
          'common',
          'titleGroupList',
          'titleGroup',
          'titleTranslationSubgroupList',
          'titleTranslationSubgroup',
          'titleTranslationLanguage',
        ],
        recordData,
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            number: '123',
            titleGroupList: {
              titleGroup: [
                {
                  title: 'The Title',
                  titleLanguage: 'English',
                  titleTranslationSubgroupList: {
                    titleTranslationSubgroup: [
                      {
                        titleTranslation: 'Le titre',
                        titleTranslationLanguage: 'French',
                      },
                      {
                        titleTranslationLanguage: 'defaultval',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      });
    });
  });

  describe('applyDefaults', () => {
    it('should set all default values from config into the data', () => {
      const fieldDescriptor = {
        document: {
          common: {
            recordStatus: {
              [configKey]: {
                defaultValue: 'new',
              },
            },
            titleGroupList: {
              titleGroup: {
                titleLanguage: {
                  [configKey]: {
                    defaultValue: 'English',
                  },
                },
              },
            },
          },
        },
      };

      const recordData = Immutable.Map();

      const updatedData = applyDefaults(fieldDescriptor, recordData);

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'new',
            titleGroupList: {
              titleGroup: {
                titleLanguage: 'English',
              },
            },
          },
        },
      });
    });
  });

  describe('initializeChildren', () => {
    it('should set undefined children to null', () => {
      const fieldDescriptor = {
        [configKey]: {},
        field1: {
          [configKey]: {},
        },
        field2: {
          [configKey]: {},
        },
        field3: {
          [configKey]: {},
        },
      };

      const data = Immutable.fromJS({
        field3: 'foo',
      });

      const updatedData = initializeChildren(fieldDescriptor, data);

      updatedData.toJS().should.deep.equal({
        field1: null,
        field2: null,
        field3: 'foo',
      });
    });

    it('should return the data if the field descriptor does not define child fields', () => {
      const fieldDescriptor = {
        [configKey]: {},
      };

      const data = 'foo';

      const updatedData = initializeChildren(fieldDescriptor, data);

      updatedData.should.equal('foo');
    });
  });

  describe('clearUncloneable', () => {
    const recordTypeConfig = {
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: {
            [configKey]: {
              cloneable: false,
            },
          },
          recordStatus: {},
          foo: {
            [configKey]: {
              cloneable: false,
              defaultValue: 'the default',
            },
          },
          notes: {
            note: {
              [configKey]: {
                cloneable: false,
              },
            },
          },
          titleGroupList: {
            titleGroup: {
              title: {
                [configKey]: {
                  cloneable: false,
                },
              },
            },
          },
        },
      },
    };

    it('should set uncloneable fields with no default to undefined', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: 'something',
          },
        },
      });

      clearUncloneable(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: undefined,
          },
        },
      });
    });

    it('should set uncloneable fields with a default to the default', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            foo: 'something',
          },
        },
      });

      clearUncloneable(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:collectionobjects_common': {
            foo: 'the default',
          },
        },
      });
    });

    it('should do nothing to fields that are cloneable', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            recordStatus: 'something',
          },
        },
      });

      clearUncloneable(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:collectionobjects_common': {
            recordStatus: 'something',
          },
        },
      });
    });

    it('should clear all instances of a repeating field', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            notes: {
              note: [
                'value 1',
                'value 2',
                'value 3',
              ],
            },
          },
        },
      });

      clearUncloneable(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:collectionobjects_common': {
            notes: {
              note: undefined,
            },
          },
        },
      });
    });

    it('should clear all instances of a field in a repeating group', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            titleGroupList: {
              titleGroup: [
                {
                  title: 'Title 1',
                },
                {
                  title: 'Title 2',
                },
                {
                  title: 'Title 3',
                },
              ],
            },
          },
        },
      });

      clearUncloneable(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:collectionobjects_common': {
            titleGroupList: {
              titleGroup: [
                {
                  title: undefined,
                },
                {
                  title: undefined,
                },
                {
                  title: undefined,
                },
              ],
            },
          },
        },
      });
    });
  });

  describe('cloneRecordData', () => {
    const csid = '1234';

    const recordTypeConfig = {
      fields: {
        document: {
          'ns2:groups_common': {
            title: {
              [configKey]: {
                cloneable: false,
              },
            },
          },
        },
      },
    };

    it('should omit the collectionspace_core and account_permission parts', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
          'ns2:account_permission': {},
          'ns2:groups_common': {
            owner: 'Owner',
          },
        },
      });

      cloneRecordData(recordTypeConfig, csid, data).toJS().should.deep.equal({
        document: {
          'ns2:groups_common': {
            owner: 'Owner',
          },
        },
      });
    });

    it('should clear uncloneable fields', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
          'ns2:account_permission': {},
          'ns2:groups_common': {
            owner: 'Owner',
            title: 'Title',
          },
        },
      });

      cloneRecordData(recordTypeConfig, csid, data).toJS().should.deep.equal({
        document: {
          'ns2:groups_common': {
            owner: 'Owner',
            title: undefined,
          },
        },
      });
    });

    it('should prepare the record\'s hierarchy relations', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                subject: {
                  csid,
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid,
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid,
                },
              },
            ],
          },
          'ns2:collectionobjects_common': {},
        },
      });

      cloneRecordData(recordTypeConfig, csid, data).should.equal(Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                subject: {
                  csid: placeholderCsid,
                },
              },
            ],
          },
          'ns2:collectionobjects_common': {},
        },
      }));
    });

    it('should return undefined for undefined data', () => {
      expect(cloneRecordData(recordTypeConfig, csid, undefined)).to.equal(undefined);
    });
  });

  describe('prepareClonedHierarchy', () => {
    const fromCsid = '1234';

    it('should retain only the relation to a broader record, and set the subject csid to the new record placeholder', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                subject: {
                  csid: fromCsid,
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid: fromCsid,
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid: fromCsid,
                },
              },
            ],
          },
        },
      });

      prepareClonedHierarchy(fromCsid, data).should.equal(Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                subject: {
                  csid: placeholderCsid,
                },
              },
            ],
          },
        },
      }));
    });

    it('should delete all relations if there is no relation to a broader record', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': {
              predicate: 'hasBroader',
              subject: {
                csid: fromCsid,
              },
            },
          },
        },
      });

      prepareClonedHierarchy(fromCsid, data).should.equal(Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                subject: {
                  csid: placeholderCsid,
                },
              },
            ],
          },
        },
      }));
    });

    it('should handle a single (non-list) relation item', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                object: {
                  csid: fromCsid,
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid: fromCsid,
                },
              },
            ],
          },
        },
      });

      prepareClonedHierarchy(fromCsid, data).should.equal(Immutable.fromJS({
        document: {},
      }));
    });
  });

  describe('getCreatedTimestamp', () => {
    it('should return a core schema createdAt value', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            createdAt: '1234',
          },
        },
      });

      getCreatedTimestamp(data).should.equal('1234');
    });

    it('should return a top level createdAt value  ', () => {
      const data = Immutable.fromJS({
        'ns2:role': {
          createdAt: '1234',
        },
      });

      getCreatedTimestamp(data).should.equal('1234');
    });
  });

  describe('getCreatedUser', () => {
    it('should return the created timestamp', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            createdBy: 'user',
          },
        },
      });

      getCreatedUser(data).should.equal('user');
    });
  });

  describe('getUpdatedTimestamp', () => {
    it('should return a core schema updatedAt value', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            updatedAt: '1234',
          },
        },
      });

      getUpdatedTimestamp(data).should.equal('1234');
    });

    it('should return a top level updatedAt value', () => {
      const data = Immutable.fromJS({
        'ns2:role': {
          updatedAt: '1234',
        },
      });

      getUpdatedTimestamp(data).should.equal('1234');
    });
  });

  describe('getUpdatedUser', () => {
    it('should return the updated timestamp', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            updatedBy: 'user',
          },
        },
      });

      getUpdatedUser(data).should.equal('user');
    });
  });

  describe('getCommonFieldValue', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:groups_common': {
          foo: 'bar',
        },
      },
    });

    it('should return the specified field from the common part', () => {
      getCommonFieldValue(data, 'foo').should.equal('bar');
    });

    it('should return undefined if the field does not exist', () => {
      expect(getCommonFieldValue(data, 'baz')).to.equal(undefined);
    });

    it('should return undefined if the document key does not exist', () => {
      expect(getCommonFieldValue(Immutable.Map(), 'foo')).to.equal(undefined);
    });

    it('should return undefined if the data does not exist', () => {
      expect(getCommonFieldValue(null, 'foo')).to.equal(undefined);
    });
  });

  describe('getCoreFieldValue', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          foo: 'bar',
        },
      },
    });

    it('should return the specified field from the core part', () => {
      getCoreFieldValue(data, 'foo').should.equal('bar');
    });

    it('should return undefined if the field does not exist', () => {
      expect(getCoreFieldValue(data, 'baz')).to.equal(undefined);
    });

    it('should return undefined if the data does not exist', () => {
      expect(getCoreFieldValue(null, 'foo')).to.equal(undefined);
    });
  });

  describe('getCsid', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: '/some/path/1234',
        },
      },
    });

    it('should return the csid extracted from the uri field in the core part', () => {
      getCsid(data).should.equal('1234');
    });

    it('should return undefined if the data does not exist', () => {
      expect(getCsid()).to.equal(undefined);
    });
  });

  describe('getRefName', () => {
    const refName = 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(California1514611983069)\'California\'';

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          refName,
        },
      },
    });

    it('should return the refName extracted from the core part', () => {
      getRefName(data).should.equal(refName);
    });

    it('should return undefined if the data does not exist', () => {
      expect(getRefName()).to.equal(undefined);
    });
  });

  describe('validateField', () => {
    const fieldDescriptor = {
      id: {
        [configKey]: {
          required: true,
        },
      },
      color: {
        [configKey]: {},
      },
      count: {
        [configKey]: {
          dataType: DATA_TYPE_INT,
        },
      },
      date: {
        [configKey]: {
          dataType: DATA_TYPE_DATE,
        },
      },
      preferred: {
        [configKey]: {
          dataType: DATA_TYPE_BOOL,
        },
      },
      price: {
        [configKey]: {
          dataType: DATA_TYPE_FLOAT,
        },
      },
      time: {
        [configKey]: {
          dataType: DATA_TYPE_DATETIME,
        },
      },
      departments: {
        department: {
          [configKey]: {
            repeating: true,
          },
        },
      },
      ages: {
        age: {
          [configKey]: {
            dataType: DATA_TYPE_INT,
            repeating: true,
          },
        },
      },
      measurements: {
        measurement: {
          [configKey]: {
            repeating: true,
          },
          value: {
            [configKey]: {
              dataType: DATA_TYPE_FLOAT,
            },
          },
          unit: {
            [configKey]: {
              dataType: DATA_TYPE_STRING,
            },
          },
        },
      },
      negativeNumber: {
        [configKey]: {
          dataType: DATA_TYPE_INT,
          validate: ({ data }) => {
            if (data >= 0) {
              return {
                code: ERR_VALIDATION,
                message: {
                  id: 'negativeNumber.notNegative',
                  defaultMessage: 'Must be negative.',
                },
              };
            }

            return null;
          },
        },
      },
      zipCode: {
        [configKey]: {
          validate: ({ data }) => new Promise((resolve) => {
            window.setTimeout(() => {
              let error = null;

              if (!data.match(/^\d{5}$/)) {
                error = {
                  code: ERR_VALIDATION,
                  message: {
                    id: 'zipCode.invalid',
                    defaultMessage: 'Must be five digits.',
                  },
                };
              }

              resolve(error);
            }, 0);
          }),
        },
      },
      address: {
        [configKey]: {
          validate: () => new Promise((resolve, reject) => {
            window.setTimeout(() => {
              reject(new Error());
            }, 0);
          }),
        },
      },
    };

    it('should resolve to null if the value is valid', () => validateField({
      data: 'red',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: fieldDescriptor.color,
    }).should.eventually.equal(null));

    it('should resolve to an error if a required field is empty, null, or undefined', () => Promise.all([
      validateField({
        data: '',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.id,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_MISSING_REQ_FIELD,
        message: undefined,
      })),

      validateField({
        data: null,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.id,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_MISSING_REQ_FIELD,
        message: undefined,
      })),

      validateField({
        data: undefined,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.id,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_MISSING_REQ_FIELD,
        message: undefined,
      })),
    ]));

    it('should resolve to null if an integer field is valid', () => Promise.all([
      validateField({
        data: '1',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.count,
      }).should.eventually.equal(null),

      validateField({
        data: '-1',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.count,
      }).should.eventually.equal(null),

      validateField({
        data: '0',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.count,
      }).should.eventually.equal(null),
    ]));

    it('should resolve to an error if an integer field is invalid', () => Promise.all([
      validateField({
        data: 'a',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.count,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_INT,
        value: 'a',
      })),

      validateField({
        data: '24w',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.count,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_INT,
        value: '24w',
      })),
    ]));

    it('should resolve to null when no field descriptor is supplied', () => validateField({
      data: 'a',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: null,
    }).should.eventually.equal(null));

    it('should resolve to null if a float field is valid', () => Promise.all([
      validateField({
        data: '1.00',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),

      validateField({
        data: '-14.12',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),

      validateField({
        data: '32',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),

      validateField({
        data: '-1234',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),

      validateField({
        data: '.56',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),

      validateField({
        data: '-.2',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.equal(null),
    ]));

    it('should resolve to an error if a float field is invalid', () => Promise.all([
      validateField({
        data: 'a',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_FLOAT,
        value: 'a',
      })),

      validateField({
        data: '1.00.0',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_FLOAT,
        value: '1.00.0',
      })),

      validateField({
        data: '24.sd',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_FLOAT,
        value: '24.sd',
      })),

      validateField({
        data: '-24.sd',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_FLOAT,
        value: '-24.sd',
      })),

      validateField({
        data: '-',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.price,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_FLOAT,
        value: '-',
      })),
    ]));

    it('should resolve to null if a date field is valid', () => validateField({
      data: '1983-03-05',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: fieldDescriptor.date,
    }).should.eventually.equal(null));

    it('should resolve to an error if a date field is invalid', () => Promise.all([
      validateField({
        data: 'a',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.date,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_DATE,
        value: 'a',
      })),

      validateField({
        data: '1983-03-05T13:00:00',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.date,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_DATE,
        value: '1983-03-05T13:00:00',
      })),
    ]));

    it('should resolve to null if a datetime field is valid', () => validateField({
      data: '1983-03-05T13:45:23.000Z',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: fieldDescriptor.time,
    }).should.eventually.equal(null));

    it('should resolve to an error if a datetime field is invalid', () => Promise.all([
      validateField({
        data: 'a',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.time,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_DATETIME,
        value: 'a',
      })),

      validateField({
        data: '1983-03-05Z',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.time,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_DATETIME,
        value: '1983-03-05Z',
      })),
    ]));

    it('should resolve to null if a boolean field is valid', () => Promise.all([
      validateField({
        data: true,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.preferred,
      }).should.eventually.equal(null),

      validateField({
        data: false,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.preferred,
      }).should.eventually.equal(null),

      validateField({
        data: 'true',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.preferred,
      }).should.eventually.equal(null),

      validateField({
        data: 'false',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.preferred,
      }).should.eventually.equal(null),
    ]));

    it('should resolve to an error if a boolean field is invalid', () => Promise.all([
      validateField({
        data: 'foo',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.preferred,
      }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
        code: ERR_DATA_TYPE,
        dataType: DATA_TYPE_BOOL,
        value: 'foo',
      })),
    ]));

    it('should resolve to null if a map field is valid', () => (
      validateField({
        data: Immutable.Map(),
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.departments,
      }).should.eventually.equal(null)
    ));

    it('should resolve to an error if a map field is invalid', () => validateField({
      data: 'a',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: fieldDescriptor.departments,
    }).should.eventually.have.property(ERROR_KEY, Immutable.Map({
      code: ERR_DATA_TYPE,
      dataType: DATA_TYPE_MAP,
      value: 'a',
    })));

    it('should validate nested fields recursively', () => {
      const value = Immutable.fromJS({
        measurement: {
          value: 'uh oh',
          unit: 'cm',
        },
      });

      return (
        validateField({
          data: value,
          path: [],
          recordData: Immutable.Map(),
          subrecordData: undefined,
          fieldDescriptor: fieldDescriptor.measurements,
        }).should.eventually.have.deep.property(
          ['measurement', 0, 'value', ERROR_KEY],
          Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_FLOAT,
            value: 'uh oh',
          }),
        ));
    });

    it('should validate repeating instances when the expand repeating flag is true', () => {
      const expandRepeating = true;

      const value = Immutable.List([
        'a',
        '32',
        'c',
      ]);

      return (
        validateField({
          data: value,
          path: [],
          recordData: Immutable.Map(),
          subrecordData: undefined,
          fieldDescriptor: fieldDescriptor.ages.age,
        }, expandRepeating).then((error) => {
          error.getIn([0, ERROR_KEY]).should.equal(Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_INT,
            value: 'a',
          }));

          expect(error.get(1)).to.equal(undefined);

          error.getIn([2, ERROR_KEY]).should.equal(Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_INT,
            value: 'c',
          }));
        })
      );
    });

    it('should not validate repeating instances when the expand repeating flag is false', () => {
      const expandRepeating = false;

      const value = Immutable.List([
        'a',
        '32',
        'c',
      ]);

      return validateField({
        data: value.get[1],
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.ages.age,
      }, expandRepeating).should.eventually.equal(null);
    });

    it('should run a custom validator', () => Promise.all([
      validateField({
        data: '3',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.negativeNumber,
      }).should.eventually.have.deep.property([ERROR_KEY, 'code'], ERR_VALIDATION),

      validateField({
        data: '-3',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.negativeNumber,
      }).should.eventually.equal(null),
    ]));

    it('should run an asynchronous custom validator', () => Promise.all([
      validateField({
        data: 'foo',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.zipCode,
      }).should.eventually.have.deep.property([ERROR_KEY, 'code'], ERR_VALIDATION),

      validateField({
        data: '94710',
        path: [],
        recordData: Immutable.Map(),
        subrecordData: undefined,
        fieldDescriptor: fieldDescriptor.zipCode,
      }).should.eventually.equal(null),
    ]));

    it('should resolve to an error on the document when an asynchronous custom validator rejects', () => validateField({
      data: 'foo',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: undefined,
      fieldDescriptor: fieldDescriptor.address,
    }).should.eventually.equal(Immutable.fromJS({
      document: {
        [ERROR_KEY]: {
          code: ERR_UNABLE_TO_VALIDATE,
        },
      },
    })));
  });

  describe('validateRecordData', () => {
    const recordTypeConfig = {
      fields: {
        id: {
          [configKey]: {
            required: true,
          },
        },
      },
    };

    const data = Immutable.Map();

    it('should validate the data against the field descriptor in the record type config', () => {
      validateRecordData(data, recordTypeConfig).should.eventually
        .have.deep.property(['id', ERROR_KEY], Immutable.Map({
          code: ERR_MISSING_REQ_FIELD,
        }));
    });
  });

  describe('computeField', () => {
    const fieldDescriptor = {
      sayHello: {
        [configKey]: {
          compute: ({ data }) => `hello ${data}`,
        },
      },
      throwError: {
        [configKey]: {
          compute: () => {
            throw new Error('test error');
          },
        },
      },
      names: {
        name: {
          [configKey]: {
            compute: ({ data, path }) => {
              const index = path[path.length - 1];

              return `${index}. ${data}`;
            },
            repeating: true,
          },
        },
      },
      colors: {
        [configKey]: {
          compute: ({ data }) => data.set(
            'color', data.get('color').map((color, index) => `${index}. ${color}`),
          ),
        },
        color: {
          [configKey]: {
            repeating: true,
          },
        },
      },
      measuredPartGroupList: {
        measuredPartGroup: {
          [configKey]: {
            compute: ({ data }) => {
              const part = data.get('measuredPart');
              const dim1 = data.getIn(['dimensionSubGroupList', 'dimensionSubGroup', 0, 'value']);
              const dim2 = data.getIn(['dimensionSubGroupList', 'dimensionSubGroup', 1, 'value']);
              const summary = `${part}: ${dim1} x ${dim2}`;

              return data.set('dimensionSummary', summary);
            },
            repeating: true,
          },
          measuredPart: {},
          dimensionSummary: {},
          dimensionSubGroupList: {
            dimensionSubGroup: {
              [configKey]: {
                repeating: true,
              },
              dimension: {},
              value: {},
              measurementUnit: {},
            },
          },
        },
      },
    };

    it('should resolve to undefined if no field descriptor is supplied', () => computeField({
      data: 'world',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: null,
      fieldDescriptor: undefined,
    }).then((computedValue) => {
      expect(computedValue).to.equal(undefined);
    }));

    it('should resolve a computed value for scalar fields', () => computeField({
      data: 'world',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: null,
      fieldDescriptor: fieldDescriptor.sayHello,
    }).should.eventually.equal('hello world'));

    it('should resolve a computed value for repeating field instances', () => Promise.all([
      computeField({
        data: 'Alvar Aalto',
        path: [0],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: fieldDescriptor.names.name,
      }, false).should.eventually.equal('0. Alvar Aalto'),
      computeField({
        data: 'Ray Eames',
        path: [1],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: fieldDescriptor.names.name,
      }, false).should.eventually.equal('1. Ray Eames'),
    ]));

    it('should resolve a computed value for repeating fields', () => {
      const value = Immutable.List([
        'Lois Lane',
        'Clark Kent',
        'Bruce Wayne',
      ]);

      return computeField({
        data: value,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: fieldDescriptor.names.name,
      }, true).should.eventually.equal(Immutable.List([
        '0. Lois Lane',
        '1. Clark Kent',
        '2. Bruce Wayne',
      ]));
    });

    it('should resolve a computed value for repeating field containers', () => {
      // Really this is just a type of complex field, with one child that is repeating.

      const value = Immutable.fromJS({
        color: [
          'blue',
          'green',
          'red',
        ],
      });

      return computeField({
        data: value,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: fieldDescriptor.colors,
      }).should.eventually.equal(Immutable.fromJS({
        color: [
          '0. blue',
          '1. green',
          '2. red',
        ],
      }));
    });

    it('should resolve a computed value for complex fields', () => {
      // Test something more complicated then a repeating field container.

      const value = Immutable.fromJS({
        measuredPart: 'base',
        dimensionSubGroupList: {
          dimensionSubGroup: [
            {
              value: 12,
            },
            {
              value: 24,
            },
          ],
        },
      });

      return computeField({
        data: value,
        path: [0],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: fieldDescriptor.measuredPartGroupList.measuredPartGroup,
      }, false).should.eventually.equal(value.set('dimensionSummary', 'base: 12 x 24'));
    });

    it('should resolve a sparse tree of computed values for complex fields that have computed descendent fields', () => {
      const docFieldDescriptor = {
        document: {
          'ns2:collectionobjects_common': {
            identificationNumber: {},
            colors: {
              color: {},
            },
            groupList: {
              group: {
                sayHello: {
                  [configKey]: {
                    compute: ({ data }) => `hello ${data}`,
                  },
                },
                foo: {},
              },
            },
          },
        },
      };

      const value = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            identificationNumber: '1234',
            colors: {
              color: [
                'red',
                'yellow',
              ],
            },
            groupList: {
              group: {
                sayHello: 'world',
                foo: 17,
              },
            },
          },
        },
      });

      return computeField({
        data: value,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: docFieldDescriptor,
      }, true).should.eventually.equal(Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            groupList: {
              group: {
                sayHello: 'hello world',
              },
            },
          },
        },
      }));
    });

    it('should resolve to undefined if there are no computed fields', () => {
      const docFieldDescriptor = {
        document: {
          'ns2:collectionobjects_common': {
            identificationNumber: {},
            colors: {
              color: {},
            },
            groupList: {
              group: {
                foo: {},
              },
            },
          },
        },
      };

      const value = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            identificationNumber: '1234',
            colors: {
              color: [
                'red',
                'yellow',
              ],
            },
            groupList: {
              group: {
                foo: 17,
              },
            },
          },
        },
      });

      return computeField({
        data: value,
        path: [],
        recordData: Immutable.Map(),
        subrecordData: null,
        fieldDescriptor: docFieldDescriptor,
      }).then((computedValue) => {
        expect(computedValue).to.equal(undefined);
      });
    });

    it('should reject if the compute function throws', () => computeField({
      data: '',
      path: [],
      recordData: Immutable.Map(),
      subrecordData: null,
      fieldDescriptor: fieldDescriptor.throwError,
    }).catch((error) => error.message).should.eventually.equal('test error'));
  });

  describe('computeRecordData', () => {
    it('should resolve a sparse tree of computed values for the record data', () => {
      const recordTypeConfig = {
        fields: {
          document: {
            'ns2:collectionobjects_common': {
              identificationNumber: {},
              colors: {
                color: {},
              },
              groupList: {
                group: {
                  sayHello: {
                    [configKey]: {
                      compute: ({ data }) => `hello ${data}`,
                    },
                  },
                  foo: {},
                },
              },
            },
          },
        },
      };

      const data = Immutable.fromJS({
        document: {
          'ns2:collectionobjects_common': {
            identificationNumber: '1234',
            colors: {
              color: [
                'red',
                'yellow',
              ],
            },
            groupList: {
              group: {
                sayHello: 'world',
                foo: 17,
              },
            },
          },
        },
      });

      return computeRecordData(data, null, recordTypeConfig).should
        .eventually.equal(Immutable.fromJS({
          document: {
            'ns2:collectionobjects_common': {
              groupList: {
                group: {
                  sayHello: 'hello world',
                },
              },
            },
          },
        }));
    });
  });

  describe('isNewRecord', () => {
    it('should return false if the data contains a uri', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: 'something',
          },
        },
      });

      isNewRecord(data).should.equal(false);
    });

    it('should return true if the data does not contain a uri', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
        },
      });

      isNewRecord(data).should.equal(true);
    });
  });

  describe('isExistingRecord', () => {
    it('should return true if the data contains a uri', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: 'something',
          },
        },
      });

      isExistingRecord(data).should.equal(true);
    });

    it('should return false if the data does not contain a uri', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
        },
      });

      isExistingRecord(data).should.equal(false);
    });
  });

  describe('isRecordDeprecated', () => {
    it('should return true if the workflow state contains \'deprecated\'', () => {
      let data;

      data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'deprecated',
          },
        },
      });

      isRecordDeprecated(data).should.equal(true);

      data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'replicated_deprecated',
          },
        },
      });

      isRecordDeprecated(data).should.equal(true);
    });

    it('should return false if no data is supplied', () => {
      isRecordDeprecated().should.equal(false);
    });
  });

  describe('isRecordImmutable', () => {
    it('should return true if the record is locked', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'locked',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is deprecated', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'deprecated',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is replicated', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'replicated',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is an immutable security record', () => {
      const data = Immutable.fromJS({
        'ns2:role': {
          permsProtection: 'immutable',
        },
      });

      isRecordImmutable(data).should.equal(true);
    });
  });

  describe('isRecordLocked', () => {
    it('should return true if the workflow state is \'locked\'', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'locked',
          },
        },
      });

      isRecordLocked(data).should.equal(true);
    });

    it('should return false if no data is supplied', () => {
      isRecordLocked().should.equal(false);
    });
  });

  describe('isRecordReplicated', () => {
    it('should return true if the workflow state contains \'replicated\'', () => {
      let data;

      data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'replicated',
          },
        },
      });

      isRecordReplicated(data).should.equal(true);

      data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'replicated_deprecated',
          },
        },
      });

      isRecordReplicated(data).should.equal(true);
    });

    it('should return false if no data is supplied', () => {
      isRecordReplicated().should.equal(false);
    });
  });

  describe('isSecurityRecordImmutable', () => {
    it('should return true if permsProtection is \'immutable\'', () => {
      const data = Immutable.fromJS({
        'ns2:role': {
          permsProtection: 'immutable',
        },
      });

      isSecurityRecordImmutable(data).should.equal(true);
    });

    it('should return true if rolesProtection is \'immutable\'', () => {
      const data = Immutable.fromJS({
        'ns2:account': {
          rolesProtection: 'immutable',
        },
      });

      isSecurityRecordImmutable(data).should.equal(true);
    });

    it('should return false if no data is supplied', () => {
      isSecurityRecordImmutable().should.equal(false);
    });

    it('should return false if no data is supplied', () => {
      isSecurityRecordImmutable().should.equal(false);
    });
  });

  describe('normalizeFieldValue', () => {
    it('should return the value when the field descriptor is undefined', () => {
      normalizeFieldValue(undefined, 'a').should.equal('a');
      normalizeFieldValue(undefined, 0).should.equal(0);
      normalizeFieldValue(undefined, '').should.equal('');

      expect(normalizeFieldValue(undefined, null)).to.equal(null);
    });

    it('should wrap the field value in a list when the field is repeating and the value is not a list', () => {
      const fieldDescriptor = {
        [configKey]: {
          repeating: true,
        },
      };

      normalizeFieldValue(fieldDescriptor, 'a').should.equal(Immutable.List(['a']));
      normalizeFieldValue(fieldDescriptor, 0).should.equal(Immutable.List([0]));
      normalizeFieldValue(fieldDescriptor, null).should.equal(Immutable.List([null]));

      normalizeFieldValue(fieldDescriptor, Immutable.Map()).should
        .equal(Immutable.List([Immutable.Map()]));
    });

    it('should return the value when a repeating field value is already a list', () => {
      const fieldDescriptor = {
        [configKey]: {
          repeating: true,
        },
      };

      normalizeFieldValue(fieldDescriptor, Immutable.List(['a'])).should
        .equal(Immutable.List(['a']));

      normalizeFieldValue(fieldDescriptor, Immutable.List(['a', 'b'])).should
        .equal(Immutable.List(['a', 'b']));

      normalizeFieldValue(fieldDescriptor, Immutable.fromJS(['a', { foo: 'bar' }])).should
        .equal(Immutable.fromJS(['a', { foo: 'bar' }]));
    });

    it('should deeply normalize maps', () => {
      const fieldDescriptor = {
        part: {
          foo: {},
          bar: {
            [configKey]: {
              repeating: true,
            },
          },
          baz: {
            titleGroupList: {
              titleGroup: {
                [configKey]: {
                  repeating: true,
                },
                title: {},
                titleSubgroupList: {
                  titleSubgroup: {
                    [configKey]: {
                      repeating: true,
                    },
                    language: {},
                    translation: {},
                  },
                },
              },
            },
          },
        },
      };

      const value = Immutable.fromJS({
        part: {
          foo: 'hello',
          bar: 12,
          baz: {
            titleGroupList: {
              titleGroup: {
                title: 'Title 1',
                titleSubgroupList: {
                  titleSubgroup: {
                    language: 'English',
                    translation: 'Translated Title',
                  },
                },
              },
            },
          },
        },
      });

      normalizeFieldValue(fieldDescriptor, value).should
        .equal(Immutable.fromJS({
          part: {
            foo: 'hello',
            bar: [12],
            baz: {
              titleGroupList: {
                titleGroup: [{
                  title: 'Title 1',
                  titleSubgroupList: {
                    titleSubgroup: [{
                      language: 'English',
                      translation: 'Translated Title',
                    }],
                  },
                }],
              },
            },
          },
        }));
    });
  });

  describe('normalizeRecordData', () => {
    it('should deeply normalize the data', () => {
      const recordTypeConfig = {
        fields: {
          document: {
            part: {
              foo: {},
              bar: {
                [configKey]: {
                  repeating: true,
                },
              },
            },
          },
        },
      };

      const data = Immutable.fromJS({
        document: {
          part: {
            foo: 'hello',
            bar: 12,
          },
        },
      });

      normalizeRecordData(recordTypeConfig, data).should
        .equal(Immutable.fromJS({
          document: {
            part: {
              foo: 'hello',
              bar: [12],
            },
          },
        }));
    });

    it('should call the configured record normalizer for the record type', () => {
      const recordTypeConfig = {
        normalizeRecordData: () => Immutable.Map({
          foo: 'bar',
        }),
        fields: {},
      };

      const data = Immutable.Map();

      normalizeRecordData(recordTypeConfig, data).should
        .equal(Immutable.fromJS({
          foo: 'bar',
        }));
    });
  });

  describe('getWorkflowState', () => {
    it('should return the workflow state of the record', () => {
      const workflowState = 'deleted';

      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState,
          },
        },
      });

      getWorkflowState(data).should.equal(workflowState);
    });
  });

  describe('setXmlNamespaceAttribute', () => {
    it('should set the namespace uri attribute on parts', () => {
      const partData = Immutable.Map();
      const partName = 'ns2:groups_botgarden';

      const partDescriptor = {
        [configKey]: {
          service: {
            ns: 'http://some.uri',
          },
        },
      };

      setXmlNamespaceAttribute(partData, partName, partDescriptor).should.equal(Immutable.Map({
        '@xmlns:ns2': 'http://some.uri',
      }));
    });
  });

  describe('hasHierarchyRelations', () => {
    it('should return true if the record data contains a relations list with a relation-list-item', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': {},
          },
        },
      });

      hasHierarchyRelations(data).should.equal(true);
    });

    it('should return true if the record data contains a relations list with multiple relation-list-items', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {},
              {},
            ],
          },
        },
      });

      hasHierarchyRelations(data).should.equal(true);
    });

    it('should return false if the record data contains a relations list with no relation-list-item', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {},
        },
      });

      hasHierarchyRelations(data).should.equal(false);
    });

    it('should return false if the record data does not contain a relations list', () => {
      const data = Immutable.fromJS({
        document: {},
      });

      hasHierarchyRelations(data).should.equal(false);
    });
  });

  describe('hasNarrowerHierarchyRelations', () => {
    const csid = '1234';

    it('should return true if the record data contains a relations list with a single relation-list-item that is a narrower relation', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': {
              predicate: 'hasBroader',
              object: {
                csid,
              },
            },
          },
        },
      });

      hasNarrowerHierarchyRelations(csid, data).should.equal(true);
    });

    it('should return true if the record data contains a relations list with multiple relation-list-items and at least one is a narrower relation', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            'relation-list-item': [
              {
                predicate: 'hasBroader',
                object: {
                  csid: 'something',
                },
              },
              {
                predicate: 'hasBroader',
                object: {
                  csid,
                },
              },
            ],
          },
        },
      });

      hasNarrowerHierarchyRelations(csid, data).should.equal(true);
    });

    it('should return false if the record data contains a relations list with no relation-list-item', () => {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {},
        },
      });

      hasNarrowerHierarchyRelations(csid, data).should.equal(false);
    });

    it('should return false if the record data does not contain a relations list', () => {
      const data = Immutable.fromJS({
        document: {},
      });

      hasNarrowerHierarchyRelations(csid, data).should.equal(false);
    });
  });

  describe('getStickyFieldValues', () => {
    it('should return a map containing the values of sticky fields in the given record data', () => {
      const recordTypeConfig = {
        fields: {
          document: {
            common: {
              recordStatus: {
                [configKey]: {
                  sticky: true,
                },
              },
              titleGroupList: {
                titleGroup: {
                  titleLanguage: {
                    [configKey]: {
                      sticky: true,
                    },
                  },
                },
              },
            },
          },
        },
      };

      const data = Immutable.fromJS({
        document: {
          common: {
            identificationNumber: '1234',
            recordStatus: 'new',
            titleGroupList: {
              titleGroup: {
                title: 'something',
                titleLanguage: 'english',
              },
            },
          },
        },
      });

      getStickyFieldValues(recordTypeConfig, data).should.equal(Immutable.fromJS({
        document: {
          common: {
            recordStatus: 'new',
            titleGroupList: {
              titleGroup: {
                titleLanguage: 'english',
              },
            },
          },
        },
      }));
    });
  });
});
