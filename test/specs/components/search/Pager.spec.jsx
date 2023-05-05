import React from 'react';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Simulate } from 'react-dom/test-utils';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import Pager from '../../../../src/components/search/Pager';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map({
    searchResultPagePageSizes: [
      { value: '10' },
      { value: '20' },
      { value: '40' },
    ],
  }),
});

const getPages = (container) => {
  const items = container.querySelectorAll('nav li');
  const pages = [];

  for (let i = 0; i < items.length; i += 1) {
    pages.push(items[i].textContent);
  }

  return pages;
};

describe('Pager', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={0} lastPage={9} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should show a window of pages around the current page', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={10} lastPage={19} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '9', '10', '11', '12', '13', '...', '20']);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={10} lastPage={19} windowSize={3} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '10', '11', '12', '...', '20']);
  });

  it('should offset the window when it overflows the beginning or end of the page range', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={0} lastPage={19} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '2', '3', '4', '5', '...', '20']);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={3} lastPage={19} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '2', '3', '4', '5', '6', '...', '20']);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={19} lastPage={19} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '16', '17', '18', '19', '20']);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={16} lastPage={19} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '15', '16', '17', '18', '19', '20']);
  });

  it('should always show the first and last pages', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={10} lastPage={47} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '9', '10', '11', '12', '13', '...', '48']);
  });

  it('should show an ellipsis between the first page and the beginning of the window', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={33} lastPage={99} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '32', '33', '34', '35', '36', '...', '100']);
  });

  it('should show an ellipsis between the last page and the end of the window', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={8} lastPage={24} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '7', '8', '9', '10', '11', '...', '25']);
  });

  it('should show the page number instead of an ellipsis when the gap between the first page and the beginning of the window is only one page', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={4} lastPage={24} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '2', '3', '4', '5', '6', '7', '...', '25']);
  });

  it('should show the page number instead of an ellipsis when the gap between the last page and the end of the window is only one page', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager currentPage={20} lastPage={24} windowSize={5} pageSize={10} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '19', '20', '21', '22', '23', '24', '25']);
  });

  it('should call onPageChange when a page button is clicked', function test() {
    let changeToPageNum = null;

    const handlePageChange = (pageNum) => {
      changeToPageNum = pageNum;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager
            currentPage={10}
            lastPage={19}
            windowSize={5}
            pageSize={10}
            onPageChange={handlePageChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '9', '10', '11', '12', '13', '...', '20']);

    const items = this.container.querySelectorAll('li');
    const button = items[6].querySelector('button');

    Simulate.click(button);

    changeToPageNum.should.equal(12);
  });

  it('should call onPageChange when the previous page button is clicked', function test() {
    let changeToPageNum = null;

    const handlePageChange = (pageNum) => {
      changeToPageNum = pageNum;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager
            currentPage={10}
            lastPage={19}
            windowSize={5}
            pageSize={10}
            onPageChange={handlePageChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '9', '10', '11', '12', '13', '...', '20']);

    const buttons = this.container.querySelectorAll('nav > button');

    Simulate.click(buttons[0]);

    changeToPageNum.should.equal(9);
  });

  it('should call onPageChange when the next page button is clicked', function test() {
    let changeToPageNum = null;

    const handlePageChange = (pageNum) => {
      changeToPageNum = pageNum;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Pager
            currentPage={10}
            lastPage={19}
            windowSize={5}
            pageSize={10}
            onPageChange={handlePageChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    getPages(this.container).should
      .deep.equal(['1', '...', '9', '10', '11', '12', '13', '...', '20']);

    const buttons = this.container.querySelectorAll('nav > button');

    Simulate.click(buttons[1]);

    changeToPageNum.should.equal(11);
  });
});
