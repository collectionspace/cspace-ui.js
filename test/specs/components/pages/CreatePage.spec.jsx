import React from 'react';
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
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'object',
          },
        },
      },
      group: {
        messages: {
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'group',
          },
        },
      },
      intake: {
        messages: {
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'intake',
          },
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
          <CreatePage />
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a link for each record plugin', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <ConfigProvider config={config}>
          <CreatePage />
        </ConfigProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(3);

    links[0].textContent.should
      .equal(config.recordTypes.object.messages.recordNameTitle.defaultMessage);

    links[1].textContent.should
      .equal(config.recordTypes.group.messages.recordNameTitle.defaultMessage);

    links[2].textContent.should
      .equal(config.recordTypes.intake.messages.recordNameTitle.defaultMessage);
  });
});
