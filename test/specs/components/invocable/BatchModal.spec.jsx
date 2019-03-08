/* global document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import BatchModal from '../../../../src/components/invocable/BatchModal';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  record: Immutable.Map(),
});

describe('BatchModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    const batchItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <BatchModal
            isOpen
            batchItem={batchItem}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if isOpen is false', function test() {
    const batchItem = Immutable.Map({
      csid: '1234',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <BatchModal
            isOpen={false}
            batchItem={batchItem}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if batchItem is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <BatchModal
            isOpen={false}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });
});
