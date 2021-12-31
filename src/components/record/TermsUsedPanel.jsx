import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const getSearchDescriptor = (props) => {
  const {
    config,
    recordType,
    vocabulary,
    csid,
    recordData,
  } = props;

  return Immutable.fromJS({
    recordType,
    vocabulary,
    csid,
    subresource: 'terms',
    searchQuery: {
      p: 0,
      size: config.defaultSearchPanelSize || 5,
    },
    seqID: getUpdatedTimestamp(recordData),
  });
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
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
    const { searchDescriptor } = this.state;

    let nextSearchDescriptor = getSearchDescriptor(nextProps);

    if (!Immutable.is(searchDescriptor, nextSearchDescriptor)) {
      if (
        searchDescriptor.get('csid') === nextSearchDescriptor.get('csid')
        && searchDescriptor.get('recordType') === nextSearchDescriptor.get('recordType')
        && searchDescriptor.get('vocabulary') === nextSearchDescriptor.get('vocabulary')
      ) {
        // The record type, vocabulary, and csid didn't change, so carry over the page number, size,
        // and sort from the current search descriptor.

        const searchQuery = searchDescriptor.get('searchQuery');

        const nextSearchQuery = nextSearchDescriptor.get('searchQuery')
          .set('p', searchQuery.get('p'))
          .set('size', searchQuery.get('size'))
          .set('sort', searchQuery.get('sort'));

        nextSearchDescriptor = nextSearchDescriptor.set('searchQuery', nextSearchQuery);
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
