import React from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordButtonBar from '../../../../src/components/record/RecordButtonBar';

chai.should();

const expectedClassName = 'cspace-ui-RecordButtonBar--common';

describe('RecordButtonBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar />
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render a saving notification when isSavePending is true', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar isSavePending />
      </IntlProvider>, this.container);

    this.container.firstElementChild.querySelectorAll('span')[1].textContent.should.match(/\w/);
  });

  it('should disable the save button when isSavePending is true', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar isSavePending />
      </IntlProvider>, this.container);

    this.container.firstElementChild.querySelector('button[name="save"]').disabled.should
      .equal(true);
  });

  it('should call onSaveButtonClick when the save button is clicked', function test() {
    let handlerCalled = false;

    const handleClick = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar onSaveButtonClick={handleClick} />
      </IntlProvider>, this.container);

    const saveButton = this.container.firstElementChild.querySelector('button[name="save"]');

    Simulate.click(saveButton);

    handlerCalled.should.equal(true);
  });
});
