/* global window */

import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import Notification from '../../../../src/components/notification/Notification';

const { expect } = chai;

chai.should();

describe('Notification', () => {
  const notificationID = '3';

  const message = {
    id: 'messageId',
    defaultMessage: 'Hello world',
  };

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
        />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call close when the close button is clicked', function test() {
    let closedID = null;

    const close = (id) => {
      closedID = id;
    };

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          close={close}
        />
      </IntlProvider>, this.container,
    );

    const closeButton = this.container.querySelector('button[name=close]');

    Simulate.click(closeButton);

    closedID.should.equal(notificationID);
  });

  it('should call close automatically after the autoCloseTime timeout when autoClose is true', function test() {
    let closedID = null;

    const close = (id) => {
      closedID = id;
    };

    const autoCloseTime = 1000;

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          close={close}
          autoClose
          autoCloseTime={autoCloseTime}
        />
      </IntlProvider>, this.container,
    );

    expect(closedID).to.equal(null);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        closedID.should.equal(notificationID);

        resolve();
      }, autoCloseTime + 100);
    });
  });

  it('should call close automatically after the autoCloseTime timeout when autoClose is changed from false to true', function test() {
    let closedID = null;

    const close = (id) => {
      closedID = id;
    };

    const autoCloseTime = 1000;

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
        />
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          close={close}
          autoClose
          autoCloseTime={autoCloseTime}
        />
      </IntlProvider>, this.container,
    );

    expect(closedID).to.equal(null);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        closedID.should.equal(notificationID);

        resolve();
      }, autoCloseTime + 100);
    });
  });

  it('should cancel auto close when the close button is focused', function test() {
    let closedID = null;

    const close = (id) => {
      closedID = id;
    };

    const autoCloseTime = 1000;

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          close={close}
          autoClose
          autoCloseTime={autoCloseTime}
        />
      </IntlProvider>, this.container,
    );

    const closeButton = this.container.querySelector('button[name=close]');

    Simulate.focus(closeButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(closedID).to.equal(null);

        resolve();
      }, autoCloseTime + 100);
    });
  });

  it('should cancel auto close when the mouse is depressed on the notification', function test() {
    let closedID = null;

    const close = (id) => {
      closedID = id;
    };

    const autoCloseTime = 1000;

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          close={close}
          autoClose
          autoCloseTime={autoCloseTime}
        />
      </IntlProvider>, this.container,
    );

    const notification = this.container.querySelector('div');

    Simulate.mouseDown(notification);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(closedID).to.equal(null);

        resolve();
      }, autoCloseTime + 100);
    });
  });

  it('should render a timestamp if date is provided', function test() {
    const notificationDate = new Date(2000, 1, 1, 13, 45, 59);

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
          message={message}
          date={notificationDate}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('header').textContent.should.equal('1:45:59 PM');
  });

  it('should render children prop as the content if provided', function test() {
    const content = 'This is some notification content';

    render(
      <IntlProvider locale="en">
        <Notification
          id={notificationID}
        >
          {content}
        </Notification>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-Notification--common > div > div').textContent.should
      .equal(content);
  });
});
