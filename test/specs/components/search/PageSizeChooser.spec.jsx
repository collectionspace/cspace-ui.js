import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Simulate } from 'react-dom/test-utils';
import { Provider as StoreProvider } from 'react-redux';
import createTestContainer from '../../../helpers/createTestContainer';
import PageSizeChooser from '../../../../src/components/search/PageSizeChooser';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: {
    searchResultPagePageSizes: [
      { value: '10' },
      { value: '20' },
      { value: '40' },
    ],
  },
});

describe('PageSizeChooser', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser pageSize={40} />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should show the page size as the input value', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser pageSize={34} />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('input').value.should.equal('34');
  });

  it('should show page size options in the dropdown menu', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser pageSize={34} />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    Simulate.mouseDown(input);

    const items = this.container.querySelectorAll('li');

    items[0].textContent.should.equal('10');
    items[1].textContent.should.equal('20');
    items[2].textContent.should.equal('40');
  });

  it('should call onPageSizeChange when a page size is selected in the menu', function test() {
    let changedToPageSize = null;

    const handlePageSizeChange = (pageSize) => {
      changedToPageSize = pageSize;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser
            pageSize={34}
            onPageSizeChange={handlePageSizeChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    Simulate.mouseDown(input);

    const items = this.container.querySelectorAll('li');

    Simulate.click(items[1]);

    changedToPageSize.should.equal(20);
  });


  it('should call onPageSizeChange when a page size is entered in the input', function test() {
    let changedToPageSize = null;

    const handlePageSizeChange = (pageSize) => {
      changedToPageSize = pageSize;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser
            pageSize={34}
            onPageSizeChange={handlePageSizeChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    input.value = '13';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    changedToPageSize.should.equal(13);

    input.value = '45fsle';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    changedToPageSize.should.equal(45);
  });

  it('should not call onPageSizeChange when an invalid page size is entered in the input', function test() {
    let changedToPageSize = null;

    const handlePageSizeChange = (pageSize) => {
      changedToPageSize = pageSize;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser
            pageSize={34}
            onPageSizeChange={handlePageSizeChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    input.value = 'foo';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    expect(changedToPageSize).to.equal(null);

    input.value = '-12';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    expect(changedToPageSize).to.equal(null);
  });


  it('should not call onPageSizeChange when the current page size is selected', function test() {
    let changedToPageSize = null;

    const handlePageSizeChange = (pageSize) => {
      changedToPageSize = pageSize;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <PageSizeChooser
            pageSize={20}
            onPageSizeChange={handlePageSizeChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    Simulate.mouseDown(input);

    const items = this.container.querySelectorAll('li');

    Simulate.click(items[1]);

    expect(changedToPageSize).to.equal(null);
  });
});
