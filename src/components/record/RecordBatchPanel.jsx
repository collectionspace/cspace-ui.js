/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import BatchModal from '../invocable/BatchModal';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import { isExistingRecord } from '../../helpers/recordDataHelpers';
import { serviceUriToLocation } from '../../helpers/uriHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { RECORD_BATCH_PANEL_SEARCH_NAME } from '../../constants/searchNames';

const messages = defineMessages({
  title: {
    id: 'recordBatchPanel.title',
    defaultMessage: 'Batch Jobs',
  },
});

const getSearchDescriptor = objectName => Immutable.fromJS({
  recordType: 'batch',
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
  history: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  run: PropTypes.func,
};

export default class RecordBatchPanel extends Component {
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
      history,
      recordType,
      run,
    } = this.props;

    const {
      selectedItem,
    } = this.state;

    const createsNewFocus = (selectedItem.get('createsNewFocus') === 'true');

    if (run) {
      run(config, selectedItem, {
        csid,
        recordType,
      }).then((response) => {
        if (createsNewFocus) {
          this.setState({
            isModalOpen: false,
            isRunning: false,
          });

          // Open the record indicated by the invocation result.

          const uri = get(response.data, ['ns2:invocationResults', 'primaryURICreated']);
          const location = serviceUriToLocation(config, uri);

          if (location) {
            history.push(location);
          }
        }
      });
    }

    if (createsNewFocus) {
      // If the batch job is going to direct us to a different record, keep the modal in place until
      // it completes, so the user won't be surprised by a new record opening.

      this.setState({
        isRunning: true,
      });
    } else {
      this.setState({
        isModalOpen: false,
      });
    }
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
      isRunning,
      searchDescriptor,
      selectedItem,
    } = this.state;

    if (!isExistingRecord(recordData)) {
      // Don't render until after the record has loaded.

      return null;
    }

    if (!canList('batch', perms)) {
      return null;
    }

    const canRun = canCreate('batch', perms);

    return (
      <div>
        <SearchPanelContainer
          collapsed
          color={color}
          config={config}
          csid={csid}
          linkItems={false}
          name={RECORD_BATCH_PANEL_SEARCH_NAME}
          searchDescriptor={searchDescriptor}
          recordType={recordType}
          showSearchButton={false}
          title={<FormattedMessage {...messages.title} />}
          onItemClick={canRun ? this.handleItemClick : undefined}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
        <BatchModal
          isOpen={isModalOpen}
          isRunning={isRunning}
          batchItem={selectedItem}
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onRunButtonClick={this.handleModalRunButtonClick}
        />
      </div>
    );
  }
}

RecordBatchPanel.propTypes = propTypes;
