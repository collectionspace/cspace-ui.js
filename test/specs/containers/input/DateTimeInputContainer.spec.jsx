import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { components as inputComponents } from 'cspace-input';
import { IntlAwareDateTimeInput } from '../../../../src/containers/input/DateTimeInputContainer';

chai.should();

const { DateTimeInput } = inputComponents;

describe('DateTimeInputContainer', function suite() {
  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: message => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  it('should set props on DateTimeInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlAwareDateTimeInput
        intl={intl}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DateTimeInput);
    result.props.formatValue.should.be.a('function');
  });

  it('should use intl to format the value', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlAwareDateTimeInput
        intl={intl}
      />);

    const result = shallowRenderer.getRenderOutput();
    const timestamp = '2017-09-21T07:29:44.113Z';

    result.props.formatValue(timestamp).should.equal('formatted dateTimeInputContainer.value');
  });
});
