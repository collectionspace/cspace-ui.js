import React from 'react';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import Footer from '../../../../src/components/sections/Footer';

chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: (message) => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  now: () => null,
};

describe('Footer', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a footer', function test() {
    const config = {};

    render(
      <IntlProvider locale="en">
        <Footer config={config} intl={intl} />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('FOOTER');
  });

  it('should render the version number from system info', function test() {
    const systemInfo = Immutable.fromJS({
      'ns2:system_info_common': {
        version: {
          major: '5',
          minor: '1',
          patch: '0',
          build: '5678',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Footer config={{}} intl={intl} systemInfo={systemInfo} />
      </IntlProvider>, this.container,
    );

    const lists = this.container.querySelectorAll('ul');
    const items = lists[1].querySelectorAll('li');

    items[0].textContent.should.equal('Release 5.1.0 (5678)');
  });

  it('should render no version number if it is not present in system info', function test() {
    const systemInfo = Immutable.fromJS({
      'ns2:system_info_common': {},
    });

    render(
      <IntlProvider locale="en">
        <Footer config={{}} intl={intl} systemInfo={systemInfo} />
      </IntlProvider>, this.container,
    );

    const lists = this.container.querySelectorAll('ul');
    const items = lists[1].querySelectorAll('li');

    items[0].textContent.should.equal('');
  });

  it('should render a not connected message if there is an error retrieving system info', function test() {
    const systemInfo = Immutable.fromJS({
      error: {
        name: 'Error',
        message: 'Network Error',
      },
    });

    render(
      <IntlProvider locale="en">
        <Footer config={{}} intl={intl} systemInfo={systemInfo} />
      </IntlProvider>, this.container,
    );

    const lists = this.container.querySelectorAll('ul');
    const items = lists[1].querySelectorAll('li');

    items[0].textContent.should.contain('Not connected');
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
      </IntlProvider>, this.container,
    );

    const lists = this.container.querySelectorAll('ul');
    const items = lists[1].querySelectorAll('li');

    items[2].textContent.should.equal('formatted somePlugin.name version 1.2.3');
  });
});
