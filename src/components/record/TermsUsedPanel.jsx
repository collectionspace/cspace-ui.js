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

const getSearchDescriptor = (recordType, vocabulary, csid, updatedTimestamp) => ({
  recordType,
  vocabulary,
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
  vocabulary: PropTypes.string,
};

export default class TermsUsedPanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    const {
      csid,
      recordData,
      recordType,
      vocabulary,
    } = this.props;

    const searchDescriptor =
      getSearchDescriptor(recordType, vocabulary, csid, getUpdatedTimestamp(recordData));

    this.state = {
      searchDescriptor,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      csid,
      recordData,
      recordType,
      vocabulary,
    } = this.props;

    const updatedTimestamp = getUpdatedTimestamp(recordData);

    const {
      csid: nextCsid,
      recordData: nextRecordData,
      recordType: nextRecordType,
      vocabulary: nextVocabulary,
    } = nextProps;

    const nextUpdatedTimestamp = getUpdatedTimestamp(nextRecordData);

    if (
      nextCsid !== csid ||
      nextRecordType !== recordType ||
      nextVocabulary !== vocabulary ||
      nextUpdatedTimestamp !== updatedTimestamp
    ) {
      let newSearchDescriptor;

      if (
        nextCsid === csid &&
        nextRecordType === recordType &&
        nextVocabulary === vocabulary
      ) {
        // Only the updated timestamp changed, so just update the seq id of the search.

        newSearchDescriptor = Object.assign({}, this.state.searchDescriptor, {
          seqID: nextUpdatedTimestamp,
        });
      } else {
        newSearchDescriptor =
          getSearchDescriptor(nextRecordType, nextVocabulary, nextCsid, nextUpdatedTimestamp);
      }

      this.setState({
        searchDescriptor: newSearchDescriptor,
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
      vocabulary,
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
        vocabulary={vocabulary}
        title={<FormattedMessage {...messages.title} />}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

TermsUsedPanel.propTypes = propTypes;
