/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import qs from 'qs';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { canCreate, canRead } from '../../helpers/permissionHelpers';
import AdminTabButtonBar from '../admin/AdminTabButtonBar';
import AccountSearchBar from '../admin/AccountSearchBar';
import styles from '../../../styles/cspace-ui/AdminTab.css';

const propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  filterDelay: PropTypes.number,
  setAdminTab: PropTypes.func,
};

const defaultProps = {
  filterDelay: 500,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'account';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {
    size: 20,
  },
});

export default class AccountPage extends Component {
  constructor() {
    super();

    this.cloneRecord = this.cloneRecord.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
    this.handleRecordDeleted = this.handleRecordDeleted.bind(this);
    this.handleRecordSaved = this.handleRecordSaved.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(),
    };
  }

  componentDidMount() {
    const {
      setAdminTab,
    } = this.props;

    if (setAdminTab) {
      setAdminTab(recordType);
    }
  }

  cloneRecord() {
    const {
      history,
      match,
    } = this.props;

    const {
      csid,
    } = match.params;

    const query = {
      clone: csid,
    };

    const queryString = qs.stringify(query);

    history.replace({
      pathname: `/admin/${recordType}/new`,
      search: `?${queryString}`,
    });
  }

  filter(value) {
    const {
      searchDescriptor,
    } = this.state;

    const searchQuery = searchDescriptor.get('searchQuery');

    let updatedSearchQuery;

    if (value) {
      updatedSearchQuery = searchQuery.set('sn', value);
    } else {
      updatedSearchQuery = searchQuery.delete('sn');
    }

    updatedSearchQuery = updatedSearchQuery.set('p', 0);

    this.setState({
      searchDescriptor: searchDescriptor.set('searchQuery', updatedSearchQuery),
    });
  }

  handleCreateButtonClick() {
    const {
      history,
    } = this.props;

    history.replace(`/admin/${recordType}/new`);
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

  handleItemClick(item) {
    const {
      history,
      perms,
    } = this.props;

    if (canRead(recordType, perms)) {
      const csid = item.get('csid');

      history.replace(`/admin/${recordType}/${csid}`);
    }

    // Prevent the default action.

    return false;
  }

  handleRecordCreated(newRecordCsid, isNavigating) {
    if (!isNavigating) {
      const {
        history,
      } = this.props;

      history.replace(`/admin/${recordType}/${newRecordCsid}`);
    }
  }

  handleRecordDeleted() {
    const {
      history,
    } = this.props;

    history.replace(`/admin/${recordType}`);

    const {
      searchDescriptor,
    } = this.state;

    this.setState({
      searchDescriptor: searchDescriptor.set('seqId', (new Date()).toISOString()),
    });
  }

  handleRecordSaved() {
    const {
      searchDescriptor,
    } = this.state;

    this.setState({
      searchDescriptor: searchDescriptor.set('seqId', (new Date()).toISOString()),
    });
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  renderSearchBar() {
    const {
      searchDescriptor,
    } = this.state;

    const filterValue = searchDescriptor.getIn(['searchQuery', 'sn']);

    return (
      <AccountSearchBar value={filterValue} onChange={this.handleSearchBarChange} />
    );
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      history,
      location,
      match,
      perms,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    const {
      csid,
    } = match.params;

    const query = qs.parse(location.search.substring(1));

    const normalizedCsid = (csid === 'new') ? '' : csid;
    const cloneCsid = query.clone;
    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    const filterValue = searchDescriptor.getIn(['searchQuery', 'sn']);
    const title = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;

    let recordEditor;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      recordEditor = (
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={normalizedCsid}
          recordType={recordType}
          isHardDelete
          onRecordCreated={this.handleRecordCreated}
          onRecordDeleted={this.handleRecordDeleted}
          onRecordSaved={this.handleRecordSaved}
          clone={this.cloneRecord}
        />
      );
    }

    return (
      <div className={styles.common}>
        <div>
          <AdminTabButtonBar
            isCreatable={canCreate(recordType, perms)}
            onCreateButtonClick={this.handleCreateButtonClick}
          />
          <SearchPanelContainer
            config={config}
            history={history}
            isFiltered={!!filterValue}
            linkItems={false}
            listType="account"
            name="accountPage"
            searchDescriptor={searchDescriptor}
            title={title}
            recordType={recordType}
            showSearchButton={false}
            renderTableHeader={this.renderSearchBar}
            onItemClick={this.handleItemClick}
            onSearchDescriptorChange={this.handleSearchDescriptorChange}
          />
        </div>
        {recordEditor}
      </div>
    );
  }
}

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;
AccountPage.contextTypes = contextTypes;
