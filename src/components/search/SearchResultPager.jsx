import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

const propTypes = {
  searchResult: PropTypes.instanceOf(Immutable.Map),
};

export default class SearchResultPager extends Component {
  render() {
    const {
      searchResult,
    } = this.props;
    
    const {
      pageSize,
      pageNum,
      
    } = searchResult;
    
    return (
      <div>Page</div>
    );
  }
}

SearchResultPager.propTypes = propTypes;
