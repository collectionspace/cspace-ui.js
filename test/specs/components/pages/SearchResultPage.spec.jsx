import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import SearchResultPage from '../../../../src/components/pages/SearchResultPage';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  search: Immutable.Map(),
});

const config = {
  recordTypes: {
    object: {
      messageDescriptors: {
        resultsTitle: {
          id: 'record.object.resultsTitle',
          defaultMessage: 'Objects',
        },
      },
    },
  },
};

const params = {
  recordType: 'object',
};

const location = {
  query: {},
};

describe('SearchResultPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchResultPage location={location} params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
