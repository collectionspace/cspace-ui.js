import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import OptionPickerInput from '../../../../src/components/record/OptionPickerInput';

chai.should();

describe('OptionPickerInput', () => {
  const config = {};

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a DropdownMenuInput', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <OptionPickerInput />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-DropdownMenuInput--common').should.not.equal(null);
  });

  it('should call intl.formatMessage to format the status message', function test() {
    const messages = {
      'optionPickerInput.count': 'formatted count',
    };

    render(
      <IntlProvider locale="en" messages={messages}>
        <ConfigProvider config={config}>
          <OptionPickerInput />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input');

    input.value = 'a';

    Simulate.change(input);

    this.container.querySelector('.cspace-layout-Popup--common').textContent.should
      .equal('formatted count');
  });

  it('should call intl.formatMessage to format option labels', function test() {
    const items = [
      {
        value: 'foo',
        message: {
          id: 'label',
          defaultMessage: 'Foo Label',
        },
      },
    ];

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <OptionPickerInput options={items} />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input');

    Simulate.mouseDown(input);

    this.container.querySelectorAll('.cspace-input-MenuItem--common')[1].textContent.should
      .equal('Foo Label');
  });

  it('should call the labelFormatter function to format the option label, if provided', function test() {
    const items = [
      {
        value: 'foo',
        labelFormatter: (intl, option) => `labelFormatter(${option.value})`,
      },
      {
        value: 'bar',
        message: {
          id: 'label',
          defaultMessage: 'Bar Label',
        },
        labelFormatter: (intl, option) => `labelFormatter(${option.value})`,
      },
      {
        value: 'baz',
      },
    ];

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <OptionPickerInput options={items} />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input');

    Simulate.mouseDown(input);

    const menuItems = this.container.querySelectorAll('.cspace-input-MenuItem--common');

    menuItems[1].textContent.should.equal('labelFormatter(foo)');
    menuItems[2].textContent.should.equal('labelFormatter(bar)');
    menuItems[3].textContent.should.equal('baz');
  });
});
