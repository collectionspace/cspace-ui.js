import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordBrowser from '../../../../src/components/record/RecordBrowser';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  record: Immutable.Map(),
  prefs: Immutable.Map(),
});

const config = {
  recordTypes: {
    collectionobject: {
      forms: {
        default: <div />,
      },
    },
  },
};

describe('RecordBrowser', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser config={config} recordType="collectionobject" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a RecordBrowserNavBar', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser config={config} recordType="collectionobject" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordBrowserNavBar--common').should.not.equal(null);
  });

  it('should render a RecordEditor if a relatedRecordType prop is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordEditor--common').should.not.equal(null);
  });

  it('should render a RelatedRecordBrowser if a relatedRecordType prop is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            recordType="collectionobject"
            relatedRecordType="group"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RelatedRecordBrowser--common').should.not.equal(null);
  });
});
