/* eslint-disable no-unused-expressions */

import Immutable from 'immutable';

import {
  attributePropertiesToTop,
  createDocument,
  createRecordData,
  deepGet,
  deepSet,
  getDocument,
  getPart,
  getPartPropertyName,
  getPartNSPropertyName,
  prepareForSending,
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

  describe('createDocument', function suite() {
    const serviceConfig = {
      name: 'groups',
      parts: {
        groups_common: 'http://collectionspace.org/services/group',
        groups_extension: 'http://collectionspace.org/services/extension/group',
      },
    };

    it('should return an Immutable.Map', function test() {
      Immutable.Map.isMap(createDocument(serviceConfig)).should.be.true;
    });

    it('should set the @name property to the service name', function test() {
      createDocument(serviceConfig).get('@name').should.equal('groups');
    });

    it('should create properties for each service part', function test() {
      const document = createDocument(serviceConfig);

      document.get('ns2:groups_common').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/group',
      });

      document.get('ns2:groups_extension').toJS().should.deep.equal({
        '@xmlns:ns2': 'http://collectionspace.org/services/extension/group',
      });
    });
  });

  describe('createRecordData', function suite() {
    const serviceConfig = {
      name: 'groups',
      parts: {
        groups_common: 'http://collectionspace.org/services/group',
        groups_extension: 'http://collectionspace.org/services/extension/group',
      },
    };

    it('should return an Immutable.Map', function test() {
      Immutable.Map.isMap(createRecordData(serviceConfig)).should.be.true;
    });

    it('should have a document property', function test() {
      createRecordData(serviceConfig).get('document').should.be.an('object');
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
});
