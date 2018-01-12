import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { canRead, disallowCreate, disallowDelete, disallowSoftDelete } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/AdminTab.css';

const propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  setAdminTab: PropTypes.func,
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

export default class TermsPage extends Component {
  constructor() {
    super();

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

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

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
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
      searchDescriptor,
    } = this.state;

    const {
      csid,
    } = match.params;

    const normalizedCsid = (csid === 'new') ? '' : csid;
    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    const title = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;

    let recordEditor;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      // Don't allow creating or deleting.

      let filteredPerms = perms;

      filteredPerms = disallowCreate(recordType, filteredPerms);
      filteredPerms = disallowDelete(recordType, filteredPerms);
      filteredPerms = disallowSoftDelete(recordType, filteredPerms);

      recordEditor = (
        <RecordEditorContainer
          config={config}
          csid={normalizedCsid}
          recordType={recordType}
          perms={filteredPerms}
        />
      );
    }

    return (
      <div className={styles.common}>
        <div>
          <SearchPanelContainer
            config={config}
            history={history}
            name="termsPage"
            searchDescriptor={searchDescriptor}
            title={title}
            recordType={recordType}
            showSearchButton={false}
            onItemClick={this.handleItemClick}
            onSearchDescriptorChange={this.handleSearchDescriptorChange}
          />
        </div>
        {recordEditor}
      </div>
    );
  }
}

TermsPage.propTypes = propTypes;
TermsPage.contextTypes = contextTypes;
