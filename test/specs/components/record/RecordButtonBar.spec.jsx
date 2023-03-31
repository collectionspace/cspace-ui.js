import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

import RecordButtonBar from '../../../../src/components/record/RecordButtonBar';

chai.should();

const expectedClassName = 'cspace-ui-ButtonBar--common';

describe('RecordButtonBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <RecordButtonBar />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <RecordButtonBar />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should vary the save button class depending on isModified prop', function test() {
    render(
      <IntlProvider locale="en">
        <RecordButtonBar isModified />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('button[name="save"]').className.should
      .match(/cspace-ui-SaveButton--normal/);

    render(
      <IntlProvider locale="en">
        <RecordButtonBar isModified={false} />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('button[name="save"]').className.should
      .match(/cspace-ui-SaveButton--done/);
  });

  it('should disable the save button when isSavePending is true', function test() {
    render(
      <IntlProvider locale="en">
        <RecordButtonBar isSavePending />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('button[name="save"]').disabled.should.equal(true);
  });

  it('should call onSaveButtonClick when the save button is clicked', function test() {
    let handlerCalled = false;

    const handleClick = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <RecordButtonBar onSaveButtonClick={handleClick} />
      </IntlProvider>, this.container,
    );

    const saveButton = this.container.querySelector('button[name="save"]');

    Simulate.click(saveButton);

    handlerCalled.should.equal(true);
  });

  it('should show the clone button when a csid is provided', function test() {
    render(
      <IntlProvider locale="en">
        <RecordButtonBar csid="1234" />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('button[name="clone"]').should.not.equal(null);
  });
});
