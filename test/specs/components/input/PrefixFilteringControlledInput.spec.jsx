import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import PrefixFilteringControlledInput from '../../../../src/components/input/PrefixFilteringControlledInput';

chai.should();

describe('PrefixFilteringControlledInput', function suite() {
  it('should render as a PrefixFilteringDropdownMenuInput', function test() {
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

    shallowRenderer.render(<PrefixFilteringControlledInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.displayName.should.contain('PrefixFilteringDropdownMenuInput');
  });

  it('should set the formatStatusMessage prop', function test() {
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

    shallowRenderer.render(<PrefixFilteringControlledInput intl={intl} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatStatusMessage.should.be.a('function');

    result.props.formatStatusMessage();

    formatMessageCalled.should.equal(true);
  });
});
