import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import { configKey } from '../../../src/helpers/configHelpers';
import { DATA_TYPE_STRUCTURED_DATE } from '../../../src/constants/dataTypes';
import { AutocompleteInput } from '../../../src/helpers/configContextInputs';

import {
  createInvocationData,
  getExportViewerPath,
  getReportViewerPath,
  normalizeInvocationDescriptor,
} from '../../../src/helpers/invocationHelpers';

chai.use(chaiImmutable);

describe('invocationHelpers', () => {
  const config = {
    basename: 'base',
    recordTypes: {
      collectionobject: {
        serviceConfig: {
          objectName: 'CollectionObject',
        },
        fields: {
          document: {
            'ns2:collectionobjects_common': {
              fieldCollectionDateGroup: {
                [configKey]: {
                  dataType: DATA_TYPE_STRUCTURED_DATE,
                },
              },
              owner: {
                [configKey]: {
                  view: {
                    type: AutocompleteInput,
                    props: {
                      source: 'person/local,organization/local',
                    },
                  },
                },
              },
            },
          },
        },
      },
      person: {
        serviceConfig: {
          objectName: 'Person',
          servicePath: 'personauthorities',
        },
      },
      organization: {
        serviceConfig: {
          objectName: 'Organization',
          servicePath: 'orgauthorities',
        },
      },
    },
  };

  describe('createInvocationData', () => {
    it('should create invocation data for no context mode invocation descriptors', () => {
      const invocationDescriptor = Immutable.Map({
        mode: 'nocontext',
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: undefined,
          includeFields: undefined,
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should create invocation data for single mode invocation descriptors', () => {
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
          includeFields: undefined,
          singleCSID: '1234',
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should create invocation data for list mode invocation descriptors', () => {
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
          includeFields: undefined,
          listCSIDs: {
            csid: [
              '1234',
              'abcd',
            ],
          },
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should create invocation data for group mode invocation descriptors', () => {
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
          includeFields: undefined,
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should convert include fields to part:xpath format', () => {
      const invocationDescriptor = Immutable.fromJS({
        mode: 'nocontext',
        includeFields: [
          'ns2:collectionobjects_common/objectNumber',
          'ns2:collectionobjects_common/titleGroupList/titleGroup/title',
        ],
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: undefined,
          includeFields: {
            field: [
              'collectionobjects_common:objectNumber',
              'collectionobjects_common:titleGroupList/titleGroup/title',
            ],
          },
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should convert include fields that are structured date groups to use the display date', () => {
      const invocationDescriptor = Immutable.fromJS({
        mode: 'nocontext',
        recordType: 'collectionobject',
        includeFields: [
          'ns2:collectionobjects_common/fieldCollectionDateGroup',
        ],
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: 'CollectionObject',
          includeFields: {
            field: [
              {
                '@name': 'fieldCollectionDateGroup',
                '.': 'collectionobjects_common:fieldCollectionDateGroup/dateDisplayDate',
              },
            ],
          },
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should convert include fields that are controlled by multiple authorities to separate fields for each authority type', () => {
      const invocationDescriptor = Immutable.fromJS({
        mode: 'nocontext',
        recordType: 'collectionobject',
        includeFields: [
          'ns2:collectionobjects_common/owner',
        ],
      });

      createInvocationData(config, invocationDescriptor).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: 'CollectionObject',
          includeFields: {
            field: [
              {
                '@name': 'ownerPerson',
                '.': 'collectionobjects_common:owner[contains(., \':personauthorities:\')]',
              },
              {
                '@name': 'ownerOrganization',
                '.': 'collectionobjects_common:owner[contains(., \':orgauthorities:\')]',
              },
            ],
          },
          outputMIME: undefined,
          params: undefined,
        },
      });
    });

    it('should convert params to key/value pairs', () => {
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
          includeFields: undefined,
          outputMIME: undefined,
          params: {
            param: [
              { key: 'foo', value: '123' },
              { key: 'bar', value: 'xyz' },
            ],
          },
        },
      });
    });

    it('should convert array params to multiple key/value pairs with the same key', () => {
      const invocationDescriptor = Immutable.Map({
        mode: 'nocontext',
      });

      const params = {
        foo: ['123', '456'],
      };

      createInvocationData(config, invocationDescriptor, params).should.deep.equal({
        'ns2:invocationContext': {
          '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
          mode: 'nocontext',
          docType: undefined,
          includeFields: undefined,
          outputMIME: undefined,
          params: {
            param: [
              { key: 'foo', value: '123' },
              { key: 'foo', value: '456' },
            ],
          },
        },
      });
    });
  });

  describe('normalizeInvocationDescriptor', () => {
    it('should return an immutable map if the invocation descriptor is undefined', () => {
      normalizeInvocationDescriptor().should.equal(Immutable.Map());
    });

    it('should set outputMIME to the outputMIME in the metadata if it is not set', () => {
      const invocationDescriptor = Immutable.Map();

      const metadata = Immutable.fromJS({
        document: {
          'ns2:reports_common': {
            outputMIME: 'foo/bar',
          },
        },
      });

      normalizeInvocationDescriptor(invocationDescriptor, metadata).should.equal(Immutable.Map({
        outputMIME: 'foo/bar',
      }));
    });

    it('should set outputMIME to application/pdf if it is not set, and is also not set in the metadata', () => {
      const invocationDescriptor = Immutable.Map();

      const metadata = Immutable.fromJS({
        document: {
          'ns2:reports_common': {},
        },
      });

      normalizeInvocationDescriptor(invocationDescriptor, metadata).should.equal(Immutable.Map({
        outputMIME: 'application/pdf',
      }));
    });
  });

  describe('getReportViewerPath', () => {
    const reportCsid = '1234';

    const csid = '8888';
    const recordType = 'collectionobject';

    const invocationDescriptor = Immutable.Map({
      csid,
      recordType,
    });

    const params = {
      foo: 'abc',
    };

    it('should prepend the basename and \'report\' to the report csid, and add query parameters', () => {
      getReportViewerPath(config, reportCsid, invocationDescriptor, params).should
        .equal(`${config.basename}/report/${reportCsid}?csid=${csid}&recordType=${recordType}&params=%7B%22foo%22%3A%22abc%22%7D`);
    });

    it('should not prepend the basename if it is falsy', () => {
      const nullBasenameConfig = {
        ...config,
        basename: null,
      };

      getReportViewerPath(nullBasenameConfig, reportCsid, invocationDescriptor).should
        .equal(`/report/${reportCsid}?csid=${csid}&recordType=${recordType}`);
    });
  });

  describe('getExportViewerPath', () => {
    const csid = Immutable.List(['8888', '9999', '0000']);
    const recordType = 'collectionobject';
    const includeFields = Immutable.List(['title', 'name']);

    const invocationDescriptor = Immutable.Map({
      csid,
      recordType,
      includeFields,
    });

    it('should prepend the basename and \'export\', and add query parameters', () => {
      getExportViewerPath(config, invocationDescriptor).should
        .equal(`${config.basename}/export?csid%5B%5D=${csid.get(0)}&csid%5B%5D=${csid.get(1)}&csid%5B%5D=${csid.get(2)}&recordType=${recordType}&includeFields%5B%5D=${includeFields.get(0)}&includeFields%5B%5D=${includeFields.get(1)}`);
    });

    it('should not prepend the basename if it is falsy', () => {
      const nullBasenameConfig = {
        ...config,
        basename: null,
      };

      getExportViewerPath(nullBasenameConfig, invocationDescriptor).should
        .equal(`/export?csid%5B%5D=${csid.get(0)}&csid%5B%5D=${csid.get(1)}&csid%5B%5D=${csid.get(2)}&recordType=${recordType}&includeFields%5B%5D=${includeFields.get(0)}&includeFields%5B%5D=${includeFields.get(1)}`);
    });
  });
});
