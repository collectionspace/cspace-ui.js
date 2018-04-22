/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { OP_CONTAIN } from '../../constants/searchOperators';
import VocabularyUsedByPanelContainer from '../../containers/admin/VocabularyUsedByPanelContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { canRead, disallowCreate, disallowDelete, disallowSoftDelete } from '../../helpers/permissionHelpers';
import VocabularySearchBar from '../admin/VocabularySearchBar';
import styles from '../../../styles/cspace-ui/AdminTab.css';

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  filterDelay: PropTypes.number,
  readVocabularyItemRefs: PropTypes.func,
  setAdminTab: PropTypes.func,
};

const defaultProps = {
  filterDelay: 500,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'vocabulary';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {
    size: 20,
  },
});

export default class VocabularyPage extends Component {
  constructor() {
    super();

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleRecordReadComplete = this.handleRecordReadComplete.bind(this);
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

  filter(value) {
    const {
      searchDescriptor,
    } = this.state;

    const searchQuery = searchDescriptor.get('searchQuery');

    let updatedSearchQuery;

    if (value) {
      updatedSearchQuery = searchQuery.set('as', Immutable.Map({
        value,
        op: OP_CONTAIN,
        path: 'ns2:vocabularies_common/displayName',
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

  readItemRefs() {
    const {
      data,
      readVocabularyItemRefs,
    } = this.props;

    if (readVocabularyItemRefs && data) {
      const csid = data.getIn(['document', 'ns2:vocabularies_common', 'csid']);
      const vocabularyName = data.getIn(['document', 'ns2:vocabularies_common', 'shortIdentifier']);

      if (csid && vocabularyName) {
        readVocabularyItemRefs(csid, vocabularyName);
      }
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

  handleRecordReadComplete() {
    this.readItemRefs();
  }

  handleRecordSaved() {
    const {
      searchDescriptor,
    } = this.state;

    this.setState({
      searchDescriptor: searchDescriptor.set('seqId', (new Date()).toISOString()),
    });

    this.readItemRefs();
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
      <VocabularySearchBar value={filterValue} onChange={this.handleSearchBarChange} />
    );
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      history,
      match,
      perms,
    } = this.props;

    const {
      filterValue,
      searchDescriptor,
    } = this.state;

    const {
      csid,
    } = match.params;

    const normalizedCsid = (csid === 'new') ? '' : csid;
    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    const title = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;

    let recordEditor;
    let usedBy;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      // Don't allow creating or deleting.

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
          onRecordReadComplete={this.handleRecordReadComplete}
          onRecordSaved={this.handleRecordSaved}
        />
      );

      if (normalizedCsid) {
        usedBy = (
          <VocabularyUsedByPanelContainer
            config={config}
            csid={normalizedCsid}
          />
        );
      }
    }

    return (
      <div className={styles.common}>
        <div>
          <SearchPanelContainer
            config={config}
            history={history}
            isFiltered={!!filterValue}
            linkItems={false}
            name="vocabularyPage"
            searchDescriptor={searchDescriptor}
            title={title}
            recordType={recordType}
            showSearchButton={false}
            renderTableHeader={this.renderSearchBar}
            onItemClick={this.handleItemClick}
            onSearchDescriptorChange={this.handleSearchDescriptorChange}
          />
        </div>
        <div>
          {recordEditor}
          {usedBy}
        </div>
      </div>
    );
  }
}

VocabularyPage.propTypes = propTypes;
VocabularyPage.defaultProps = defaultProps;
VocabularyPage.contextTypes = contextTypes;
