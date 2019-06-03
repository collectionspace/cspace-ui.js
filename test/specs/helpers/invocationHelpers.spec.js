import Immutable from 'immutable';
import { createInvocationData } from '../../../src/helpers/invocationHelpers';

describe('invocationHelpers', function moduleSuite() {
  const config = {
    recordTypes: {
      collectionobject: {
        serviceConfig: {
          objectName: 'CollectionObject',
        },
      },
    },
  };

  describe('createInvocationData', function suite() {
    it('should create invocation data for no context mode invocation descriptors', function test() {
      const invocationDescriptor = Immutable.Map({
        mode: 'nocontext',
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: undefined,
          params: undefined,
        },
      });
    });

    it('should create invocation data for single mode invocation descriptors', function test() {
      const invocationDescriptor = Immutable.Map({
        mode: 'single',
        recordType: 'collectionobject',
        csid: '1234',
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'single',
          docType: 'CollectionObject',
          singleCSID: '1234',
          params: undefined,
        },
      });
    });

    it('should create invocation data for list mode invocation descriptors', function test() {
      const invocationDescriptor = Immutable.Map({
        mode: 'list',
        recordType: 'collectionobject',
        csid: ['1234', 'abcd'],
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'list',
          docType: 'CollectionObject',
          listCSIDs: {
            csid: [
              '1234',
              'abcd',
            ],
          },
          params: undefined,
        },
      });
    });

    it('should create invocation data for group mode invocation descriptors', function test() {
      const invocationDescriptor = Immutable.Map({
        mode: 'group',
        csid: '1234',
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'group',
          docType: undefined,
          groupCSID: '1234',
          params: undefined,
        },
      });
    });

    it('should convert params to key/value pairs', function test() {
      const invocationDescriptor = Immutable.Map({
        mode: 'nocontext',
      });

      const params = {
        foo: '123',
        bar: 'xyz',
      };

      createInvocationData(config, invocationDescriptor, params).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: undefined,
          params: {
            param: [
              { key: 'foo', value: '123' },
              { key: 'bar', value: 'xyz' },
            ],
          },
        },
      });
    });
  });
});
