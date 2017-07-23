import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordHistory from '../../../../src/components/record/RecordHistory';

chai.should();

describe('RecordHistory', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a popover when both updated and created information are supplied', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
          updatedBy: 'updater@collectionspace.org',
          createdAt: '2017-01-24T06:12:33.411Z',
          createdBy: 'creator@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} />
      </IntlProvider>, this.container);

    const popover = this.container.querySelector('.cspace-layout-Popover--common');

    popover.should.not.equal(null);

    const header = popover.querySelector('button');

    Simulate.click(header);

    const items = popover.querySelectorAll('li');

    items[0].textContent.should
      .match(/^Updated Jan \d{2}, 2017 \d\d?:08 (AM|PM) \/ updater@collectionspace.org$/);

    items[1].textContent.should
      .match(/^Created Jan \d{2}, 2017 \d\d?:12 (AM|PM) \/ creator@collectionspace.org$/);
  });

  it('should render a span when only created information is supplied', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          createdAt: '2017-01-24T06:12:33.411Z',
          createdBy: 'creator@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should
      .match(/^Created Jan \d{2}, 2017 \d\d?:12 (AM|PM) \/ creator@collectionspace.org$/);
  });


  it('should render a span when only updated information is supplied', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
          updatedBy: 'updater@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should
      .match(/^Updated Jan \d{2}, 2017 \d\d?:08 (AM|PM) \/ updater@collectionspace.org$/);
  });

  it('should omit \'by...\' when no user is supplied', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          createdAt: '2017-01-24T06:12:33.411Z',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should.match(/^Created Jan \d{2}, 2017 \d\d?:12 (AM|PM)$/);
  });

  it('should include a save pending message when isSavePending is true', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
          updatedBy: 'updater@collectionspace.org',
          createdAt: '2017-01-24T06:12:33.411Z',
          createdBy: 'creator@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} isSavePending />
      </IntlProvider>, this.container);

    const popover = this.container.querySelector('.cspace-layout-Popover--common');

    popover.should.not.equal(null);

    const header = popover.querySelector('button');

    Simulate.click(header);

    const items = popover.querySelectorAll('li');

    items[0].textContent.should.equal('Saving');

    items[1].textContent.should
      .match(/^Updated Jan \d{2}, 2017 \d\d?:08 (AM|PM) \/ updater@collectionspace.org$/);

    items[2].textContent.should
      .match(/^Created Jan \d{2}, 2017 \d\d?:12 (AM|PM) \/ creator@collectionspace.org$/);
  });

  it('should include a record modified message when isModified is true', function test() {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
          updatedBy: 'updater@collectionspace.org',
          createdAt: '2017-01-24T06:12:33.411Z',
          createdBy: 'creator@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory data={data} isModified />
      </IntlProvider>, this.container);

    const popover = this.container.querySelector('.cspace-layout-Popover--common');

    popover.should.not.equal(null);

    const header = popover.querySelector('button');

    Simulate.click(header);

    const items = popover.querySelectorAll('li');

    items[0].textContent.should.equal('Editing');

    items[1].textContent.should
      .match(/^Updated Jan \d{2}, 2017 \d\d?:08 (AM|PM) \/ updater@collectionspace.org$/);

    items[2].textContent.should
      .match(/^Created Jan \d{2}, 2017 \d\d?:12 (AM|PM) \/ creator@collectionspace.org$/);
  });
});
