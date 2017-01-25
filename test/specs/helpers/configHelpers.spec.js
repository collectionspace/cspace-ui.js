import {
  initConfig,
  mergeConfig,
  applyPlugins,
  applyPlugin,
  evaluatePlugin,
  normalizeConfig,
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
} from '../../../src/helpers/configHelpers';

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
        cspaceUrl: 'http://collectionspace.org',
        messages: {
          title: 'CollectionSpace',
        },
      });

      config.should.deep.equal({
        cspaceUrl: 'http://collectionspace.org',
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
        cspaceUrl: 'http://collectionspace.org',
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
          cspaceUrl: 'a',
          messages: {
            title: '1',
          },
          options: {
            languages: {},
          },
        },
        {
          cspaceUrl: 'b',
          messages: {
            title: '2',
            greeting: '$',
          },
        },
        {
          cspaceUrl: 'c',
          messages: {
            greeting: '*',
          },
          recordTypes: {
            object: {},
          },
        },
      ]).should.deep.equal({
        cspaceUrl: 'c',
        messages: {
          title: '2',
          greeting: '*',
        },
        recordTypes: {
          object: {},
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
        cspaceUrl: 'a',
      }, {
        cspaceUrl: 'http://collectionspace.org',
        plugins: [],
      }).should.deep.equal({
        cspaceUrl: 'http://collectionspace.org',
      });
    });

    it('should apply plugins from the source config, then merge in the source config', function test() {
      mergeConfig({}, {
        cspaceUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
        },
        plugins: [
          {
            cspaceUrl: 'a',
            options: {
              languages: {},
            },
          },
          {
            cspaceUrl: 'b',
            messages: {
              title: 'c',
              greeting: 'Hello',
            },
          },
        ],
      }).should.deep.equal({
        cspaceUrl: 'http://collectionspace.org',
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
        cspaceUrl: 'http://collectionspace.org',
        messages: {
          title: 'CSpace',
        },
        plugins: [
          {
            cspaceUrl: 'a',
            options: {
              languages: {},
            },
          },
          {
            cspaceUrl: 'b',
            messages: {
              title: 'c',
              greeting: 'Hello',
            },
          },
        ],
      }).should.deep.equal({
        cspaceUrl: 'http://collectionspace.org',
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
          object: {},
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
          object: {
            name: 'object',
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
        object: {
          messages: {
            recordNameTitle: {
              id: 'record.object.nameTitle',
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
        .equal(config.recordTypes.object);
    });
  });

  describe('getRecordTypeConfigByServicePath', function suite() {
    const config = {
      recordTypes: {
        object: {
          messages: {
            recordNameTitle: {
              id: 'record.object.nameTitle',
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
        .equal(config.recordTypes.object);
    });
  });

  describe('getVocabularyConfigByShortID', function suite() {
    const recordTypeConfig = {
      vocabularies: {
        local: {
          messages: {
            vocabNameTitle: {
              id: 'vocab.person.local.nameTitle',
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
});
