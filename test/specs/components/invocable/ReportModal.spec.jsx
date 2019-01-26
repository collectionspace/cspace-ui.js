/* global document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import ReportModal from '../../../../src/components/invocable/ReportModal';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  record: Immutable.Map(),
});

describe('ReportModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    const reportItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ReportModal
            isOpen
            reportItem={reportItem}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if isOpen is false', function test() {
    const reportItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ReportModal
            isOpen={false}
            reportItem={reportItem}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if reportItem is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ReportModal
            isOpen={false}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render an unsaved warning if isRecordModified is true', function test() {
    const reportItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ReportModal
            isOpen
            isRecordModified
            reportItem={reportItem}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const modal = document.querySelector('.ReactModal__Content--after-open');

    modal.querySelector('p').textContent.should.contain('This record has changes that have not been saved');

    unmountComponentAtNode(this.container);
  });
});
