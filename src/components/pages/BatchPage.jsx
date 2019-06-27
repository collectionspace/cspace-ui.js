/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import InvocationModal from '../invocable/InvocationModal';
import InvocableSearchBar from '../invocable/InvocableSearchBar';
import { OP_CONTAIN } from '../../constants/searchOperators';
import { serviceUriToLocation } from '../../helpers/uriHelpers';
import InvocationModalContainer from '../../containers/invocable/InvocationModalContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import styles from '../../../styles/cspace-ui/AdminTab.css';

import {
  canRead,
  disallowCreate,
  disallowDelete,
  disallowSoftDelete,
} from '../../helpers/permissionHelpers';

const propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  filterDelay: PropTypes.number,
  openModalName: PropTypes.string,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  invoke: PropTypes.func,
  setToolTab: PropTypes.func,
};

const defaultProps = {
  filterDelay: 500,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'batch';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {
    size: 20,
    sort: 'name',
  },
});

export default class BatchPage extends Component {
  constructor() {
    super();

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalInvokeButtonClick = this.handleModalInvokeButtonClick.bind(this);
    this.handleRunButtonClick = this.handleRunButtonClick.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(),
    };
  }

  componentDidMount() {
    const {
      setToolTab,
    } = this.props;

    if (setToolTab) {
      setToolTab(recordType);
    }
  }

  filter(value) {
    const {
      searchDescriptor,
    } = this.state;

    const searchQuery = searchDescriptor.get('searchQuery');

    let updatedSearchQuery;

    if (value) {
      updatedSearchQuery = searchQuery.set('as', Immutable.fromJS({
        value,
        op: OP_CONTAIN,
        path: 'ns2:batch_common/name',
      }));
    } else {
      updatedSearchQuery = searchQuery.delete('as');
    }

    updatedSearchQuery = updatedSearchQuery.set('p', 0);

    this.setState({
      filterValue: value,
      searchDescriptor: searchDescriptor.set('searchQuery', updatedSearchQuery),
    });
  }

  handleItemClick(item) {
    const {
      history,
      perms,
    } = this.props;

    if (canRead(recordType, perms)) {
      const csid = item.get('csid');

      history.replace(`/tool/${recordType}/${csid}`);
    }

    return false;
  }

  handleModalCancelButtonClick(event) {
    const {
      closeModal,
    } = this.props;

    if (closeModal) {
      event.stopPropagation();

      closeModal();
    }
  }

  handleModalInvokeButtonClick(batchMetadata, invocationDescriptor) {
    // FIXME: Consolidate similar code in RecordBatchPanel and SearchResultBatchPanel.

    const {
      closeModal,
      history,
      invoke,
    } = this.props;

    const {
      config,
    } = this.context;

    if (invoke) {
      const createsNewFocus =
        (batchMetadata.getIn(['document', 'ns2:batch_common', 'createsNewFocus']) === 'true');

      const handleValidationSuccess = () => {
        if (createsNewFocus) {
          // If the batch job is going to direct us to a different record, keep the modal in place
          // until it completes, so the user won't be surprised by a new record opening.

          this.setState({
            isRunning: true,
          });
        } else {
          closeModal();
        }
      };

      this.setState({
        isRunning: true,
      });

      invoke(config, batchMetadata, invocationDescriptor, handleValidationSuccess)
        .then((response) => {
          this.setState({
            isRunning: false,
          });

          if (createsNewFocus) {
            closeModal();

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

  handleRunButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(InvocationModal.modalName);
    }
  }

  handleSearchBarChange(value) {
    if (this.filterTimer) {
      window.clearTimeout(this.filterTimer);

      this.filterTimer = null;
    }

    if (value) {
      const {
        filterDelay,
      } = this.props;

      this.filterTimer = window.setTimeout(() => {
        this.filter(value);
        this.filterTimer = null;
      }, filterDelay);
    } else {
      this.filter(value);
    }
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  renderSearchBar() {
    const {
      filterValue,
    } = this.state;

    return (
      <InvocableSearchBar
        value={filterValue}
        onChange={this.handleSearchBarChange}
      />
    );
  }

  renderInvocationModal() {
    const {
      match,
      openModalName,
    } = this.props;

    const {
      isRunning,
    } = this.state;

    const {
      config,
    } = this.context;

    return (
      <InvocationModalContainer
        config={config}
        csid={match.params.csid}
        initialInvocationDescriptor={Immutable.Map({
          mode: 'nocontext',
        })}
        isOpen={openModalName === InvocationModal.modalName}
        isRunning={isRunning}
        recordType="batch"
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onInvokeButtonClick={this.handleModalInvokeButtonClick}
      />
    );
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      filterValue,
      searchDescriptor,
    } = this.state;

    const {
      history,
      match,
      perms,
    } = this.props;

    const {
      csid,
    } = match.params;

    const normalizedCsid = (csid === 'new') ? '' : csid;
    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    const title = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;

    let recordEditor;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      // Temporarily disallow deleting or creating records.

      let restrictedPerms = perms;

      restrictedPerms = disallowCreate(recordType, restrictedPerms);
      restrictedPerms = disallowDelete(recordType, restrictedPerms);
      restrictedPerms = disallowSoftDelete(recordType, restrictedPerms);

      recordEditor = (
        <RecordEditorContainer
          config={config}
          csid={normalizedCsid}
          recordType={recordType}
          perms={restrictedPerms}
          onRunButtonClick={this.handleRunButtonClick}
        />
      );
    }

    return (
      <div className={styles.common}>
        <SearchPanelContainer
          collapsed={false}
          collapsible={false}
          config={config}
          history={history}
          isFiltered={!!filterValue}
          linkItems={false}
          name="batchPage"
          searchDescriptor={searchDescriptor}
          title={title}
          recordType={recordType}
          showSearchButton={false}
          renderTableHeader={this.renderSearchBar}
          onItemClick={this.handleItemClick}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
        {recordEditor}
        {this.renderInvocationModal()}
      </div>
    );
  }
}

BatchPage.propTypes = propTypes;
BatchPage.defaultProps = defaultProps;
BatchPage.contextTypes = contextTypes;
