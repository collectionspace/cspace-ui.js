import { components as inputComponents } from 'cspace-input';
import formTemplate from '../../../../../../src/plugins/recordTypes/object/forms/default';
import createPluginContext from '../../../../../../src/helpers/createPluginContext';

chai.should();

const { CompoundInput } = inputComponents;

describe('object record default form', function suite() {
  it('should be a CompoundInput with defaultChildSubpath prop', function test() {
    const pluginContext = createPluginContext();
    const template = formTemplate(pluginContext);

    template.type.should.equal(CompoundInput);
    template.props.should.have.property('defaultChildSubpath').that.is.a('string');
  });
});
