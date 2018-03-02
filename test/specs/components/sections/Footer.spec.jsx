import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import Footer from '../../../../src/components/sections/Footer';

chai.should();

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

describe('Footer', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a footer', function test() {
    const config = {};

    render(
      <IntlProvider locale="en">
        <Footer config={config} intl={intl} />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FOOTER');
  });

  it('should render plugin info from config', function test() {
    const config = {
      pluginInfo: {
        somePlugin: {
          messages: {
            name: {
              id: 'somePlugin.name',
              defaultMessage: 'Some plugin',
            },
          },
          version: '1.2.3',
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <Footer config={config} intl={intl} />
      </IntlProvider>, this.container);

    const lists = this.container.querySelectorAll('ul');
    const items = lists[1].querySelectorAll('li');

    items[2].textContent.should.equal('formatted somePlugin.name version 1.2.3');
  });
});
