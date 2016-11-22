import React from 'react';
import Immutable from 'immutable';
import configurePlugin from '../../../../../src/plugins/recordTypes/object';

chai.should();

describe('object record plugin', function suite() {
  const config = {};
  const pluginFactory = configurePlugin(config);

  const pluginContext = {
    Immutable,
    React,
  };

  it('should have the correct shape', function test() {
    const pluginConfigContribution = pluginFactory(pluginContext);

    const {
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('object');

    const objectTypeConfig = recordTypes.object;

    objectTypeConfig.should.have.property('messageDescriptors').that.is.an('object');
    objectTypeConfig.should.have.property('serviceConfig').that.is.an('object');
    objectTypeConfig.should.have.property('title').that.is.a('function');
    objectTypeConfig.should.have.property('forms').that.is.an('object');
  });
});
