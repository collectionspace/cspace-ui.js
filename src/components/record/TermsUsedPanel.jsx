import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import isEqual from 'lodash/isEqual';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'termsUsedPanel.title',
    defaultMessage: 'Terms Used',
  },
});

const getSearchDescriptor = (props) => {
  const {
    recordType,
    vocabulary,
    csid,
    recordData,
  } = props;

  return {
    recordType,
    vocabulary,
    csid,
    subresource: 'terms',
    searchQuery: {
      p: 0,
      size: 5,
    },
    seqID: getUpdatedTimestamp(recordData),
  };
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  history: PropTypes.object,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default class TermsUsedPanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const searchDescriptor = getSearchDescriptor(this.props);
    const nextSearchDescriptor = getSearchDescriptor(nextProps);

    if (!isEqual(searchDescriptor, nextSearchDescriptor)) {
      if (
        searchDescriptor.csid === nextSearchDescriptor.csid &&
        searchDescriptor.recordType === nextSearchDescriptor.recordType &&
        searchDescriptor.vocabulary === nextSearchDescriptor.vocabulary
      ) {
        // The record type, vocabulary, and csid didn't change, so carry over the page number, size,
        // and sort from the current search descriptor.

        const {
          p,
          size,
          sort,
        } = this.state.searchDescriptor.searchQuery;

        nextSearchDescriptor.searchQuery.p = p;
        nextSearchDescriptor.searchQuery.size = size;
        nextSearchDescriptor.searchQuery.sort = sort;
      }

      this.setState({
        searchDescriptor: nextSearchDescriptor,
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
      history,
      recordType,
      vocabulary,
      recordData,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (!getUpdatedTimestamp(recordData)) {
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
        history={history}
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
