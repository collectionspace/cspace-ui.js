import React from 'react';
import Immutable from 'immutable';
import configurePlugin from '../../../../../src/plugins/record/object';

chai.should();

describe('object record plugin', function suite() {
  const config = {};
  const pluginFactory = configurePlugin(config);

  const pluginContext = {
    Immutable,
    React,
  };

  it('should have the correct shape', function test() {
    const plugin = pluginFactory(pluginContext);

    plugin.should.have.property('messageDescriptors').that.is.an('object');
    plugin.should.have.property('serviceConfig').that.is.an('object');
    plugin.should.have.property('title').that.is.a('function');
    plugin.should.have.property('formTemplate').that.is.an('object');
  });
});
