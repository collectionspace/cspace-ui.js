import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import * as axe from 'axe-core';

import createTestContainer from '../../../../helpers/createTestContainer';
import { render } from '../../../../helpers/renderHelpers';
import throwAxeViolationsError from '../../../../helpers/utils';

import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import SearchResultTableRow from '../../../../../src/components/search/table/SearchResultTableRow';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  search: Immutable.Map(),
});

const config = {
  listTypes: {
    common: {
      getItemLocationPath: (item) => `/record/collectionobject/${item.get('csid')}`,
    },
  },
};

const columns = [
  {
    dataKey: 'objectNumber',
    linkable: true,
    formatValue: (data) => data,
  },
  {
    dataKey: 'title',
    formatValue: (data) => data,
  },
];

const searchDescriptor = Immutable.fromJS({
  recordType: 'collectionobject',
});

const item = Immutable.Map({
  csid: 'ea399d7a-7ea3-4670-930b',
  objectNumber: '2024.1',
  title: 'Title',
});

const renderRow = (container, selectedItems) => render(
  <IntlProvider locale="en">
    <StoreProvider store={store}>
      <ConfigProvider config={config}>
        <Router>
          <table>
            <tbody>
              <SearchResultTableRow
                item={item}
                index={0}
                totalItems={5}
                renderContext={{
                  listType: 'common',
                  searchDescriptor,
                  columns,
                  selectedItems,
                }}
              />
            </tbody>
          </table>
        </Router>
      </ConfigProvider>
    </StoreProvider>
  </IntlProvider>, container,
);

describe('SearchResultTableRow', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a row labeled with its position and primary column value', function test() {
    renderRow(this.container);

    const row = this.container.querySelector('tr');

    row.getAttribute('aria-label').should.equal('Row 1 of 5 - 2024.1');
  });

  it('should set aria-selected to false when the item is not selected', function test() {
    renderRow(this.container, Immutable.Map({
      'some-other-csid': Immutable.Map(),
    }));

    this.container.querySelector('tr').getAttribute('aria-selected').should.equal('false');
  });

  it('should set aria-selected to false when there are no selected items', function test() {
    renderRow(this.container);

    this.container.querySelector('tr').getAttribute('aria-selected').should.equal('false');
  });

  it('should set aria-selected to true when the item is selected', async function test() {
    renderRow(this.container, Immutable.Map({
      'ea399d7a-7ea3-4670-930b': Immutable.Map(),
    }));

    const row = this.container.querySelector('tr');

    row.getAttribute('aria-selected').should.equal('true');

    const checkbox = row.querySelector('input[type="checkbox"]');

    expect(checkbox).not.to.equal(null);
    checkbox.checked.should.equal(true);

    const results = await axe.run(this.container);

    if (results.violations.length > 0) {
      throwAxeViolationsError(results.violations);
    }

    results.violations.length.should.equal(0);
  });
});
