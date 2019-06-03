import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ModePickerInput from '../../../../src/components/invocable/ModePickerInput';
import OptionPickerInput from '../../../../src/components/record/OptionPickerInput';

chai.should();

describe('ModePickerInput', function suite() {
  it('should render as an OptionPickerInput with an option for each mode', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ModePickerInput modes={['single', 'list']} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(OptionPickerInput);

    const { options } = result.props;

    options.length.should.equal(2);

    options[0].value.should.equal('single');
    options[0].message.defaultMessage.should.equal('single record');

    options[1].value.should.equal('list');
    options[1].message.defaultMessage.should.equal('record list');
  });
});
