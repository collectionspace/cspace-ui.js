import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import ControlledInput from '../../../../src/components/input/ControlledInput';
import OptionControlledInput from '../../../../src/components/input/OptionControlledInput';

chai.should();

describe('OptionControlledInput', function suite() {
  it('should render as a ControlledInput', function test() {
    const shallowRenderer = createRenderer();

    const intl = {
      formatDate: () => null,
      formatTime: () => null,
      formatRelative: () => null,
      formatNumber: () => null,
      formatPlural: () => null,
      formatMessage: () => null,
      formatHTMLMessage: () => null,
      now: () => null,
    };

    shallowRenderer.render(<OptionControlledInput intl={intl} options={[]} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ControlledInput);
  });

  it('should label the options and pass them to the base component', function test() {
    const shallowRenderer = createRenderer();

    const options = [
      {
        value: 'cm',
        messageDescriptor: {
          id: 'cm',
          defaultMessage: 'centimeters',
        },
      },
      {
        value: 'in',
        messageDescriptor: {
          id: 'in',
          defaultMessage: 'inches',
        },
      },
      {
        value: 'ft',
      },
    ];

    const intl = {
      formatDate: () => null,
      formatTime: () => null,
      formatRelative: () => null,
      formatNumber: () => null,
      formatPlural: () => null,
      formatMessage: messageDescriptor => `formatted ${messageDescriptor.defaultMessage}`,
      formatHTMLMessage: () => null,
      now: () => null,
    };

    shallowRenderer.render(<OptionControlledInput intl={intl} options={options} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.options.should.deep.equal([
      {
        value: 'cm',
        messageDescriptor: {
          id: 'cm',
          defaultMessage: 'centimeters',
        },
        label: 'formatted centimeters',
      },
      {
        value: 'in',
        messageDescriptor: {
          id: 'in',
          defaultMessage: 'inches',
        },
        label: 'formatted inches',
      },
      {
        value: 'ft',
      },
    ]);
  });
});
