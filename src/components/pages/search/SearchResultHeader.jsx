import React from 'react';
import SearchResultSummary from '../../search/SearchResultSummary';

export default function SearchResultHeader({
  config, listType, searchDescriptor, searchError, searchResult,
}) {
  return (
    <header>
      <SearchResultSummary
        config={config}
        listType={listType}
        searchDescriptor={searchDescriptor}
        searchError={searchError}
        searchResult={searchResult}
        // onEditSearchLinkClick={this.handleEditSearchLinkClick}
        // onPageSizeChange={this.handlePageSizeChange}
      />
    </header>
  );
}
