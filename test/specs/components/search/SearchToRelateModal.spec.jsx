/* global document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import SearchToRelateModal from '../../../../src/components/search/SearchToRelateModal';
import createTestContainer from '../../../helpers/createTestContainer';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map(),
  prefs: Immutable.Map(),
  search: Immutable.Map(),
});

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        serviceType: 'object',
      },
    },
  },
};

describe('SearchToRelateModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render a search form', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const modal = document.querySelector('.ReactModal__Content--after-open');

    modal.querySelector('.cspace-ui-SearchForm--common').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  // FIXME: Simulate click on buttons in the Modal doesn't seem to work.

  // it('should render a search result table once a search has been initiated', function test() {
  //   Modal.setAppElement(document.body);
  //
  //   const search = () => {};
  //
  //   let parentNode;
  //
  //   const setParent = (ref) => {
  //     parentNode = ref;
  //   };
  //
  //   const getParent = () => parentNode;
  //
  //   render(
  //     <IntlProvider locale="en">
  //       <StoreProvider store={store}>
  //         <div>
  //           <div ref={setParent} />
  //           <SearchToRelateModal
  //             config={config}
  //             isOpen
  //             isSearchInitiated
  //             recordTypeValue="collectionobject"
  //             search={search}
  //             parentSelector={getParent}
  //           />
  //         </div>
  //       </StoreProvider>
  //     </IntlProvider>, this.container);
  //
  //   const modal = document.querySelector('.ReactModal__Content--after-open');
  //
  //   const button = modal.querySelector('button[name="accept"]');
  //
  //   console.log(button);
  //
  //   Simulate.click(button);
  //
  //   unmountComponentAtNode(this.container);
  // });
});
