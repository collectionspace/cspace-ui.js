import React from 'react';
import { CompoundInput } from 'cspace-input';
import formTemplate from '../../../../../src/plugins/record/object/formTemplate';

chai.should();

describe('formTemplate', function suite() {
  it('should be a CompoundInput with defaultChildSubpath prop', function test() {
    const pluginContext = { React };
    const template = formTemplate(pluginContext);

    template.type.should.equal(CompoundInput);
    template.props.should.have.property('defaultChildSubpath').that.is.a('string');
  });
});
