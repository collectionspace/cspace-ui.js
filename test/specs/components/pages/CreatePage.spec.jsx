import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import CreatePage from '../../../../src/components/pages/CreatePage';

chai.should();

describe('CreatePage', function suite() {
  const config = {
    recordTypes: {
      object: {
        messages: {
          record: {
            name: {
              id: 'record.object.name',
              defaultMessage: 'object',
            },
          },
        },
        serviceConfig: {
          serviceType: 'object',
        },
      },
      group: {
        messages: {
          record: {
            name: {
              id: 'record.group.name',
              defaultMessage: 'group',
            },
          },
        },
        serviceConfig: {
          serviceType: 'procedure',
        },
      },
      intake: {
        messages: {
          record: {
            name: {
              id: 'record.intake.name',
              defaultMessage: 'intake',
            },
          },
        },
        serviceConfig: {
          serviceType: 'procedure',
        },
      },
    },
  };

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a link for each record plugin', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <Router>
            <CreatePage />
          </Router>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(3);

    links[0].textContent.should
      .equal(config.recordTypes.object.messages.record.name.defaultMessage);

    links[1].textContent.should
      .equal(config.recordTypes.group.messages.record.name.defaultMessage);

    links[2].textContent.should
      .equal(config.recordTypes.intake.messages.record.name.defaultMessage);
  });
});
