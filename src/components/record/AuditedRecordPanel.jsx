import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages } from 'react-intl';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const propTypes = {
  collapsed: PropTypes.bool,
  color: PropTypes.string,
  config: PropTypes.object,
  columnSetName: PropTypes.string,
  csid: PropTypes.string,
  listType: PropTypes.string,
  name: PropTypes.string,
  recordType: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
};

const messages = defineMessages({
  title: {
    id: 'auditedRecordPanel.title',
    defaultMessage: 'Audited Record',
  },
});

export default class AuditedRecordPanel extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderTitle() {
    return (
      <FormattedMessage {...messages.title} />
    );
  }

  render() {
    const {
      collapsed,
      color,
      columnSetName,
      config,
      listType,
      name,
      recordData,
    } = this.props;

    // don't render if recordData isn't loaded
    if (!recordData) {
      return null;
    }

    // get csid and type of the audited record
    const auditedCsid = recordData.getIn(['ns3:audit_common', 'resourceCSID']);
    const auditedType = recordData.getIn(['ns3:audit_common', 'resourceType']);

    console.log(`auditedCsid: ${auditedCsid}`);
    console.log(`auditedType: ${auditedType}`);

    const searchDescriptor = Immutable.fromJS({
      recordType: 'all',
      searchQuery: {
        csid: auditedCsid,
        p: 0,
        size: 0,
      },
    });

    return (
      <SearchPanelContainer
        collapsed={collapsed}
        color={color}
        columnSetName={columnSetName}
        config={config}
        csid={auditedCsid}
        listType={listType}
        name={name}
        recordType={auditedType}
        searchDescriptor={searchDescriptor}
        title={this.renderTitle()}
        showAddButton={false}
        showCheckboxColumn={false}
      />
    );
  }
}

AuditedRecordPanel.propTypes = propTypes;
