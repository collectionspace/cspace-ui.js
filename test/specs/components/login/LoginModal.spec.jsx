/* global document */

import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import LoginModal from '../../../../src/components/login/LoginModal';
import createTestContainer from '../../../helpers/createTestContainer';
import asyncQuerySelector from '../../../helpers/asyncQuerySelector';
import { asyncRender, render } from '../../../helpers/renderHelpers';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  login: Immutable.Map(),
});

describe('LoginModal', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', async function test() {
    await asyncRender(
      <IntlProvider locale="en">
        <Router>
          <StoreProvider store={store}>
            <LoginModal isOpen />
          </StoreProvider>
        </Router>
      </IntlProvider>, this.container,
    );

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');
    modal.should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if isOpen is false', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LoginModal isOpen={false} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });
});
