import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'relatedProcedurePanel.title',
    defaultMessage: 'Related Procedures',
  },
});

const getSearchDescriptor = (relatedCsid, updatedTimestamp) => ({
  recordType: 'procedure',
  searchQuery: {
    rel: relatedCsid,
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

export default class RelatedProcedurePanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    const {
      csid,
      recordData,
    } = this.props;

    this.state = {
      searchDescriptor: getSearchDescriptor(csid, getUpdatedTimestamp(recordData)),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      csid,
      recordData,
    } = this.props;

    const updatedTimestamp = getUpdatedTimestamp(recordData);

    const {
      csid: nextCsid,
      recordData: nextRecordData,
    } = nextProps;

    const nextUpdatedTimestamp = getUpdatedTimestamp(nextRecordData);

    if (nextCsid !== csid || nextUpdatedTimestamp !== updatedTimestamp) {
      this.setState({
        searchDescriptor: getSearchDescriptor(nextCsid, nextUpdatedTimestamp),
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
        config={config}
        csid={csid}
        name="relatedProcedurePanel"
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        title={<FormattedMessage {...messages.title} />}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

RelatedProcedurePanel.propTypes = propTypes;
