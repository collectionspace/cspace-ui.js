import React from 'react';
import { components as inputComponents } from 'cspace-input';
import formTemplate from '../../../../../src/plugins/record/object/formTemplate';

chai.should();

const { CompoundInput } = inputComponents;

describe('formTemplate', function suite() {
  it('should be a CompoundInput with defaultChildSubpath prop', function test() {
    const pluginContext = { React };
    const template = formTemplate(pluginContext);

    template.type.should.equal(CompoundInput);
    template.props.should.have.property('defaultChildSubpath').that.is.a('string');
  });
});
