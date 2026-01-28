import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import InvocationModalContainer from '../../containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import { SEARCH_RESULT_REPORT_PANEL_SEARCH_NAME } from '../../constants/searchNames';

const messages = defineMessages({
  title: {
    id: 'searchResultReportPanel.title',
    defaultMessage: 'Reports',
  },
});

const getSearchDescriptor = (config, recordType) => {
  const objectName = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

  return Immutable.fromJS({
    recordType: 'report',
    searchQuery: {
      p: 0,
      size: config.defaultSearchPanelSize || 5,
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
  perms: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  openReport: PropTypes.func,
};

export default class SearchResultReportPanel extends Component {
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
      perms,
      recordType,
      selectedItems,
    } = this.props;

    const {
      isModalOpen,
      searchDescriptor,
      selectedItem,
    } = this.state;

    if (!canList('report', perms)) {
      return null;
    }

    const canRun = canCreate('reportinvocation', perms);

    return (
      <div>
        <SearchPanelContainer
          collapsed
          color={color}
          config={config}
          linkItems={false}
          name={SEARCH_RESULT_REPORT_PANEL_SEARCH_NAME}
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
          modeReadOnly
          invocationTargetReadOnly
          isOpen={isModalOpen}
          recordType="report"
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onInvokeButtonClick={this.handleModalInvokeButtonClick}
        />
      </div>
    );
  }
}

SearchResultReportPanel.propTypes = propTypes;
