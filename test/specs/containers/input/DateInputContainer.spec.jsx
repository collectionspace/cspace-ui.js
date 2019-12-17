import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { components as inputComponents } from 'cspace-input';
import { IntlAwareDateInput } from '../../../../src/containers/input/DateInputContainer';

chai.should();

const { DateInput } = inputComponents;

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: (message) => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  locale: 'locale',
  now: () => null,
};

describe('DateInputContainer', () => {
  it('should set DateInput locale from intl', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlAwareDateInput intl={intl} />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DateInput);
    result.props.locale.should.equal(intl.locale);
  });
});
