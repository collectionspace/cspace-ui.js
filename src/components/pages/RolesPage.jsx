import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import qs from 'qs';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { canCreate, canRead } from '../../helpers/permissionHelpers';
import RolesButtonBar from '../admin/RolesButtonBar';
import styles from '../../../styles/cspace-ui/AdminTab.css';

const propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

const recordType = 'authrole';

const getSearchDescriptor = () => Immutable.fromJS({
  recordType,
  searchQuery: {},
});

export default class RolesPage extends Component {
  constructor() {
    super();

    this.cloneRecord = this.cloneRecord.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
    this.handleRecordDeleted = this.handleRecordDeleted.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(),
    };
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

  handleCreateButtonClick() {
    const {
      history,
    } = this.props;

    history.replace(`/admin/${recordType}/new`);
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
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  handleItemClick(item) {
    const {
      history,
      perms,
    } = this.props;

    if (canRead(recordType, perms)) {
      const csid = item.get('@csid');

      history.replace(`/admin/${recordType}/${csid}`);
    }

    // Prevent the default action.

    return false;
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

    const title = <FormattedMessage {...recordTypeConfig.messages.record.collectionName} />;

    let recordEditor;

    if (typeof normalizedCsid !== 'undefined' && normalizedCsid !== null) {
      recordEditor = (
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={normalizedCsid}
          recordType="authrole"
          isHardDelete
          onRecordCreated={this.handleRecordCreated}
          onRecordDeleted={this.handleRecordDeleted}
          clone={this.cloneRecord}
        />
      );
    }

    return (
      <div className={styles.common}>
        <div>
          <RolesButtonBar
            isCreatable={canCreate(recordType, perms)}
            onCreateButtonClick={this.handleCreateButtonClick}
          />
          <SearchPanelContainer
            config={config}
            history={history}
            listType="role"
            name="rolesPage"
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

RolesPage.propTypes = propTypes;
RolesPage.contextTypes = contextTypes;
