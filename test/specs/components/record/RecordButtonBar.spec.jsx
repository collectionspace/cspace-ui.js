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

  it('should vary the save button class depending on isModified prop', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar isModified />
      </IntlProvider>, this.container);

    this.container.firstElementChild.querySelector('button[name="save"]').className.should
      .match(/cspace-ui-SaveButton--normal/);

    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar isModified={false} />
      </IntlProvider>, this.container);

    this.container.firstElementChild.querySelector('button[name="save"]').className.should
      .match(/cspace-ui-SaveButton--done/);
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

  it('should call save when the save button is clicked', function test() {
    let handlerCalled = false;

    const handleClick = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider
        locale="en"
      >
        <RecordButtonBar save={handleClick} />
      </IntlProvider>, this.container);

    const saveButton = this.container.firstElementChild.querySelector('button[name="save"]');

    Simulate.click(saveButton);

    handlerCalled.should.equal(true);
  });
});
