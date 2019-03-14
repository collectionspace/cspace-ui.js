import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { defineMessages } from 'react-intl';
import get from 'lodash/get';
import { OP_CONTAIN } from '../../constants/searchOperators';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { canCreate, disallowCreate, disallowDelete, disallowSoftDelete } from '../../helpers/permissionHelpers';
import ReportingSearchBar from '../reporting/ReportingSearchBar';
import styles from '../../../styles/cspace-ui/AdminTab.css';
import TitleBar from '../sections/TitleBar';

const messages = defineMessages({
  title: {
    id: 'adminPage.title',
    defaultMessage: 'Reporting',
  },
});

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  filterDelay: PropTypes.number,
};

const defaultProps = {
  filterDelay: 500,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'report';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {
    size: 20,
  },
});

export default class ReportingPage extends Component {
  constructor() {
    super();

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(),
      isModalOpen: false,
    }
  }


  filter(value) {
    // Implement logic where we change what the search bar searches for
    const {
      searchDescriptor,
    } = this.state;

    const searchQuery = searchDescriptor.get('searchQuery');
    
    let updatedSearchQuery;

    if (value) {
      // If the value isn't null, look for those that have this specific value in the field we're looking for...
      updatedSearchQuery = searchQuery.set('as', Immutable.Map({
        value,
        op: OP_CONTAIN,
        path: 'ns2:reports_common/name',
      }));
    } else {
      updatedSearchQuery = searchQuery.delete('as');
    }
    // Start at page 0
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


    // TO DO: Add permission checks
    const csid = item.get('csid');
    history.replace(`/reporting/${recordType}/${csid}`);

    // Change the state of the page so that we can access the item outside of this function
    this.setState({
      currentItem: item,
    });
    return false;
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
      // if there is no filter
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
      <ReportingSearchBar value={filterValue} onChange={this.handleSearchBarChange}/>
    )
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      filterValue,
      searchDescriptor,
      currentItem,
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

    const panelTitle = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;
    const title = <FormattedMessage {...messages.title} />;

    let recordEditor;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      // Don't allow creating or deleting.

      let restrictedPerms = perms;

      // Temporarily disallow deleting or creating records.
      restrictedPerms = disallowCreate(recordType, restrictedPerms);
      restrictedPerms = disallowDelete(recordType, restrictedPerms);
      restrictedPerms = disallowSoftDelete(recordType, restrictedPerms);

      recordEditor = (
        <RecordEditorContainer
          config={config}
          csid={normalizedCsid}
          recordType={recordType}
          perms={restrictedPerms}
          reportItem={currentItem}
        />
      );
    }
    return (
      <div>
        <TitleBar title={title} updateDocumentTitle/>
        <div className={styles.common}>
        <div>
          <SearchPanelContainer
            config={config}
            history={history}
            isFiltered={!!filterValue}
            linkItems={false}
            name="ReportingPage"
            searchDescriptor={searchDescriptor}
            title={panelTitle}
            recordType={recordType}
            showSearchButton={false}
            renderTableHeader={this.renderSearchBar}
            onItemClick={this.handleItemClick}
            onSearchDescriptorChange={this.handleSearchDescriptorChange}          
          />
        </div>
        <div>
          {recordEditor}
        </div>
      </div>
      </div>
    );
  }
}

ReportingPage.propTypes = propTypes;
ReportingPage.defaultProps = defaultProps;
ReportingPage.contextTypes = contextTypes;
