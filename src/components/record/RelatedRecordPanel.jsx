import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'relatedRecordPanel.title',
    defaultMessage: 'Related {collectionName}',
  },
});

const getSearchDescriptor = (props) => {
  const {
    csid,
    recordRelationUpdatedTimestamp,
    relatedRecordType,
  } = props;

  return {
    recordType: relatedRecordType,
    searchQuery: {
      rel: csid,
      p: 0,
      size: 5,
    },
    seqID: recordRelationUpdatedTimestamp,
  };
};

const propTypes = {
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  name: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
  // This use isn't detected by eslint.
  /* eslint-disable react/no-unused-prop-types */
  recordRelationUpdatedTimestamp: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default class RelatedRecordPanel extends Component {
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
        searchDescriptor.recordType === nextSearchDescriptor.recordType &&
        searchDescriptor.searchQuery.rel === nextSearchDescriptor.searchQuery.rel
      ) {
        // The record type and related csid didn't change, so carry over the page number, size, and
        // sort from the current search descriptor.

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

  renderTitle() {
    const {
      config,
      relatedRecordType,
    } = this.props;

    const collectionNameMessage =
      get(config, ['recordTypes', relatedRecordType, 'messages', 'record', 'collectionName']);

    const collectionName = <FormattedMessage {...collectionNameMessage} />;

    return <FormattedMessage {...messages.title} values={{ collectionName }} />;
  }

  render() {
    const {
      color,
      columnSetName,
      config,
      csid,
      name,
      recordData,
      recordType,
      onItemClick,
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
        columnSetName={columnSetName}
        config={config}
        csid={csid}
        name={name}
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        title={this.renderTitle()}
        onItemClick={onItemClick}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

RelatedRecordPanel.propTypes = propTypes;
