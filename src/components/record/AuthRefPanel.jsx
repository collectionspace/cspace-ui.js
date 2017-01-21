import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';

const messages = defineMessages({
  title: {
    id: 'authRefPanel.title',
    defaultMessage: 'Terms Used',
  },
});

const getSearchDescriptor = (recordType, csid) => ({
  recordType,
  csid,
  path: 'authorityrefs',
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

export default class AuthRefPanel extends Component {
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
      recordType,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    return (
      <SearchPanelContainer
        collapsed
        columnSetName="related"
        config={config}
        name="authRefPanel"
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        title={<FormattedMessage {...messages.title} />}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

AuthRefPanel.propTypes = propTypes;
