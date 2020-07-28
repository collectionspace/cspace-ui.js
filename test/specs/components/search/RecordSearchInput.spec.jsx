import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordSearchInput from '../../../../src/components/search/RecordSearchInput';

chai.should();

describe('RecordSearchInput', () => {
  const config = {
    recordTypes: {
      collectionobject: {
        name: 'collectionobject',
        columns: {
          default: {
            objectNumber: {
              order: 10,
            },
            title: {
              order: 20,
            },
          },
        },
        serviceConfig: {
          servicePath: 'collectionobjects',
        },
      },
    },
  };

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a ChooserInput', function test() {
    render(
      <RecordSearchInput />, this.container,
    );

    this.container.firstElementChild.className.should.contain('cspace-input-ChooserInput--common');
  });

  it('should call openSearchModal when the choose button is clicked', function test() {
    let openSearchModalCalled = false;

    const openSearchModal = () => {
      openSearchModalCalled = true;
    };

    render(
      <RecordSearchInput
        openSearchModal={openSearchModal}
      />, this.container,
    );

    const chooseButton = this.container.querySelector('button[name="choose"]');

    Simulate.click(chooseButton);

    openSearchModalCalled.should.equal(true);
  });

  it('should render the first column value for a single record', function test() {
    const items = Immutable.fromJS([
      { uri: '/collectionobjects/1000', objectNumber: '1-1000' },
    ]);

    render(
      <IntlProvider locale="en">
        <RecordSearchInput
          config={config}
          value={items}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('1-1000');
  });

  it('should render a count, and the first column values for multiple records', function test() {
    const items = Immutable.fromJS([
      { uri: '/collectionobjects/1000', objectNumber: '1-1000' },
      { uri: '/collectionobjects/1001', objectNumber: '1-1001' },
    ]);

    render(
      <IntlProvider locale="en">
        <RecordSearchInput
          config={config}
          value={items}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('2 records: 1-1000, 1-1001');
  });

  it('should limit the number of records displayed to 10, and show an undisplayed count if there are more records', function test() {
    const items = Immutable.fromJS([
      { uri: '/collectionobjects/1000', objectNumber: '1-1000' },
      { uri: '/collectionobjects/1001', objectNumber: '1-1001' },
      { uri: '/collectionobjects/1002', objectNumber: '1-1002' },
      { uri: '/collectionobjects/1003', objectNumber: '1-1003' },
      { uri: '/collectionobjects/1004', objectNumber: '1-1004' },
      { uri: '/collectionobjects/1005', objectNumber: '1-1005' },
      { uri: '/collectionobjects/1006', objectNumber: '1-1006' },
      { uri: '/collectionobjects/1007', objectNumber: '1-1007' },
      { uri: '/collectionobjects/1008', objectNumber: '1-1008' },
      { uri: '/collectionobjects/1009', objectNumber: '1-1009' },
      { uri: '/collectionobjects/1010', objectNumber: '1-1010' },
      { uri: '/collectionobjects/1011', objectNumber: '1-1011' },
    ]);

    render(
      <IntlProvider locale="en">
        <RecordSearchInput
          config={config}
          value={items}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('12 records: 1-1000, 1-1001, 1-1002, 1-1003, 1-1004, 1-1005, 1-1006, 1-1007, 1-1008, 1-1009, and 2 more');
  });
});
