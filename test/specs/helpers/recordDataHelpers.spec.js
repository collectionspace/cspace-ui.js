/* eslint-disable no-unused-expressions */

import Immutable from 'immutable';
import { configKey } from '../../../src/helpers/configHelpers';

import {
  applyDefaults,
  attributePropertiesToTop,
  clearUncloneable,
  cloneRecordData,
  createBlankRecord,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
  getCoreFieldValue,
  getDocument,
  getPart,
  getPartPropertyName,
  getPartNSPropertyName,
  getCreatedTimestamp,
  getCreatedUser,
  getUpdatedTimestamp,
  getUpdatedUser,
  prepareForSending,
  spreadDefaultValue,
} from '../../../src/helpers/recordDataHelpers';

const expect = chai.expect;

chai.should();

describe('recordDataHelpers', function moduleSuite() {
  describe('getPartPropertyName', function suite() {
    it('should return the part name prepended with the namespace prefix', function test() {
      getPartPropertyName('collectionspace_core').should.equal('ns2:collectionspace_core');
    });
  });

  describe('getPartNSPropertyName', function suite() {
    it('should return the namespace prefix prepended with \'@xmlns:\'', function test() {
      getPartNSPropertyName().should.equal('@xmlns:ns2');
    });
  });

  describe('getPart', function suite() {
    it('should return the named part from the given document', function test() {
      const corePart = Immutable.Map();

      const cspaceDocument = Immutable.fromJS({
        '@name': 'groups',
        'ns2:collectionspace_core': corePart,
      });

      getPart(cspaceDocument, 'collectionspace_core').should.equal(corePart);
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
      Immutable.Map.isMap(createBlankRecord(recordTypeConfig)).should.be.true;
    });

    it('should set the @name property to the document name', function test() {
      createBlankRecord(recordTypeConfig).get('document').get('@name').should.equal('groups');
    });

    it('should create properties for each service part', function test() {
      const document = createBlankRecord(recordTypeConfig);

      document.get('document').get('ns2:groups_common').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/group',
      });

      document.get('document').get('ns2:groups_extension').toJS().should.deep.equal({
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
      Immutable.Map.isMap(createRecordData(recordTypeConfig)).should.be.true;
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
        'ns2:account_permission': {},
      },
    });

    it('should remove the collectionspace_core part', function test() {
      prepareForSending(recordData).get('document').has('ns2:collectionspace_core').should.be.false;
    });

    it('should remove the account_permission part', function test() {
      prepareForSending(recordData).get('document').has('ns2:account_permission').should.be.false;
    });

    it('should sort attribute and namespace declaration properties to the top of each part', function test() {
      prepareForSending(recordData).get('document').get('ns2:groups_common').keySeq()
        .toArray().should.deep.equal(['@attr1', '@xmlns:ns2', 'name', 'date']);
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
    it('should return the created timestamp', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            createdAt: '1234',
          },
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
    it('should return the updated timestamp', function test() {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            updatedAt: '1234',
          },
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
});
