import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { DropdownMenuInput } from 'cspace-input';
import ControlledInput from '../../../../src/components/input/ControlledInput';

chai.should();

describe('ControlledInput', function suite() {
  it('should render as a DropdownMenuInput', function test() {
    const shallowRenderer = createRenderer();

    const context = {
      intl: {
        formatDate: () => null,
        formatTime: () => null,
        formatRelative: () => null,
        formatNumber: () => null,
        formatPlural: () => null,
        formatMessage: () => null,
        formatHTMLMessage: () => null,
        now: () => null,
      },
    };

    shallowRenderer.render(<ControlledInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DropdownMenuInput);
  });

  it('should set the formatFilterMessage prop', function test() {
    const shallowRenderer = createRenderer();

    let formatMessageCalled = false;

    const intl = {
      formatDate: () => null,
      formatTime: () => null,
      formatRelative: () => null,
      formatNumber: () => null,
      formatPlural: () => null,
      formatMessage: () => {
        formatMessageCalled = true;
      },
      formatHTMLMessage: () => null,
      now: () => null,
    };

    shallowRenderer.render(<ControlledInput intl={intl} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatFilterMessage.should.be.a('function');

    result.props.formatFilterMessage();

    formatMessageCalled.should.equal(true);
  });
});
