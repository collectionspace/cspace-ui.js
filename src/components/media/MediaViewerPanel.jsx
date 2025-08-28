import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import MediaViewerContainer from '../../containers/media/MediaViewerContainer';
import { isCsid } from '../../helpers/csidHelpers';
import styles from '../../../styles/cspace-ui/SearchPanel.css';

const messages = defineMessages({
  titleWithCount: {
    id: 'mediaViewerPanel.titleWithCount',
    defaultMessage: '{title}: {totalItems, number}',
  },
});

const propTypes = {
  collapsed: PropTypes.bool,
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  name: PropTypes.string,
  ownBlobCsid: PropTypes.string,
  recordType: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  title: PropTypes.node,
  search: PropTypes.func,
};

const defaultProps = {
  columnSetName: 'default',
  listType: 'common',
};

export default class MediaViewerPanel extends Component {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const {
      searchDescriptor: prevSearchDescriptor,
      searchResult: prevSearchResult,
    } = prevProps;

    const {
      searchDescriptor,
      searchResult,
    } = this.props;

    if (
      !Immutable.is(prevSearchDescriptor, searchDescriptor)
      // If the search result was cleared from the store, redo the search.
      || (typeof searchResult === 'undefined' && prevSearchResult)
    ) {
      this.search();
    }
  }

  search() {
    const {
      columnSetName,
      config,
      name,
      search,
      searchDescriptor,
    } = this.props;

    if (search) {
      search(config, name, searchDescriptor, columnSetName);
    }
  }

  renderHeader() {
    const {
      config,
      listType,
      ownBlobCsid,
      searchResult,
      title,
    } = this.props;

    const listTypeConfig = config.listTypes[listType];

    const totalItems = searchResult
      ? searchResult.getIn([listTypeConfig.listNodeName, 'totalItems'])
      : null;

    let headerContent;

    if (typeof totalItems !== 'undefined' && totalItems !== null) {
      let count = parseInt(totalItems, 10);

      // ownBlobCsid might be a new record identifier (e.g. '/blob'), if there is no blob. Only
      // increment the count if it's an actual csid.

      if (isCsid(ownBlobCsid)) {
        count += 1;
      }

      headerContent = (
        <FormattedMessage {...messages.titleWithCount} values={{ title, totalItems: count }} />
      );
    } else {
      headerContent = title;
    }

    return (
      <h3>{headerContent}</h3>
    );
  }

  render() {
    const {
      collapsed,
      color,
      columnSetName,
      config,
      listType,
      name,
      ownBlobCsid,
      recordType,
      searchDescriptor,
    } = this.props;

    return (
      <Panel
        className={styles.common}
        collapsible
        collapsed={collapsed}
        color={color}
        config={config}
        header={this.renderHeader()}
        name={name}
        recordType={recordType}
      >
        <MediaViewerContainer
          columnSetName={columnSetName}
          config={config}
          listType={listType}
          ownBlobCsid={isCsid(ownBlobCsid) ? ownBlobCsid : undefined}
          recordType={recordType}
          searchName={name}
          searchDescriptor={searchDescriptor}
        />
      </Panel>
    );
  }
}

MediaViewerPanel.propTypes = propTypes;
MediaViewerPanel.defaultProps = defaultProps;
