import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'termsUsedPanel.title',
    defaultMessage: 'Terms Used',
  },
});

const getSearchDescriptor = (recordType, csid) => ({
  recordType,
  csid,
  subresource: 'terms',
  searchQuery: {
    p: 0,
    size: 5,
  },
});

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

export default class TermsUsedPanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(this.props.recordType, this.props.csid),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      csid,
      recordType,
    } = this.props;

    const {
      csid: nextCsid,
      recordType: nextRecordType,
    } = nextProps;

    if (nextCsid !== csid || nextRecordType !== recordType) {
      this.setState({
        searchDescriptor: getSearchDescriptor(nextProps.recordType, nextProps.csid),
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
