import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordPluginProvider from '../../../../src/components/record/RecordPluginProvider';
import CreatePage from '../../../../src/components/pages/CreatePage';

chai.should();

describe('CreatePage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<CreatePage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a link for each record plugin', function test() {
    const recordPlugins = {
      object: {
        messageDescriptors: {
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'object',
          },
        },
      },
      group: {
        messageDescriptors: {
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'group',
          },
        },
      },
      intake: {
        messageDescriptors: {
          recordNameTitle: {
            id: 'recordNameTitle',
            defaultMessage: 'intake',
          },
        },
      },
    };

    render(
      <IntlProvider
        locale="en"
      >
        <RecordPluginProvider recordPlugins={recordPlugins}>
          <CreatePage />
        </RecordPluginProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(3);

    links[0].textContent.should
      .equal(recordPlugins.object.messageDescriptors.recordNameTitle.defaultMessage);

    links[1].textContent.should
      .equal(recordPlugins.group.messageDescriptors.recordNameTitle.defaultMessage);

    links[2].textContent.should
      .equal(recordPlugins.intake.messageDescriptors.recordNameTitle.defaultMessage);
  });
});
