/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import InvocableSearchBar from '../invocable/InvocableSearchBar';
import { MODAL_INVOCATION } from '../../constants/modalNames';
import { OP_CONTAIN } from '../../constants/searchOperators';
import InvocationModalContainer from '../../containers/invocable/InvocationModalContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import styles from '../../../styles/cspace-ui/AdminTab.css';

import {
  canCreate,
  canRead,
  disallowCreate,
  disallowDelete,
  disallowSoftDelete,
} from '../../helpers/permissionHelpers';

const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  perms: PropTypes.instanceOf(Immutable.Map),
  filterDelay: PropTypes.number,
  openModalName: PropTypes.string,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  openReport: PropTypes.func,
  setToolTab: PropTypes.func,
};

const defaultProps = {
  filterDelay: 500,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

const recordType = 'report';
const invocationType = 'reportinvocation';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {
    size: 20,
    sort: 'name',
  },
});

export default class ReportPage extends Component {
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

  handleModalInvokeButtonClick(reportMetadata, invocationDescriptor) {
    const {
      openReport,
      closeModal,
    } = this.props;

    const {
      config,
    } = this.context;

    if (openReport) {
      openReport(config, reportMetadata, invocationDescriptor)
        .then(() => {
          if (closeModal) {
            closeModal(MODAL_INVOCATION);
          }
        })
        .catch(() => {});
    }
  }

  handleRunButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(MODAL_INVOCATION);
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
        path: 'ns2:reports_common/name',
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
      config,
    } = this.context;

    return (
      <InvocationModalContainer
        config={config}
        csid={match.params.csid}
        initialInvocationDescriptor={Immutable.Map({
          mode: 'nocontext',
        })}
        isOpen={openModalName === MODAL_INVOCATION}
        recordType="report"
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
      const isRunnable = canCreate(invocationType, perms);

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
          onRunButtonClick={isRunnable ? this.handleRunButtonClick : undefined}
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
          name="reportPage"
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

ReportPage.propTypes = propTypes;
ReportPage.defaultProps = defaultProps;
ReportPage.contextTypes = contextTypes;
