import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import { serviceUriToLocation } from '../../helpers/uriHelpers';
import InvocationModalContainer from '../../containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { SEARCH_RESULT_BATCH_PANEL_SEARCH_NAME } from '../../constants/searchNames';

const messages = defineMessages({
  title: {
    id: 'searchResultBatchPanel.title',
    defaultMessage: 'Data Updates',
  },
});

const getSearchDescriptor = (config, recordType) => {
  const objectName = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

  return Immutable.fromJS({
    recordType: 'batch',
    searchQuery: {
      p: 0,
      size: 5,
      doctype: objectName,
      mode: 'list',
    },
  });
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  perms: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  invoke: PropTypes.func,
};

export default class SearchResultBatchPanel extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalCloseButtonClick = this.handleModalCloseButtonClick.bind(this);
    this.handleModalInvokeButtonClick = this.handleModalInvokeButtonClick.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    const {
      config,
      recordType,
    } = this.props;

    this.state = {
      searchDescriptor: getSearchDescriptor(config, recordType),
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      recordType,
    } = this.props;

    const {
      config,
      recordType: nextRecordType,
    } = nextProps;

    if (nextRecordType !== recordType) {
      this.setState({
        searchDescriptor: getSearchDescriptor(config, nextRecordType),
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

  handleModalInvokeButtonClick(batchMetadata, invocationDescriptor) {
    const {
      config,
      history,
      invoke,
    } = this.props;

    if (invoke) {
      const createsNewFocus = (batchMetadata.getIn(['document', 'ns2:batch_common', 'createsNewFocus']) === 'true');

      const handleValidationSuccess = () => {
        if (createsNewFocus) {
          // If the batch job is going to direct us to a different record, keep the modal in place
          // until it completes, so the user won't be surprised by a new record opening.

          this.setState({
            isRunning: true,
          });
        } else {
          this.setState({
            isModalOpen: false,
          });
        }
      };

      this.setState({
        isRunning: true,
      });

      invoke(config, batchMetadata, invocationDescriptor, handleValidationSuccess)
        .then((response) => {
          this.setState({
            isModalOpen: false,
            isRunning: false,
          });

          if (createsNewFocus) {
            // Open the record indicated by the invocation result.

            const uri = get(response.data, ['ns2:invocationResults', 'primaryURICreated']);
            const location = serviceUriToLocation(config, uri);

            if (location) {
              history.push(location);
            }
          }
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
      perms,
      recordType,
      selectedItems,
    } = this.props;

    const {
      isModalOpen,
      isRunning,
      searchDescriptor,
      selectedItem,
    } = this.state;

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
          linkItems={false}
          name={SEARCH_RESULT_BATCH_PANEL_SEARCH_NAME}
          searchDescriptor={searchDescriptor}
          recordType={recordType}
          showSearchButton={false}
          title={<FormattedMessage {...messages.title} />}
          onItemClick={canRun ? this.handleItemClick : undefined}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
        <InvocationModalContainer
          config={config}
          csid={selectedItem && selectedItem.get('csid')}
          initialInvocationDescriptor={Immutable.Map({
            recordType,
            items: selectedItems,
            mode: 'list',
          })}
          isRunning={isRunning}
          modeReadOnly
          invocationTargetReadOnly
          isOpen={isModalOpen}
          recordType="batch"
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onInvokeButtonClick={this.handleModalInvokeButtonClick}
        />
      </div>
    );
  }
}

SearchResultBatchPanel.propTypes = propTypes;
