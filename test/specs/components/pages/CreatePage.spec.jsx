import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordTypesProvider from '../../../../src/components/record/RecordTypesProvider';
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
    const recordTypes = {
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
        <RecordTypesProvider recordTypes={recordTypes}>
          <CreatePage />
        </RecordTypesProvider>
      </IntlProvider>, this.container);

    const links = this.container.querySelectorAll('a');

    links.should.have.lengthOf(3);

    links[0].textContent.should
      .equal(recordTypes.object.messageDescriptors.recordNameTitle.defaultMessage);

    links[1].textContent.should
      .equal(recordTypes.group.messageDescriptors.recordNameTitle.defaultMessage);

    links[2].textContent.should
      .equal(recordTypes.intake.messageDescriptors.recordNameTitle.defaultMessage);
  });
});
