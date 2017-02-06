import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordHistory from '../../../../src/components/record/RecordHistory';

chai.should();

describe('RecordHistory', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a popover when both updated and created information is supplied', function test() {
    const recordData = Immutable.fromJS({
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
        <RecordHistory recordData={recordData} />
      </IntlProvider>, this.container);

    const popover = this.container.querySelector('.cspace-layout-Popover--common');

    popover.should.not.equal(null);

    const header = popover.querySelector('button');

    Simulate.click(header);

    const items = popover.querySelectorAll('li');

    items[0].textContent.should.equal('Updated Jan 26, 2017 at 12:08 AM by updater@collectionspace.org');
    items[1].textContent.should.equal('Created Jan 23, 2017 at 10:12 PM by creator@collectionspace.org');
  });

  it('should render a span when only created information is supplied', function test() {
    const recordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          createdAt: '2017-01-24T06:12:33.411Z',
          createdBy: 'creator@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory recordData={recordData} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should.equal('Created Jan 23, 2017 at 10:12 PM by creator@collectionspace.org');
  });


  it('should render a span when only updated information is supplied', function test() {
    const recordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
          updatedBy: 'updater@collectionspace.org',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory recordData={recordData} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should.equal('Updated Jan 26, 2017 at 12:08 AM by updater@collectionspace.org');
  });

  it('should omit \'by...\' when no user is supplied', function test() {
    const recordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          createdAt: '2017-01-24T06:12:33.411Z',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordHistory recordData={recordData} />
      </IntlProvider>, this.container);

    const span = this.container.firstElementChild;

    span.textContent.should.equal('Created Jan 23, 2017 at 10:12 PM');
  });
});
