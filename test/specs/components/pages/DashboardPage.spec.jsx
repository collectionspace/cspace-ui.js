import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import DashboardPage from '../../../../src/components/pages/DashboardPage';

chai.should();

const config = {};

const context = {
  config,
};

describe('DashboardPage', () => {
  it('should render as a div', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <DashboardPage />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should render a search panel', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <DashboardPage />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, SearchPanelContainer).should.not.equal(null);
  });

  it('should update the search descriptor when it is changed by the search panel', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <DashboardPage />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    const newSearchDescriptor = Immutable.fromJS({
      recordType: 'all',
      searchQuery: {
        as: {
          op: 'gte',
          path: 'ns2:collectionspace_core/updatedAt',
          value: '2018-01-17T20:44:18.705',
        },
        size: 10,
        page: 2,
      },
    });

    searchPanel.props.onSearchDescriptorChange(newSearchDescriptor);

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(newSearchDescriptor);
  });
});
