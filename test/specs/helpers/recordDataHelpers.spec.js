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
  applyDefaults,
  attributePropertiesToTop,
  clearUncloneable,
  cloneRecordData,
  computeField,
  computeRecordData,
  createBlankRecord,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
  getCoreFieldValue,
  getCsid,
  getRefName,
  getDocument,
  getPart,
  getPartPropertyName,
  getPartNSPropertyName,
  getCreatedTimestamp,
  getCreatedUser,
  getUpdatedTimestamp,
  getUpdatedUser,
  getWorkflowState,
  hasHierarchyRelations,
  isNewRecord,
  isExistingRecord,
  isRecordDeprecated,
  isRecordImmutable,
  isRecordLocked,
  isRecordReplicated,
  isSecurityRecordImmutable,
  normalizeFieldValue,
  normalizeRecordData,
  prepareForSending,
  setXmlNamespaceAttribute,
  spreadDefaultValue,
  validateField,
  validateRecordData,
  ERROR_KEY,
} from '../../../src/helpers/recordDataHelpers';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.should();

describe('recordDataHelpers', function moduleSuite() {
  describe('getPartPropertyName', function suite() {
    it('should return the part name prepended with the namespace prefix', function test() {
      getPartPropertyName('collectionspace_core').should.equal('ns2:collectionspace_core');
    });
  });

  describe('getPartNSPropertyName', function suite() {
    it('should return the suppplied namespace prefix prepended with \'@xmlns:\'', function test() {
      getPartNSPropertyName('ns2').should.equal('@xmlns:ns2');
    });
  });

  describe('getPart', function suite() {
    it('should return the named part from the given data', function test() {
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

  describe('deepGet', function suite() {
    it('should throw when path is not an array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepGet.bind(data, 'color')).to.throw(Error);
    });

    it('should throw when path is an empty array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepGet.bind(data, [])).to.throw(Error);
    });

    it('should return undefined when data is null or undefined', function test() {
      expect(deepGet(null, ['color'])).to.equal(undefined);
      expect(deepGet(undefined, ['color'])).to.equal(undefined);
    });

    it('should get a child value', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      deepGet(data, ['color']).should.equal('red');
    });

    it('should get a nested Map value', function test() {
      const data = Immutable.fromJS({
        common: {
          color: 'red',
        },
      });

      deepGet(data, ['common', 'color']).should.equal('red');
    });

    it('should get a deeply nested Map value', function test() {
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

    it('should return undefined for a non-existent path', function test() {
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

    it('should get a nested list value', function test() {
      const data = Immutable.fromJS({
        comment: [
          'comment 1',
          'comment 2',
        ],
      });

      deepGet(data, ['comment', '0']).should.equal('comment 1');
      deepGet(data, ['comment', '1']).should.equal('comment 2');
    });

    it('should set a deeply nested list value', function test() {
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

    it('should treat a single (non-list) value as a list when it is keyed by \'0\'', function test() {
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

  describe('deepSet', function suite() {
    it('should throw when path is not an array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepSet.bind(data, 'color', 'blue')).to.throw(Error);
    });

    it('should throw when path is an empty array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepSet.bind(data, [], 'blue')).to.throw(Error);
    });

    it('should set a child value', function test() {
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

    it('should set a nested Map value', function test() {
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

    it('should set a deeply nested Map value', function test() {
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

    it('should set a nested list value', function test() {
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

    it('should set a deeply nested list value', function test() {
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

    it('should create missing Maps', function test() {
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

    it('should create missing Lists', function test() {
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

    it('should promote non-list values to lists when keyed with a numeric key', function test() {
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

  describe('deepDelete', function suite() {
    it('should throw when path is not an array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepDelete.bind(data, 'color')).to.throw(Error);
    });

    it('should throw when path is an empty array', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      expect(deepDelete.bind(data, [])).to.throw(Error);
    });

    it('should delete a child value', function test() {
      const data = Immutable.fromJS({
        color: 'red',
      });

      const updatedData = deepDelete(data, ['color']).toJS();

      updatedData.should.deep.equal({});
    });

    it('should delete a nested Map value', function test() {
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

    it('should delete a deeply nested Map value', function test() {
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

    it('should delete a nested list value', function test() {
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

    it('should delete a deeply nested list value', function test() {
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

    it('should create missing Maps', function test() {
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

    it('should create missing Lists', function test() {
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

    it('should promote non-list values to lists when keyed with a numeric key', function test() {
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

  describe('createBlankRecord', function suite() {
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

    it('should return an Immutable.Map', function test() {
      Immutable.Map.isMap(createBlankRecord(groupConfig)).should.equal(true);
    });

    it('should create properties for the document', function test() {
      const data = createBlankRecord(roleConfig);

      data.get('ns2:role').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/role',
      });
    });

    it('should create properties for each part', function test() {
      const data = createBlankRecord(groupConfig);

      data.get('document').get('ns2:groups_common').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/group',
      });

      data.get('document').get('ns2:groups_extension').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/extension/group',
      });
    });
  });

  describe('createRecordData', function suite() {
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

    it('should return an Immutable.Map', function test() {
      Immutable.Map.isMap(createRecordData(recordTypeConfig)).should.equal(true);
    });

    it('should have a document property', function test() {
      createRecordData(recordTypeConfig).get('document').should.be.an('object');
    });
  });

  describe('getDocument', function suite() {
    const recordData = Immutable.Map({
      document: {
        '@name': 'collectionobjects',
      },
    });

    it('should return the document object from the record data', function test() {
      getDocument(recordData).should
        .be.an('object')
        .with.property('@name', 'collectionobjects');
    });
  });

  describe('attributePropertiesToTop', function suite() {
    it('should return -1 if the first argument starts with \'@\' and the second does not', function test() {
      attributePropertiesToTop('@foo', 'bar').should.equal(-1);
    });

    it('should return 1 if the second argument starts with \'@\' and the first does not', function test() {
      attributePropertiesToTop('foo', '@bar').should.equal(1);
    });

    it('should return 0 if both arguments start with \'@\'', function test() {
      attributePropertiesToTop('@foo', '@bar').should.equal(0);
    });

    it('should return 0 if neither argument starts with \'@\'', function test() {
      attributePropertiesToTop('foo', 'bar').should.equal(0);
    });
  });

  describe('prepareForSending', function suite() {
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

    it('should remove the collectionspace_core part', function test() {
      prepareForSending(recordData, recordTypeConfig).get('document').has('ns2:collectionspace_core').should.equal(false);
    });

    it('should remove the account_permission part', function test() {
      prepareForSending(recordData, recordTypeConfig).get('document').has('ns2:account_permission').should.equal(false);
    });

    it('should sort attribute and namespace declaration properties to the top of each part', function test() {
      prepareForSending(recordData, recordTypeConfig).get('document').get('ns2:groups_common').keySeq()
        .toArray().should.deep.equal(['@attr1', '@xmlns:ns2', 'name', 'date']);
    });

    it('should filter out incomplete relation items', function test() {
      prepareForSending(recordData, recordTypeConfig)
        .getIn(['document', 'rel:relations-common-list', 'relation-list-item']).size.should
          .equal(0);
    });

    it('should filter out incomplete relation items', function test() {
      prepareForSending(recordData, recordTypeConfig)
        .getIn(['document', 'rel:relations-common-list', 'relation-list-item']).size.should
          .equal(0);
    });

    it('should set subrecord csid fields that don\'t contain valid csids to null', function test() {
      expect(
        prepareForSending(recordData, recordTypeConfig)
          .getIn(['document', 'ns2:groups_extension', 'blobCsid'])
      ).to.equal(null);
    });

    it('should sort attribute and namespace properties of the root to the top', function test() {
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

    it('should call a configured prepareForSending function', function test() {
      let prepareForSendingData = null;
      let prepareForSendingRecordTypeConfig = null;

      const customRecordTypeConfig = Object.assign({}, recordTypeConfig, {
        prepareForSending: (dataArg, recordTypeConfigArg) => {
          prepareForSendingData = dataArg;
          prepareForSendingRecordTypeConfig = recordTypeConfigArg;

          return dataArg.setIn(['document', 'ns2:groups_common', 'prepared'], true);
        },
      });

      prepareForSending(recordData, customRecordTypeConfig)
        .getIn(['document', 'ns2:groups_common', 'prepared']).should.equal(true);

      prepareForSendingData.should.equal(recordData);
      prepareForSendingRecordTypeConfig.should.equal(customRecordTypeConfig);
    });
  });

  describe('spreadDefaultValue', function suite() {
    it('should set the value if the path does not exist', function test() {
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
        recordData
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'new',
          },
        },
      });
    });

    it('should set the value if the current value is undefined', function test() {
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
        recordData
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'new',
          },
        },
      });
    });

    it('should not set the value if the current value is not undefined', function test() {
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
        recordData
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: {
            recordStatus: 'in progress',
          },
        },
      });
    });

    it('should return the data unchanged if it is an unexpected type', function test() {
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
        recordData
      );

      updatedData.toJS().should.deep.equal({
        document: {
          common: '1234',
        },
      });
    });

    it('should set the value in all existing undefined instances of a repeating field', function test() {
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
        recordData
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

    it('should set the value in all existing instances of a field in a repeating group', function test() {
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
        recordData
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

    it('should set the value in all existing instances of a field in a nested repeating group', function test() {
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
        recordData
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

    it('should set the value in undefined instances of a repeating group', function test() {
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
        recordData
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

  describe('applyDefaults', function suite() {
    it('should set all default values from config into the data', function test() {
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

  describe('clearUncloneable', function suite() {
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

    it('should set uncloneable fields with no default to undefined', function test() {
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

    it('should set uncloneable fields with a default to the default', function test() {
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

    it('should do nothing to fields that are cloneable', function test() {
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

    it('should clear all instances of a repeating field', function test() {
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

    it('should clear all instances of a field in a repeating group', function test() {
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

  describe('cloneRecordData', function suite() {
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

    it('should omit the collectionspace_core and account_permission parts', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
          'ns2:account_permission': {},
          'ns2:groups_common': {
            owner: 'Owner',
          },
        },
      });

      cloneRecordData(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:groups_common': {
            owner: 'Owner',
          },
        },
      });
    });

    it('should clear uncloneable fields', function test() {
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

      cloneRecordData(recordTypeConfig, data).toJS().should.deep.equal({
        document: {
          'ns2:groups_common': {
            owner: 'Owner',
            title: undefined,
          },
        },
      });
    });

    it('should return undefined for undefined data', function test() {
      expect(cloneRecordData(recordTypeConfig, undefined)).to.equal(undefined);
    });
  });

  describe('getCreatedTimestamp', function suite() {
    it('should return a core schema createdAt value', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            createdAt: '1234',
          },
        },
      });

      getCreatedTimestamp(data).should.equal('1234');
    });

    it('should return a top level createdAt value  ', function test() {
      const data = Immutable.fromJS({
        'ns2:role': {
          createdAt: '1234',
        },
      });

      getCreatedTimestamp(data).should.equal('1234');
    });
  });

  describe('getCreatedUser', function suite() {
    it('should return the created timestamp', function test() {
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

  describe('getUpdatedTimestamp', function suite() {
    it('should return a core schema updatedAt value', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            updatedAt: '1234',
          },
        },
      });

      getUpdatedTimestamp(data).should.equal('1234');
    });

    it('should return a top level updatedAt value', function test() {
      const data = Immutable.fromJS({
        'ns2:role': {
          updatedAt: '1234',
        },
      });

      getUpdatedTimestamp(data).should.equal('1234');
    });
  });

  describe('getUpdatedUser', function suite() {
    it('should return the updated timestamp', function test() {
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

  describe('getCoreFieldValue', function suite() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          foo: 'bar',
        },
      },
    });

    it('should return the specified field from the core part', function test() {
      getCoreFieldValue(data, 'foo').should.equal('bar');
    });

    it('should return undefined if the field does not exist', function test() {
      expect(getCoreFieldValue(data, 'baz')).to.equal(undefined);
    });

    it('should return undefined if the data does not exist', function test() {
      expect(getCoreFieldValue(null, 'foo')).to.equal(undefined);
    });
  });

  describe('getCsid', function suite() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: '/some/path/1234',
        },
      },
    });

    it('should return the csid extracted from the uri field in the core part', function test() {
      getCsid(data).should.equal('1234');
    });

    it('should return undefined if the data does not exist', function test() {
      expect(getCsid()).to.equal(undefined);
    });
  });

  describe('getRefName', function suite() {
    const refName = 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(California1514611983069)\'California\'';

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          refName,
        },
      },
    });

    it('should return the refName extracted from the core part', function test() {
      getRefName(data).should.equal(refName);
    });

    it('should return undefined if the data does not exist', function test() {
      expect(getRefName()).to.equal(undefined);
    });
  });

  describe('validateField', function suite() {
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
          validate: (value) => {
            if (value >= 0) {
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
          validate: value => new Promise((resolve) => {
            window.setTimeout(() => {
              let error = null;

              if (!value.match(/^\d{5}$/)) {
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

    it('should resolve to null if the value is valid', function test() {
      return validateField('red', [], Immutable.Map(), fieldDescriptor.color).should
        .eventually.equal(null);
    });

    it('should resolve to an error if a required field is empty, null, or undefined', function test() {
      return Promise.all([
        validateField('', [], Immutable.Map(), fieldDescriptor.id).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_MISSING_REQ_FIELD,
            message: undefined,
          })),

        validateField(null, [], Immutable.Map(), fieldDescriptor.id).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_MISSING_REQ_FIELD,
            message: undefined,
          })),

        validateField(undefined, [], Immutable.Map(), fieldDescriptor.id).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_MISSING_REQ_FIELD,
            message: undefined,
          })),
      ]);
    });

    it('should resolve to null if an integer field is valid', function test() {
      return Promise.all([
        validateField('1', [], Immutable.Map(), fieldDescriptor.count).should.eventually.equal(null),
        validateField('-1', [], Immutable.Map(), fieldDescriptor.count).should.eventually.equal(null),
        validateField('0', [], Immutable.Map(), fieldDescriptor.count).should.eventually.equal(null),
      ]);
    });

    it('should resolve to an error if an integer field is invalid', function test() {
      return Promise.all([
        validateField('a', [], Immutable.Map(), fieldDescriptor.count).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_INT,
            value: 'a',
          })),

        validateField('24w', [], Immutable.Map(), fieldDescriptor.count).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_INT,
            value: '24w',
          })),
      ]);
    });

    it('should resolve to null when no field descriptor is supplied', function test() {
      return validateField('a', [], Immutable.Map(), null).should.eventually.equal(null);
    });

    it('should resolve to null if a float field is valid', function test() {
      return Promise.all([
        validateField('1.00', [], Immutable.Map(), fieldDescriptor.price).should.eventually.equal(null),
        validateField('-14.12', [], Immutable.Map(), fieldDescriptor.price).should.eventually.equal(null),
        validateField('32', [], Immutable.Map(), fieldDescriptor.price).should.eventually.equal(null),
      ]);
    });

    it('should resolve to an error if a float field is invalid', function test() {
      return Promise.all([
        validateField('a', [], Immutable.Map(), fieldDescriptor.price).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_FLOAT,
            value: 'a',
          })),

        validateField('24.sd', [], Immutable.Map(), fieldDescriptor.price).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_FLOAT,
            value: '24.sd',
          })),
      ]);
    });

    it('should resolve to null if a date field is valid', function test() {
      return validateField('1983-03-05', [], Immutable.Map(), fieldDescriptor.date).should
        .eventually.equal(null);
    });

    it('should resolve to an error if a date field is invalid', function test() {
      return Promise.all([
        validateField('a', [], Immutable.Map(), fieldDescriptor.date).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_DATE,
            value: 'a',
          })),

        validateField('1983-03-05T13:00:00', [], Immutable.Map(), fieldDescriptor.date).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_DATE,
            value: '1983-03-05T13:00:00',
          })),
      ]);
    });

    it('should resolve to null if a datetime field is valid', function test() {
      return validateField('1983-03-05T13:45:23.000Z', [], Immutable.Map(), fieldDescriptor.time)
        .should.eventually.equal(null);
    });

    it('should resolve to an error if a datetime field is invalid', function test() {
      return Promise.all([
        validateField('a', [], Immutable.Map(), fieldDescriptor.time).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_DATETIME,
            value: 'a',
          })),

        validateField('1983-03-05', [], Immutable.Map(), fieldDescriptor.time).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_DATETIME,
            value: '1983-03-05',
          })),
      ]);
    });

    it('should resolve to null if a boolean field is valid', function test() {
      return Promise.all([
        validateField(true, [], Immutable.Map(), fieldDescriptor.preferred).should.eventually
          .equal(null),

        validateField(false, [], Immutable.Map(), fieldDescriptor.preferred).should.eventually
          .equal(null),
      ]);
    });

    it('should resolve to an error if a boolean field is invalid', function test() {
      return Promise.all([
        validateField('a', [], Immutable.Map(), fieldDescriptor.preferred).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_BOOL,
            value: 'a',
          })),

        validateField('true', [], Immutable.Map(), fieldDescriptor.preferred).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_BOOL,
            value: 'true',
          })),

        validateField('false', [], Immutable.Map(), fieldDescriptor.preferred).should.eventually
          .have.property(ERROR_KEY, Immutable.Map({
            code: ERR_DATA_TYPE,
            dataType: DATA_TYPE_BOOL,
            value: 'false',
          })),
      ]);
    });

    it('should resolve to null if a map field is valid', function test() {
      return validateField(Immutable.Map(), [], Immutable.Map(), fieldDescriptor.departments)
        .should.eventually.equal(null);
    });

    it('should resolve to an error if a map field is invalid', function test() {
      return validateField('a', [], Immutable.Map(), fieldDescriptor.departments).should.eventually
        .have.property(ERROR_KEY, Immutable.Map({
          code: ERR_DATA_TYPE,
          dataType: DATA_TYPE_MAP,
          value: 'a',
        }));
    });

    it('should validate nested fields recursively', function test() {
      const value = Immutable.fromJS({
        measurement: {
          value: 'uh oh',
          unit: 'cm',
        },
      });

      return validateField(value, [], Immutable.Map(), fieldDescriptor.measurements, value).should
        .eventually.have.deep.property(['measurement', 0, 'value', ERROR_KEY], Immutable.Map({
          code: ERR_DATA_TYPE,
          dataType: DATA_TYPE_FLOAT,
          value: 'uh oh',
        }));
    });

    it('should validate repeating instances when the expand repeating flag is true', function test() {
      const expandRepeating = true;

      const value = Immutable.List([
        'a',
        '32',
        'c',
      ]);

      return validateField(value, [], Immutable.Map(), fieldDescriptor.ages.age, expandRepeating)
        .then((error) => {
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
        });
    });

    it('should not validate repeating instances when the expand repeating flag is false', function test() {
      const expandRepeating = false;

      const value = Immutable.List([
        'a',
        '32',
        'c',
      ]);

      return (
        validateField(value.get[1], [], Immutable.Map(), fieldDescriptor.ages.age, expandRepeating)
          .should.eventually.equal(null)
      );
    });

    it('should run a custom validator', function test() {
      return Promise.all([
        validateField('3', [], Immutable.Map(), fieldDescriptor.negativeNumber).should.eventually
          .have.deep.property([ERROR_KEY, 'code'], ERR_VALIDATION),

        validateField('-3', [], Immutable.Map(), fieldDescriptor.negativeNumber).should.eventually
          .equal(null),
      ]);
    });

    it('should run an asynchronous custom validator', function test() {
      return Promise.all([
        validateField('foo', [], Immutable.Map(), fieldDescriptor.zipCode).should.eventually
          .have.deep.property([ERROR_KEY, 'code'], ERR_VALIDATION),

        validateField('94710', [], Immutable.Map(), fieldDescriptor.zipCode).should.eventually
          .equal(null),
      ]);
    });

    it('should resolve to an error on the document when an asynchronous custom validator rejects', function test() {
      return validateField('foo', [], Immutable.Map(), fieldDescriptor.address).should.eventually
        .equal(Immutable.fromJS({
          document: {
            [ERROR_KEY]: {
              code: ERR_UNABLE_TO_VALIDATE,
            },
          },
        }));
    });
  });

  describe('validateRecordData', function suite() {
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

    it('should validate the data against the field descriptor in the record type config', function test() {
      validateRecordData(data, recordTypeConfig).should.eventually
        .have.deep.property(['id', ERROR_KEY], Immutable.Map({
          code: ERR_MISSING_REQ_FIELD,
        }));
    });
  });

  describe('computeField', function suite() {
    const fieldDescriptor = {
      sayHello: {
        [configKey]: {
          compute: data => `hello ${data}`,
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
            compute: (data, path) => {
              const index = path[path.length - 1];

              return `${index}. ${data}`;
            },
            repeating: true,
          },
        },
      },
      colors: {
        [configKey]: {
          compute: data => data.set(
            'color', data.get('color').map((color, index) => `${index}. ${color}`)
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
            compute: (data) => {
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

    it('should resolve to undefined if no field descriptor is supplied', function test() {
      return computeField('world', [], Immutable.Map(), undefined)
        .then((computedValue) => {
          expect(computedValue).to.equal(undefined);
        });
    });

    it('should resolve a computed value for scalar fields', function test() {
      return computeField('world', [], Immutable.Map(), fieldDescriptor.sayHello).should
        .eventually.equal('hello world');
    });

    it('should resolve a computed value for repeating field instances', function test() {
      return Promise.all([
        computeField('Alvar Aalto', [0], Immutable.Map(), fieldDescriptor.names.name, false).should
          .eventually.equal('0. Alvar Aalto'),
        computeField('Ray Eames', [1], Immutable.Map(), fieldDescriptor.names.name, false).should
          .eventually.equal('1. Ray Eames'),
      ]);
    });

    it('should resolve a computed value for repeating fields', function test() {
      const value = Immutable.List([
        'Lois Lane',
        'Clark Kent',
        'Bruce Wayne',
      ]);

      return computeField(value, [], Immutable.Map(), fieldDescriptor.names.name).should
        .eventually.equal(Immutable.List([
          '0. Lois Lane',
          '1. Clark Kent',
          '2. Bruce Wayne',
        ]));
    });

    it('should resolve a computed value for repeating field containers', function test() {
      // Really this is just a type of complex field, with one child that is repeating.

      const value = Immutable.fromJS({
        color: [
          'blue',
          'green',
          'red',
        ],
      });

      return computeField(value, [], Immutable.Map(), fieldDescriptor.colors).should
        .eventually.equal(Immutable.fromJS({
          color: [
            '0. blue',
            '1. green',
            '2. red',
          ],
        }));
    });

    it('should resolve a computed value for complex fields', function test() {
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

      return computeField(
        value, [0], Immutable.Map(), fieldDescriptor.measuredPartGroupList.measuredPartGroup, false
      ).should.eventually.equal(value.set('dimensionSummary', 'base: 12 x 24'));
    });

    it('should resolve a sparse tree of computed values for complex fields that have computed descendent fields', function test() {
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
                    compute: data => `hello ${data}`,
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

      return computeField(value, [], Immutable.Map(), docFieldDescriptor).should
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

    it('should resolve to undefined if there are no computed fields', function test() {
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

      return computeField(value, [], Immutable.Map(), docFieldDescriptor)
        .then((computedValue) => {
          expect(computedValue).to.equal(undefined);
        });
    });

    it('should reject if the compute function throws', function test() {
      return computeField('', [], Immutable.Map(), fieldDescriptor.throwError)
        .catch(error => error.message)
        .should.eventually.equal('test error');
    });
  });

  describe('computeRecordData', function suite() {
    it('should resolve a sparse tree of computed values for the record data', function test() {
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
                      compute: data => `hello ${data}`,
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

      return computeRecordData(data, recordTypeConfig).should
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

  describe('isNewRecord', function suite() {
    it('should return false if the data contains a uri', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: 'something',
          },
        },
      });

      isNewRecord(data).should.equal(false);
    });

    it('should return true if the data does not contain a uri', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
        },
      });

      isNewRecord(data).should.equal(true);
    });
  });

  describe('isExistingRecord', function suite() {
    it('should return true if the data contains a uri', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: 'something',
          },
        },
      });

      isExistingRecord(data).should.equal(true);
    });

    it('should return false if the data does not contain a uri', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {},
        },
      });

      isExistingRecord(data).should.equal(false);
    });
  });

  describe('isRecordDeprecated', function suite() {
    it('should return true if the workflow state contains \'deprecated\'', function test() {
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

    it('should return false if no data is supplied', function test() {
      isRecordDeprecated().should.equal(false);
    });
  });

  describe('isRecordImmutable', function suite() {
    it('should return true if the record is locked', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'locked',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is deprecated', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'deprecated',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is replicated', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'replicated',
          },
        },
      });

      isRecordImmutable(data).should.equal(true);
    });

    it('should return true if the record is an immutable security record', function test() {
      const data = Immutable.fromJS({
        'ns2:role': {
          permsProtection: 'immutable',
        },
      });

      isRecordImmutable(data).should.equal(true);
    });
  });

  describe('isRecordLocked', function suite() {
    it('should return true if the workflow state is \'locked\'', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            workflowState: 'locked',
          },
        },
      });

      isRecordLocked(data).should.equal(true);
    });

    it('should return false if no data is supplied', function test() {
      isRecordLocked().should.equal(false);
    });
  });

  describe('isRecordReplicated', function suite() {
    it('should return true if the workflow state contains \'replicated\'', function test() {
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

    it('should return false if no data is supplied', function test() {
      isRecordReplicated().should.equal(false);
    });
  });

  describe('isSecurityRecordImmutable', function suite() {
    it('should return true if permsProtection is \'immutable\'', function test() {
      const data = Immutable.fromJS({
        'ns2:role': {
          permsProtection: 'immutable',
        },
      });

      isSecurityRecordImmutable(data).should.equal(true);
    });

    it('should return true if rolesProtection is \'immutable\'', function test() {
      const data = Immutable.fromJS({
        'ns2:account': {
          rolesProtection: 'immutable',
        },
      });

      isSecurityRecordImmutable(data).should.equal(true);
    });

    it('should return false if no data is supplied', function test() {
      isSecurityRecordImmutable().should.equal(false);
    });

    it('should return false if no data is supplied', function test() {
      isSecurityRecordImmutable().should.equal(false);
    });
  });

  describe('normalizeFieldValue', function suite() {
    it('should return the value when the field descriptor is undefined', function test() {
      normalizeFieldValue(undefined, 'a').should.equal('a');
      normalizeFieldValue(undefined, 0).should.equal(0);
      normalizeFieldValue(undefined, '').should.equal('');

      expect(normalizeFieldValue(undefined, null)).to.equal(null);
    });

    it('should wrap the field value in a list when the field is repeating and the value is not a list', function test() {
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

    it('should return the value when a repeating field value is already a list', function test() {
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

    it('should deeply normalize maps', function test() {
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

  describe('normalizeRecordData', function suite() {
    it('should deeply normalize the data', function test() {
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

    it('should call the configured record normalizer for the record type', function test() {
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

  describe('getWorkflowState', function suite() {
    it('should return the workflow state of the record', function test() {
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

  describe('setXmlNamespaceAttribute', function suite() {
    it('should set the namespace uri attribute on parts', function test() {
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

  describe('hasHierarchyRelations', function suite() {
    it('should return true if the record data contains a relations list with more than zero total items', function test() {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            totalItems: '2',
          },
        },
      });

      hasHierarchyRelations(data).should.equal(true);
    });

    it('should return false if the record data contains a relations list with zero total items', function test() {
      const data = Immutable.fromJS({
        document: {
          'rel:relations-common-list': {
            totalItems: '0',
          },
        },
      });

      hasHierarchyRelations(data).should.equal(false);
    });

    it('should return false if the record data does not contain a relations list', function test() {
      const data = Immutable.fromJS({
        document: {},
      });

      hasHierarchyRelations(data).should.equal(false);
    });
  });
});
