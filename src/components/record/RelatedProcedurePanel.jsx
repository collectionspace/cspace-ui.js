import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'relatedProcedurePanel.title',
    defaultMessage: 'Related Procedures',
  },
});

const getSearchDescriptor = relatedCsid => ({
  recordType: 'procedure',
  searchQuery: {
    rel: relatedCsid,
    p: 0,
    size: 5,
  },
});

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

export default class RelatedProcedurePanel extends Component {
  constructor(props) {
    super(props);

    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(this.props.csid),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.csid !== this.props.csid) {
      this.setState({
        searchDescriptor: getSearchDescriptor(nextProps.csid),
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
