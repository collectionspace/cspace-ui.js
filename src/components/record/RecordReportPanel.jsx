import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import { isExistingRecord } from '../../helpers/recordDataHelpers';
import InvocationModalContainer from '../../containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { RECORD_REPORT_PANEL_SEARCH_NAME } from '../../constants/searchNames';

const messages = defineMessages({
  title: {
    id: 'recordReportPanel.title',
    defaultMessage: 'Reports',
  },
});

const getSearchDescriptor = (config, recordType) => {
  const objectName = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

  let searchParams;

  if (recordType === 'group') {
    searchParams = {
      as: {
        op: 'or',
        value: [
          {
            op: 'eq',
            path: 'ns2:reports_common/supportsGroup',
            value: true,
          },
          {
            op: 'and',
            value: [
              {
                op: 'eq',
                path: 'ns2:reports_common/forDocTypes/forDocType',
                value: objectName,
              },
              {
                op: 'eq',
                path: 'ns2:reports_common/supportsSingleDoc',
                value: true,
              },
            ],
          },
        ],
      },
    };
  } else {
    searchParams = {
      doctype: objectName,
      mode: 'single',
    };
  }

  return Immutable.fromJS({
    recordType: 'report',
    searchQuery: {
      p: 0,
      size: config.defaultSearchPanelSize || 5,
      ...searchParams,
    },
  });
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  isRecordModified: PropTypes.bool,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  openReport: PropTypes.func,
};

const invocationType = 'reportinvocation';

export default class RecordReportPanel extends Component {
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

  handleModalInvokeButtonClick(reportMetadata, invocationDescriptor) {
    const {
      config,
      openReport,
    } = this.props;

    if (openReport) {
      openReport(config, reportMetadata, invocationDescriptor)
        .then(() => {
          this.setState({
            isModalOpen: false,
          });
        })
        .catch(() => {});
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
      isRecordModified,
      perms,
      recordData,
      recordType,
    } = this.props;

    const {
      isModalOpen,
      searchDescriptor,
      selectedItem,
    } = this.state;

    if (!isExistingRecord(recordData)) {
      // Don't render until after the record has loaded.

      return null;
    }

    if (!canList(invocationType, perms)) {
      return null;
    }

    const canRun = canCreate(invocationType, perms);

    let getAllowedModes;

    if (recordType === 'group') {
      // If we're on a group record, limit the modes that can be used to run the report:
      // - group mode is allowed
      // - single mode is only allowed if the report is registered to run on group records

      getAllowedModes = (supportedRecordTypes) => {
        const allowedModes = ['group'];

        if (supportedRecordTypes && supportedRecordTypes.includes(recordType)) {
          allowedModes.push('single');
        }

        return allowedModes;
      };
    }

    return (
      <div>
        <SearchPanelContainer
          collapsed
          color={color}
          config={config}
          linkItems={false}
          name={RECORD_REPORT_PANEL_SEARCH_NAME}
          searchDescriptor={searchDescriptor}
          recordType={recordType}
          showSearchButton={false}
          title={<FormattedMessage {...messages.title} />}
          onItemClick={canRun ? this.handleItemClick : undefined}
          onSearchDescriptorChange={this.handleSearchDescriptorChange}
        />
        <InvocationModalContainer
          allowedModes={getAllowedModes}
          config={config}
          csid={selectedItem && selectedItem.get('csid')}
          initialInvocationDescriptor={Immutable.Map({
            csid,
            recordType,
            mode: (recordType === 'group' ? 'group' : 'single'),
          })}
          modeReadOnly={recordType !== 'group'}
          invocationTargetReadOnly
          isOpen={isModalOpen}
          isRecordModified={isRecordModified}
          recordType="report"
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onInvokeButtonClick={this.handleModalInvokeButtonClick}
        />
      </div>
    );
  }
}

RecordReportPanel.propTypes = propTypes;
