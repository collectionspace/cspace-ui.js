/* global document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import LoginModal from '../../../../src/components/login/LoginModal';
import createTestContainer from '../../../helpers/createTestContainer';

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
    await act(async () => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <LoginModal isOpen />
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

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
