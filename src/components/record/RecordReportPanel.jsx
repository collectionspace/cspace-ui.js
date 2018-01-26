/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import ReportModal from './ReportModal';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import { getReportViewerPath, VIEWER_WINDOW_NAME } from '../../helpers/reportHelpers';
import { isExistingRecord } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'recordReportPanel.title',
    defaultMessage: 'Reports',
  },
});

const getSearchDescriptor = objectName => Immutable.fromJS({
  recordType: 'report',
  searchQuery: {
    p: 0,
    size: 5,
    doctype: objectName,
  },
});

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

export default class RecordReportPanel extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalCloseButtonClick = this.handleModalCloseButtonClick.bind(this);
    this.handleModalRunButtonClick = this.handleModalRunButtonClick.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    const {
      config,
      recordType,
    } = this.props;

    const objectName = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

    this.state = {
      searchDescriptor: getSearchDescriptor(objectName),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      recordType,
    } = this.props;

    const {
      config,
      recordType: nextRecordType,
    } = nextProps;

    if (nextRecordType !== recordType) {
      const nextObjectName = get(config, ['recordTypes', nextRecordType, 'serviceConfig', 'objectName']);

      this.setState({
        searchDescriptor: getSearchDescriptor(nextObjectName),
      });
    }
  }

  handleItemClick(item) {
    this.setState({
      isModalOpen: true,
      selectedItem: item,
    });
  }

  handleModalCancelButtonClick() {
    this.setState({
      isModalOpen: false,
    });
  }

  handleModalCloseButtonClick() {
    this.setState({
      isModalOpen: false,
    });
  }

  handleModalRunButtonClick() {
    const {
      config,
      csid,
      recordType,
    } = this.props;

    const {
      selectedItem,
    } = this.state;

    const viewerPath = getReportViewerPath(selectedItem, config, recordType, csid);

    window.open(viewerPath, VIEWER_WINDOW_NAME);

    this.setState({
      isModalOpen: false,
    });
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  render() {
    const {
      color,
      config,
      csid,
      perms,
      recordData,
      recordType,
    } = this.props;

    const {
      isModalOpen,
      searchDescriptor,
      selectedItem,
    } = this.state;

    if (!isExistingRecord(recordData)) {
      // Don't render until after the record has loaded.

      return null;
    }

    if (!canList('report', perms)) {
      return null;
    }

    const canRun = canCreate('report', perms);

    return (
      <div>
        <SearchPanelContainer
          collapsed
          color={color}
          config={config}
          csid={csid}
          linkItems={false}
          name="recordReportPanel"
          searchDescriptor={searchDescriptor}
          recordType={recordType}
          showSearchButton={false}
          title={<FormattedMessage {...messages.title} />}
          onItemClick={canRun ? this.handleItemClick : undefined}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
        <ReportModal
          isOpen={isModalOpen}
          reportItem={selectedItem}
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onRunButtonClick={this.handleModalRunButtonClick}
        />
      </div>
    );
  }
}

RecordReportPanel.propTypes = propTypes;
