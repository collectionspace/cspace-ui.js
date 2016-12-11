import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { components as inputComponents } from 'cspace-input';
import { IntlAwareDateInput } from '../../../../src/components/input/IntlizedDateInput';

chai.should();

const { DateInput } = inputComponents;

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: messageDescriptor => `formatted ${messageDescriptor.id}`,
  formatHTMLMessage: () => null,
  locale: 'locale',
  now: () => null,
};

describe('IntlizedDateInput', function suite() {
  it('should set DateInput locale from intl', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlAwareDateInput intl={intl} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DateInput);
    result.props.locale.should.equal(intl.locale);
  });

  it('should set DateInput labels using intl.formatMessage', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlAwareDateInput intl={intl} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DateInput);
    result.props.todayButtonLabel.should.equal('formatted field.date.today');
    result.props.clearButtonLabel.should.equal('formatted field.date.clear');
    result.props.okButtonLabel.should.equal('formatted field.date.ok');
    result.props.cancelButtonLabel.should.equal('formatted field.date.cancel');
  });
});
