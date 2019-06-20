import React from 'react';
import PropTypes from 'prop-types';
import SidebarToggleButton from '../navigation/SidebarToggleButton';

const propTypes = {
  isSearchResultSidebarOpen: PropTypes.bool,
  toggleSearchResultSidebar: PropTypes.func,
};

const defaultProps = {
  isSearchResultSidebarOpen: true,
};

export default function SearchResultSidebarToggleButton(props) {
  const {
    isSearchResultSidebarOpen,
    toggleSearchResultSidebar,
  } = props;

  return (
    <SidebarToggleButton
      isOpen={isSearchResultSidebarOpen}
      toggle={toggleSearchResultSidebar}
    />
  );
}

SearchResultSidebarToggleButton.propTypes = propTypes;
SearchResultSidebarToggleButton.defaultProps = defaultProps;
