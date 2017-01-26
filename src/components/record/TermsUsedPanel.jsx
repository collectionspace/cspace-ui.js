import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'termsUsedPanel.title',
    defaultMessage: 'Terms Used',
  },
});

const getSearchDescriptor = (recordType, csid, updatedTimestamp) => ({
  recordType,
  csid,
  subresource: 'terms',
  searchQuery: {
    p: 0,
    size: 5,
  },
  seqID: updatedTimestamp,
});

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

export default class TermsUsedPanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    const {
      csid,
      recordData,
      recordType,
    } = this.props;

    this.state = {
      searchDescriptor: getSearchDescriptor(recordType, csid, getUpdatedTimestamp(recordData)),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      csid,
      recordData,
      recordType,
    } = this.props;

    const updatedTimestamp = getUpdatedTimestamp(recordData);

    const {
      csid: nextCsid,
      recordData: nextRecordData,
      recordType: nextRecordType,
    } = nextProps;

    const nextUpdatedTimestamp = getUpdatedTimestamp(nextRecordData);

    if (
      nextCsid !== csid ||
      nextRecordType !== recordType ||
      nextUpdatedTimestamp !== updatedTimestamp
    ) {
      this.setState({
        searchDescriptor: getSearchDescriptor(nextRecordType, nextCsid, nextUpdatedTimestamp),
      });
    }
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  render() {
    const {
      config,
      csid,
      recordType,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (!searchDescriptor.seqID) {
      // Don't render until after the record has loaded.

      return null;
    }

    return (
      <SearchPanelContainer
        collapsed
        columnSetName="narrow"
        config={config}
        csid={csid}
        listType="authRef"
        name="termsUsedPanel"
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        title={<FormattedMessage {...messages.title} />}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

TermsUsedPanel.propTypes = propTypes;
