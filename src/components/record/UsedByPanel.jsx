import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'usedByPanel.title',
    defaultMessage: 'Used By',
  },
});

const getSearchDescriptor = (recordType, vocabulary, csid, updatedTimestamp) => ({
  recordType,
  vocabulary,
  csid,
  subresource: 'refs',
  searchQuery: {
    p: 0,
    size: 5,
  },
  seqID: updatedTimestamp,
});

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default class UsedByPanel extends Component {
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
      color,
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
        color={color}
        columnSetName="narrow"
        config={config}
        csid={csid}
        listType="refDoc"
        name="usedByPanel"
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        vocabulary={vocabulary}
        title={<FormattedMessage {...messages.title} />}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

UsedByPanel.propTypes = propTypes;
