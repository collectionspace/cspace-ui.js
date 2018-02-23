import React from 'react';
import Immutable from 'immutable';

import {
  configKey,
  dataPathToFieldDescriptorPath,
  findFieldConfigInPart,
  findVocabularyUses,
  getDefaults,
  getDefaultValue,
  getFieldCustomValidator,
  getFieldComputer,
  getFieldDataType,
  getRequiredMessage,
  initConfig,
  mergeConfig,
  applyPlugins,
  applyPlugin,
  evaluatePlugin,
  getFirstColumnName,
  initializeExtensions,
  initializeRecordTypes,
  getRecordTypeConfigByServiceDocumentName,
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeNameByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getRecordTypeConfigByUri,
  getRecordTypeNameByUri,
  getVocabularyConfigByShortID,
  getVocabularyConfigByServicePath,
  isFieldCloneable,
  isFieldRequired,
  isFieldRepeating,
  getDefaultSearchRecordType,
  getDefaultSearchVocabulary,
  validateLocation,
  isAuthority,
  isUtility,
} from '../../../src/helpers/configHelpers';

import {
  DATA_TYPE_INT,
  DATA_TYPE_MAP,
  DATA_TYPE_STRING,
} from '../../../src/constants/dataTypes';

import {
  ERR_INVALID_CSID,
  ERR_INVALID_RELATED_TYPE,
  ERR_MISSING_VOCABULARY,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_UNKNOWN_SUBRESOURCE,
} from '../../../src/constants/errorCodes';

const expect = chai.expect;

chai.should();

describe('configHelpers', function moduleSuite() {
  describe('evaluatePlugin', function suite() {
    it('should return empty object if the plugin is not an object or function', function test() {
      evaluatePlugin('').should.deep.equal({});
      evaluatePlugin(0).should.deep.equal({});
      evaluatePlugin([]).should.deep.equal({});
      evaluatePlugin(null).should.deep.equal({});
      evaluatePlugin(undefined).should.deep.equal({});
    });

    it('should return the plugin if it is an object', function test() {
      const plugin = {};

      evaluatePlugin(plugin).should.equal(plugin);
    });

    it('should call the plugin with the pluginContext if it is a function', function test() {
      const stubPluginContext = {};

      const plugin = pluginContext => ({
        calledWithPluginContext: pluginContext,
      });

      evaluatePlugin(plugin, stubPluginContext).should.deep.equal({
        calledWithPluginContext: stubPluginContext,
      });
    });
  });

  describe('applyPlugin', function suite() {
    it('should deeply merge the config contribution from the plugin with the target config', function test() {
      let config;

      config = applyPlugin({}, {
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CollectionSpace',
        },
      });

      config.should.deep.equal({
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CollectionSpace',
        },
      });

      config = applyPlugin(config, {
        messages: {
          title: 'CSpace',
          greeting: 'Hello',
        },
      });

      config.should.deep.equal({
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
          greeting: 'Hello',
        },
      });
    });
  });

  describe('applyPlugins', function suite() {
    it('should return the target config if plugins is not an array', function test() {
      const config = {};

      applyPlugins(config, {}).should.equal(config);
      applyPlugins(config, '').should.equal(config);
      applyPlugins(config, 0).should.equal(config);
      applyPlugins(config, null).should.equal(config);
      applyPlugins(config, undefined).should.equal(config);
    });

    it('should apply each plugin to the target config in order', function test() {
      applyPlugins({}, [
        {
          serverUrl: 'a',
          messages: {
            title: '1',
          },
          options: {
            languages: {},
          },
        },
        {
          serverUrl: 'b',
          messages: {
            title: '2',
            greeting: '$',
          },
        },
        {
          serverUrl: 'c',
          messages: {
            greeting: '*',
          },
          recordTypes: {
            collectionobject: {},
          },
        },
      ]).should.deep.equal({
        serverUrl: 'c',
        messages: {
          title: '2',
          greeting: '*',
        },
        recordTypes: {
          collectionobject: {
            name: 'collectionobject',
          },
        },
        options: {
          languages: {},
        },
      });
    });
  });

  describe('mergeConfig', function suite() {
    it('should not retain the plugins config option after merge', function test() {
      mergeConfig({
        serverUrl: 'a',
      }, {
        serverUrl: 'http://collectionspace.org',
        plugins: [],
      }).should.deep.equal({
        serverUrl: 'http://collectionspace.org',
      });
    });

    it('should apply plugins from the source config, then merge in the source config', function test() {
      mergeConfig({
        messages: {
          name: 'Dale',
        },
      }, {
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
        },
        plugins: [
          {
            serverUrl: 'a',
            options: {
              languages: {},
            },
          },
          {
            serverUrl: 'b',
            messages: {
              title: 'c',
              greeting: 'Hello',
              name: 'Diane',
            },
          },
        ],
      }).should.deep.equal({
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
          greeting: 'Hello',
          name: 'Diane',
        },
        options: {
          languages: {},
        },
      });
    });

    it('should overwrite arrays in the target with the source value, instead of deeply merging them', function test() {
      const sourceArray = [1, 2, 3, 4];
      const targetArray = [5, 6, 7];

      mergeConfig({
        values: targetArray,
      }, {
        values: sourceArray,
      }).should.deep.equal({
        values: sourceArray,
      });
    });

    it('should overwrite the \'advancedSearch\' key in the target with the source value, instead of deeply merging them', function test() {
      const sourceConfig = {
        foo: {
          abc: 123,
        },
      };

      const targetConfig = {
        bar: {
          def: 456,
        },
      };

      mergeConfig({
        advancedSearch: targetConfig,
      }, {
        advancedSearch: sourceConfig,
      }).should.deep.equal({
        advancedSearch: sourceConfig,
      });
    });

    it('should overwrite React elements in the target with the source value, instead of deeply merging them', function test() {
      const sourceTemplate = (
        <div>
          <p>1</p>
          <p>2</p>
        </div>
      );

      const targetTemplate = (
        <div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div>
      );

      mergeConfig({
        template: targetTemplate,
      }, {
        template: sourceTemplate,
      }).should.deep.equal({
        template: sourceTemplate,
      });
    });
  });

  describe('initConfig', function suite() {
    it('should apply the plugins', function test() {
      initConfig({
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
        },
        plugins: [
          {
            serverUrl: 'a',
            options: {
              languages: {},
            },
          },
          {
            serverUrl: 'b',
            messages: {
              title: 'c',
              greeting: 'Hello',
            },
          },
        ],
      }).should.deep.equal({
        serverUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
          greeting: 'Hello',
        },
        options: {
          languages: {},
        },
      });
    });
  });
  describe('initializeExtensions', function suite() {
    it('should set the extensionName property of each top level field in each extension to the extension name', function test() {
      const config = {
        extensions: {
          core: {
            fields: {
              'ns2:collectionspace_core': {
                [configKey]: {
                  foo: 'bar',
                },
              },
            },
          },
          structuredDate: {
            fields: {
              displayDate: {},
              dateAssociation: {},
            },
          },
          dimension: {
            fields: {
              measuredPartGroupList: {
                measuredPartGroup: {},
              },
            },
          },
        },
      };

      initializeExtensions(config).should.deep.equal({
        extensions: {
          core: {
            fields: {
              'ns2:collectionspace_core': {
                [configKey]: {
                  foo: 'bar',
                  extensionName: 'core',
                },
              },
            },
          },
          structuredDate: {
            fields: {
              displayDate: {
                [configKey]: {
                  extensionName: 'structuredDate',
                },
              },
              dateAssociation: {
                [configKey]: {
                  extensionName: 'structuredDate',
                },
              },
            },
          },
          dimension: {
            fields: {
              measuredPartGroupList: {
                [configKey]: {
                  extensionName: 'dimension',
                },
                measuredPartGroup: {},
              },
            },
          },
        },
      });
    });
  });

  describe('initializeRecordTypes', function suite() {
    it('should set the name properties on record types and vocabularies', function test() {
      const config = {
        recordTypes: {
          collectionobject: {},
          person: {
            vocabularies: {
              local: {},
              ulan: {},
            },
          },
        },
      };

      initializeRecordTypes(config).should.deep.equal({
        recordTypes: {
          collectionobject: {
            name: 'collectionobject',
          },
          person: {
            name: 'person',
            vocabularies: {
              local: {
                name: 'local',
              },
              ulan: {
                name: 'ulan',
              },
            },
          },
        },
      });
    });

    it('should delete disabled record types and vocabularies', function test() {
      const config = {
        recordTypes: {
          collectionobject: {
            disabled: true,
          },
          person: {
            vocabularies: {
              local: {},
              ulan: {
                disabled: true,
              },
            },
          },
        },
      };

      initializeRecordTypes(config).should.deep.equal({
        recordTypes: {
          person: {
            name: 'person',
            vocabularies: {
              local: {
                name: 'local',
              },
            },
          },
        },
      });
    });

    it('should set the extensionParentConfig field on extension fields', function test() {
      const collectionobjectDocumentConfig = {
        foo: 'bar',
      };

      const groupDocumentConfig = {
        foo: 'baz',
      };

      const productionDateGroupConfig = {
        something: 'else',
      };

      const config = {
        recordTypes: {
          collectionobject: {
            fields: {
              document: {
                [configKey]: collectionobjectDocumentConfig,
                'ns2:collectionspace_core': {
                  [configKey]: {
                    extensionName: 'core',
                  },
                },
                'ns2:collectionobjects_common': {
                  productionDateGroup: {
                    [configKey]: productionDateGroupConfig,
                    displayDate: {
                      [configKey]: {
                        extensionName: 'structuredDate',
                      },
                    },
                  },
                },
              },
            },
          },
          group: {
            fields: {
              document: {
                [configKey]: groupDocumentConfig,
                'ns2:collectionspace_core': {
                  [configKey]: {
                    extensionName: 'core',
                  },
                },
              },
            },
          },
        },
      };

      initializeRecordTypes(config).should.deep.equal({
        recordTypes: {
          collectionobject: {
            name: 'collectionobject',
            fields: {
              document: {
                [configKey]: collectionobjectDocumentConfig,
                'ns2:collectionspace_core': {
                  [configKey]: {
                    extensionName: 'core',
                    extensionParentConfig: collectionobjectDocumentConfig,
                  },
                },
                'ns2:collectionobjects_common': {
                  productionDateGroup: {
                    [configKey]: productionDateGroupConfig,
                    displayDate: {
                      [configKey]: {
                        extensionName: 'structuredDate',
                        extensionParentConfig: productionDateGroupConfig,
                      },
                    },
                  },
                },
              },
            },
          },
          group: {
            name: 'group',
            fields: {
              document: {
                [configKey]: groupDocumentConfig,
                'ns2:collectionspace_core': {
                  [configKey]: {
                    extensionName: 'core',
                    extensionParentConfig: groupDocumentConfig,
                  },
                },
              },
            },
          },
        },
      });
    });
  });

  describe('getRecordTypeConfigByServiceDocumentName', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          serviceConfig: {
            documentName: 'collectionobjects',
          },
        },
      },
    };

    it('should return the record type config with the given service object name', function test() {
      getRecordTypeConfigByServiceDocumentName(config, 'collectionobjects').should
        .equal(config.recordTypes.collectionobject);
    });

    it('should return undefined if the service object name is undefined', function test() {
      expect(getRecordTypeConfigByServiceDocumentName(config)).to
        .equal(undefined);
    });
  });

  describe('getRecordTypeConfigByServiceObjectName', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return the record type config with the given service object name', function test() {
      getRecordTypeConfigByServiceObjectName(config, 'CollectionObject').should
        .equal(config.recordTypes.collectionobject);
    });

    it('should return undefined if the service object name is undefined', function test() {
      expect(getRecordTypeConfigByServiceObjectName(config)).to
        .equal(undefined);
    });
  });

  describe('getRecordTypeNameByServiceObjectName', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          name: 'collectionobject',
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return the record type config with the given service object name', function test() {
      getRecordTypeNameByServiceObjectName(config, 'CollectionObject').should
        .equal(config.recordTypes.collectionobject.name);
    });

    it('should return undefined if the service object name is undefined', function test() {
      expect(getRecordTypeNameByServiceObjectName(config)).to
        .equal(undefined);
    });
  });

  describe('getRecordTypeConfigByServicePath', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          serviceConfig: {
            servicePath: 'collectionobjects',
          },
        },
      },
    };

    it('should return the record type config with the given service path', function test() {
      getRecordTypeConfigByServicePath(config, 'collectionobjects').should
        .equal(config.recordTypes.collectionobject);
    });

    it('should return undefined if no service path is supplied', function test() {
      expect(getRecordTypeConfigByServicePath(config)).to.equal(undefined);
    });
  });

  describe('getRecordTypeConfigByUri', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          serviceConfig: {
            servicePath: 'collectionobjects',
          },
        },
      },
    };

    it('should return the record type config with the given URI', function test() {
      getRecordTypeConfigByUri(config, '/collectionobjects/1234').should
        .equal(config.recordTypes.collectionobject);
    });
  });

  describe('getRecordTypeNameByUri', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
          name: 'collectionobject',
          serviceConfig: {
            servicePath: 'collectionobjects',
          },
        },
      },
    };

    it('should return the record type config with the given URI', function test() {
      getRecordTypeNameByUri(config, '/collectionobjects/1234').should
        .equal(config.recordTypes.collectionobject.name);
    });

    it('should return undefined if the URI is undefined', function test() {
      expect(getRecordTypeNameByUri(config)).to
        .equal(undefined);
    });
  });

  describe('getVocabularyConfigByShortID', function suite() {
    const recordTypeConfig = {
      vocabularies: {
        local: {
          messages: {
            name: {
              id: 'vocab.person.local.name',
            },
          },
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
      },
    };

    it('should return the vocabulary type config with the given short id', function test() {
      getVocabularyConfigByShortID(recordTypeConfig, 'person').should
        .equal(recordTypeConfig.vocabularies.local);
    });

    it('should return undefined if no short id is supplied', function test() {
      expect(getVocabularyConfigByShortID(recordTypeConfig)).to.equal(undefined);
    });
  });

  describe('getVocabularyConfigByServicePath', function suite() {
    const recordTypeConfig = {
      vocabularies: {
        local: {
          messages: {
            name: {
              id: 'vocab.person.local.name',
            },
          },
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
      },
    };

    it('should return the vocabulary type config with the given service path', function test() {
      getVocabularyConfigByServicePath(recordTypeConfig, 'urn:cspace:name(person)').should
        .equal(recordTypeConfig.vocabularies.local);
    });

    it('should return undefined if the service path is not a valid cspace URN', function test() {
      expect(getVocabularyConfigByServicePath(recordTypeConfig, 'something weird')).to
        .equal(undefined);
    });
  });

  describe('getDefaults', function suite() {
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

    it('should return the paths and default values of fields that have defaults', function test() {
      getDefaults(fieldDescriptor).should.deep.equal([
        {
          path: ['document', 'common', 'recordStatus'],
          value: 'new',
        },
        {
          path: ['document', 'common', 'titleGroupList', 'titleGroup', 'titleLanguage'],
          value: 'English',
        },
      ]);
    });
  });

  describe('getDefaultValue', function suite() {
    it('should return the default value from a field descriptor', function test() {
      const fieldDescriptor = {
        [configKey]: {
          defaultValue: 'new',
        },
      };

      getDefaultValue(fieldDescriptor).should.equal('new');
    });

    it('should convert an object to an immutable map', function test() {
      const fieldDescriptor = {
        [configKey]: {
          defaultValue: {
            foo: {
              bar: 'baz',
            },
          },
        },
      };

      const defaultValue = getDefaultValue(fieldDescriptor);

      Immutable.Map.isMap(defaultValue).should.equal(true);

      defaultValue.toJS().should.deep.equal({
        foo: {
          bar: 'baz',
        },
      });
    });
  });

  describe('dataPathToFieldDescriptorPath', function suite() {
    it('should remove numeric path components from the data path', function test() {
      dataPathToFieldDescriptorPath(['document', 'common', 'groupList', 'group', '1', 'foo', '2', 'bar']).should
        .deep.equal(['document', 'common', 'groupList', 'group', 'foo', 'bar']);
    });
  });

  describe('isFieldCloneable', function suite() {
    it('should return the cloneable configuration setting', function test() {
      isFieldCloneable({
        [configKey]: {
          cloneable: false,
        },
      }).should.equal(false);

      isFieldCloneable({
        [configKey]: {
          cloneable: true,
        },
      }).should.equal(true);
    });

    it('should default to true', function test() {
      isFieldCloneable({}).should.equal(true);

      isFieldCloneable({
        [configKey]: {},
      }).should.equal(true);
    });
  });

  describe('isFieldRepeating', function suite() {
    it('should return the repeating configuration setting', function test() {
      isFieldRepeating({
        [configKey]: {
          repeating: false,
        },
      }).should.equal(false);

      isFieldRepeating({
        [configKey]: {
          repeating: true,
        },
      }).should.equal(true);
    });

    it('should default to false', function test() {
      isFieldRepeating({}).should.equal(false);

      isFieldRepeating({
        [configKey]: {},
      }).should.equal(false);
    });
  });

  describe('isFieldRequired', function suite() {
    it('should return the required configuration setting', function test() {
      isFieldRequired({
        [configKey]: {
          required: false,
        },
      }).should.equal(false);

      isFieldRequired({
        [configKey]: {
          required: true,
        },
      }).should.equal(true);
    });

    it('should return the result of calling the required function, if it is a function', function test() {
      const recordData = Immutable.Map();

      let requiredRecordData = null;

      isFieldRequired({
        [configKey]: {
          required: (recordDataArg) => {
            requiredRecordData = recordDataArg;

            return false;
          },
        },
      }, recordData).should.equal(false);

      requiredRecordData.should.equal(recordData);
    });

    it('should default to false', function test() {
      isFieldRequired({}).should.equal(false);

      isFieldRequired({
        [configKey]: {},
      }).should.equal(false);
    });
  });

  describe('validateLocation', function suite() {
    const config = {
      recordTypes: {
        collectionobject: {
          serviceConfig: {
            serviceType: 'object',
          },
        },
        group: {
          serviceConfig: {
            serviceType: 'procedure',
          },
        },
        person: {
          serviceConfig: {
            serviceType: 'authority',
          },
          vocabularies: {
            local: {},
          },
        },
      },
      subresources: {
        terms: {},
      },
    };

    it('should return ERR_UNKNOWN_RECORD_TYPE error if the record type is unknown', function test() {
      validateLocation(config, { recordType: 'foo' }).should.deep.equal({
        error: {
          recordType: 'foo',
          code: ERR_UNKNOWN_RECORD_TYPE,
        },
      });
    });

    it('should return ERR_MISSING_VOCABULARY error if an authority record type is passed with no vocabulary', function test() {
      validateLocation(config, { recordType: 'person' }).should.deep.equal({
        error: {
          recordType: 'person',
          code: ERR_MISSING_VOCABULARY,
        },
      });
    });

    it('should return ERR_UNKNOWN_VOCABULARY error if an unknown vocabulary is passed', function test() {
      validateLocation(config, { recordType: 'person', vocabulary: 'foo' }).should.deep.equal({
        error: {
          recordType: 'person',
          vocabulary: 'foo',
          code: ERR_UNKNOWN_VOCABULARY,
        },
      });
    });

    it('should return ERR_UNKNOWN_VOCABULARY error if a vocabulary is passed with a non-authority record type', function test() {
      validateLocation(config, { recordType: 'group', vocabulary: 'foo' }).should.deep.equal({
        error: {
          recordType: 'group',
          vocabulary: 'foo',
          code: ERR_UNKNOWN_VOCABULARY,
        },
      });
    });

    it('should return ERR_UNKNOWN_SUBRESOURCE error if an unknown subresource is passed', function test() {
      validateLocation(config, { recordType: 'group', subresource: 'foo' }).should.deep.equal({
        error: {
          subresource: 'foo',
          code: ERR_UNKNOWN_SUBRESOURCE,
        },
      });
    });

    it('should return ERR_INVALID_CSID error if an invalid csid is passed', function test() {
      validateLocation(config, { recordType: 'group', csid: 'foo' }).should.deep.equal({
        error: {
          csid: 'foo',
          code: ERR_INVALID_CSID,
        },
      });
    });

    it('should return ERR_INVALID_RELATED_TYPE error if a relatedRecordType is passed that is not a procedure or object', function test() {
      validateLocation(config, { recordType: 'group', relatedRecordType: 'person' }).should.deep.equal({
        error: {
          recordType: 'group',
          relatedRecordType: 'person',
          code: ERR_INVALID_RELATED_TYPE,
        },
      });
    });

    it('should return ERR_INVALID_RELATED_TYPE error if a relatedRecordType is passed and the recordType is not a procedure or object', function test() {
      validateLocation(config, { recordType: 'person', vocabulary: 'local', relatedRecordType: 'group' }).should.deep.equal({
        error: {
          recordType: 'person',
          relatedRecordType: 'group',
          code: ERR_INVALID_RELATED_TYPE,
        },
      });
    });

    it('should return ERR_INVALID_CSID error if an invalid related csid is passed', function test() {
      validateLocation(config,
        { recordType: 'collectionobject', csid: '2ee54531-3f31-4633-8f2c', relatedRecordType: 'group', relatedCsid: 'foo' }
      ).should.deep.equal({
        error: {
          csid: 'foo',
          code: ERR_INVALID_CSID,
        },
      });
    });

    it('should return object with no error property if valid arguments are passed', function test() {
      validateLocation(config, { recordType: 'group' })
        .should.be.an('object')
        .and.should.not.have.property('error');
    });
  });

  describe('getDefaultSearchRecordType', function suite() {
    it('should return the record type with defaultForSearch set to true', function test() {
      const config = {
        recordTypes: {
          collectionobject: {},
          group: {},
          loanin: {
            defaultForSearch: true,
          },
        },
      };

      getDefaultSearchRecordType(config).should.equal('loanin');
    });

    it('should return the first record type if none have defaultForSearch set to true', function test() {
      const config = {
        recordTypes: {
          collectionobject: {},
          group: {},
          loanin: {},
        },
      };

      getDefaultSearchRecordType(config).should.equal('collectionobject');
    });
  });

  describe('getDefaultSearchVocabulary', function suite() {
    it('should return the vocabulary with defaultForSearch set to true', function test() {
      const config = {
        vocabularies: {
          all: {},
          local: {
            defaultForSearch: true,
          },
          shared: {},
          other: {},
        },
      };

      getDefaultSearchVocabulary(config).should.equal('local');
    });

    it('should return the first record type if none have defaultForSearch set to true', function test() {
      const config = {
        vocabularies: {
          all: {},
          local: {},
          shared: {},
          other: {},
        },
      };

      getDefaultSearchVocabulary(config).should.equal('all');
    });
  });

  describe('findFieldConfigInPart', function suite() {
    const updatedAtConfig = {};
    const titleConfig = {};

    const recordTypeConfig = {
      fields: {
        document: {
          'ns2:collectionspace_core': {
            updatedAt: {
              [configKey]: updatedAtConfig,
            },
          },
          'ns2:collectionobjects_common': {
            titleGroupList: {
              titleGroup: {
                title: {
                  [configKey]: titleConfig,
                },
              },
            },
          },
        },
      },
    };

    it('should find the field config given a part name and field name', function test() {
      findFieldConfigInPart(recordTypeConfig, 'collectionspace_core', 'updatedAt').should
        .equal(updatedAtConfig);
    });

    it('should find nested fields', function test() {
      findFieldConfigInPart(recordTypeConfig, 'collectionobjects_common', 'title').should
        .equal(titleConfig);
    });

    it('should return null if an unknown part name is supplied', function test() {
      expect(findFieldConfigInPart(recordTypeConfig, 'foo', 'title')).to
        .equal(null);
    });

    it('should return null if an unknown field name is supplied', function test() {
      expect(findFieldConfigInPart(recordTypeConfig, 'collectionobjects_common', 'foo')).to
        .equal(null);
    });
  });

  describe('isAuthority', function suite() {
    it('should return true if the service type is \'authority\'', function test() {
      isAuthority({
        serviceConfig: {
          serviceType: 'authority',
        },
      }).should.equal(true);
    });

    it('should return true if the service type is not \'authority\'', function test() {
      isAuthority({
        serviceConfig: {
          serviceType: 'procedure',
        },
      }).should.equal(false);
    });
  });

  describe('isUtility', function suite() {
    it('should return true if the service type is \'utility\'', function test() {
      isUtility({
        serviceConfig: {
          serviceType: 'utility',
        },
      }).should.equal(true);
    });

    it('should return true if the service type is not \'utility\'', function test() {
      isUtility({
        serviceConfig: {
          serviceType: 'procedure',
        },
      }).should.equal(false);
    });
  });

  describe('getFieldCustomValidator', function suite() {
    it('should return the validator from a field descriptor', function test() {
      const validator = () => '';

      const fieldDescriptor = {
        [configKey]: {
          validate: validator,
        },
      };

      getFieldCustomValidator(fieldDescriptor).should.equal(validator);
    });

    it('should return undefined if there is no field configuration', function test() {
      const fieldDescriptor = {};

      expect(getFieldCustomValidator(fieldDescriptor)).to.equal(undefined);
    });
  });

  describe('getFieldComputer', function suite() {
    it('should return the compute function from a field descriptor', function test() {
      const computer = () => '';

      const fieldDescriptor = {
        [configKey]: {
          compute: computer,
        },
      };

      getFieldComputer(fieldDescriptor).should.equal(computer);
    });

    it('should return undefined if there is no field configuration', function test() {
      const fieldDescriptor = {};

      expect(getFieldComputer(fieldDescriptor)).to.equal(undefined);
    });
  });

  describe('getFieldDataType', function suite() {
    it('should return the data type from a field descriptor', function test() {
      const dataType = DATA_TYPE_INT;

      const fieldDescriptor = {
        [configKey]: {
          dataType,
        },
      };

      getFieldDataType(fieldDescriptor).should.equal(dataType);
    });

    it('should default to string if there is no field configuration', function test() {
      const fieldDescriptor = {};

      expect(getFieldDataType(fieldDescriptor)).to.equal(DATA_TYPE_STRING);
    });

    it('should default to string if there is no data type specified in configuration', function test() {
      const fieldDescriptor = {
        [configKey]: {},
      };

      expect(getFieldDataType(fieldDescriptor)).to.equal(DATA_TYPE_STRING);
    });

    it('should default to map if there is no data type specified in configuration and child fields are defined', function test() {
      const fieldDescriptor = {
        [configKey]: {},
        child: {},
      };

      expect(getFieldDataType(fieldDescriptor)).to.equal(DATA_TYPE_MAP);
    });
  });

  describe('getRequiredMessage', function suite() {
    it('should return the required message descriptor', function test() {
      const requiredMessageDescriptor = {
        id: 'field.required',
        defaultMessage: 'Field is required',
      };

      const fieldDescriptor = {
        [configKey]: {
          messages: {
            required: requiredMessageDescriptor,
          },
        },
      };

      getRequiredMessage(fieldDescriptor).should.equal(requiredMessageDescriptor);
    });
  });

  describe('findVocabularyUses', function suite() {
    const shortId = 'shortId';

    const config = {
      recordTypes: {
        group: {
          name: 'group',
          fields: {
            field1: {
              [configKey]: {
                messages: {
                  name: 'field1',
                },
                view: {
                  props: {
                    source: shortId,
                  },
                },
              },
            },
            field2: {
              [configKey]: {
                view: {},
              },
            },
          },
        },
        intake: {
          name: 'intake',
          fields: {
            field3: {
              field4: {
                [configKey]: {
                  messages: {
                    name: 'field3/field4',
                  },
                  view: {
                    props: {
                      source: shortId,
                    },
                  },
                },
              },
            },
            field5: {
              [configKey]: {
                view: {},
              },
            },
          },
        },
      },
    };

    it('should find fields in config using the given shortId as a source', function test() {
      findVocabularyUses(config, shortId).should.deep.equal({
        group: [
          {
            messages: {
              name: 'field1',
            },
            view: {
              props: {
                source: shortId,
              },
            },
          },
        ],
        intake: [
          {
            messages: {
              name: 'field3/field4',
            },
            view: {
              props: {
                source: shortId,
              },
            },
          },
        ],
      });
    });

    it('should return null if no short id is supplied', function test() {
      expect(findVocabularyUses(config, undefined)).to.equal(null);
    });
  });

  describe('getFirstColumnName', function suite() {
    const config = {
      recordTypes: {
        group: {
          columns: {
            default: {
              title: {
                order: 10,
              },
              owner: {
                order: 20,
              },
              updatedAt: {
                order: 30,
              },
            },
          },
        },
      },
    };

    it('should return the field with the lowest order in the column set', function test() {
      getFirstColumnName(config, 'group', 'default').should.equal('title');
    });

    it('should return undefined if no column config exists for the given column set name', function test() {
      expect(getFirstColumnName(config, 'group', 'foo')).to.equal(undefined);
    });

    it('should use the column set named \'default\' if no column set is specified', function test() {
      getFirstColumnName(config, 'group').should.equal('title');
    });
  });
});
