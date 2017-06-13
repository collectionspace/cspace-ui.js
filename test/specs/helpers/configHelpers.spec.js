import Immutable from 'immutable';

import {
  configKey,
  dataPathToFieldDescriptorPath,
  findFieldConfigInPart,
  getDefaults,
  getDefaultValue,
  initConfig,
  mergeConfig,
  applyPlugins,
  applyPlugin,
  evaluatePlugin,
  normalizeConfig,
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getRecordTypeNameByServiceObjectName,
  getVocabularyConfigByShortID,
  isFieldCloneable,
  getDefaultSearchRecordType,
  getDefaultSearchVocabulary,
  validateLocation,
} from '../../../src/helpers/configHelpers';

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
          collectionobject: {},
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
      mergeConfig({}, {
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

  describe('normalizeConfig', function suite() {
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

      normalizeConfig(config).should.deep.equal({
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
      isFieldCloneable({
        [configKey]: {},
      }).should.equal(true);
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
});
