import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import RelatedRecordBrowser from '../../../../src/components/record/RelatedRecordBrowser';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  record: Immutable.Map(),
});

describe('RelatedRecordBrowser', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RelatedRecordBrowser />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
