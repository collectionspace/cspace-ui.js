import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import isEqual from 'lodash/isEqual';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import MediaViewerContainer from '../../containers/media/MediaViewerContainer';

const messages = defineMessages({
  titleWithCount: {
    id: 'mediaViewerPanel.titleWithCount',
    defaultMessage: '{title}: {totalItems}',
  },
});

const propTypes = {
  collapsed: PropTypes.bool,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  name: PropTypes.string,
  ownBlobCsid: PropTypes.string,
  recordType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  title: PropTypes.node,
  search: PropTypes.func,
};

const defaultProps = {
  columnSetName: 'default',
  listType: 'common',
};

const contextTypes = {
  router: PropTypes.object,
};

export default class MediaViewerPanel extends Component {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const {
      searchDescriptor: prevSearchDescriptor,
    } = prevProps;

    const {
      searchDescriptor,
    } = this.props;

    if (!isEqual(prevSearchDescriptor, searchDescriptor)) {
      this.search();
    }
  }

  search() {
    const {
      columnSetName,
      config,
      listType,
      name,
      search,
      searchDescriptor,
    } = this.props;

    if (search) {
      search(config, name, searchDescriptor, listType, columnSetName);
    }
  }

  renderHeader() {
    const {
      config,
      listType,
      searchResult,
      title,
    } = this.props;

    const listTypeConfig = config.listTypes[listType];

    const totalItems = searchResult
      ? searchResult.getIn([listTypeConfig.listNodeName, 'totalItems'])
      : null;

    const headerContent = (typeof totalItems !== 'undefined' && totalItems !== null)
      ? <FormattedMessage {...messages.titleWithCount} values={{ title, totalItems }} />
      : title;

    return (
      <h3>{headerContent}</h3>
    );
  }

  render() {
    const {
      collapsed,
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
        collapsible
        collapsed={collapsed}
        config={config}
        header={this.renderHeader()}
        name={name}
        recordType={recordType}
      >
        <MediaViewerContainer
          columnSetName={columnSetName}
          config={config}
          listType={listType}
          ownBlobCsid={ownBlobCsid}
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
MediaViewerPanel.contextTypes = contextTypes;
