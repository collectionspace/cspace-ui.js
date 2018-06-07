import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import TitleBar from '../sections/TitleBar';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { OP_GTE } from '../../constants/searchOperators';
import styles from '../../../styles/cspace-ui/DashboardPage.css';

const messages = defineMessages({
  title: {
    id: 'dashboardPage.title',
    description: 'Title of the dashboard page.',
    defaultMessage: 'My CollectionSpace',
  },
  recentPanelTitle: {
    id: 'dashboardPage.recentPanelTitle',
    description: 'Title of the recent records panel on the dashboard page.',
    defaultMessage: 'Records Updated in Last 7 Days',
  },
});

const propTypes = {
  history: PropTypes.object,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'all';

const getSearchDescriptor = () => {
  const range = 7 * 24 * 60 * 60 * 1000; // 7 days
  const afterDate = new Date(Date.now() - range);

  return Immutable.fromJS({
    recordType,
    searchQuery: {
      as: {
        op: OP_GTE,
        path: 'ns2:collectionspace_core/updatedAt',
        value: afterDate.toISOString(),
      },
      size: 20,
    },
  });
};

export default class DashboardPage extends Component {
  constructor() {
    super();

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(),
    };
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      history,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    const title = <FormattedMessage {...messages.title} />;
    const recentPanelTitle = <FormattedMessage {...messages.recentPanelTitle} />;

    return (
      <div className={styles.common}>
        <TitleBar title={title} updateDocumentTitle />

        <SearchPanelContainer
          config={config}
          history={history}
          name="dashboardRecentPanel"
          searchDescriptor={searchDescriptor}
          title={recentPanelTitle}
          recordType={recordType}
          showSearchButton={false}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
      </div>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.contextTypes = contextTypes;
