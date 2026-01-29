import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SearchResultBatchPanelContainer from '../../containers/search/SearchResultBatchPanelContainer';
import SearchResultReportPanelContainer from '../../containers/search/SearchResultReportPanelContainer';
import SearchResultSidebarToggleButtonContainer from '../../containers/search/SearchResultSidebarToggleButtonContainer';
import styles from '../../../styles/cspace-ui/SearchResultSidebar.css';
import sidebarToggleBarStyles from '../../../styles/cspace-ui/SidebarToggleBar.css';
import { getSearchSelectedItems } from '../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';

const panelColor = 'black';

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  recordType: PropTypes.string,
  isOpen: PropTypes.bool,
};

const defaultProps = {
  isOpen: true,
};

function renderSidebarToggle() {
  return (
    <div className={sidebarToggleBarStyles.common}>
      <SearchResultSidebarToggleButtonContainer />
    </div>
  );
}

export default function SearchResultSidebar(props) {
  const {
    config,
    history,
    recordType,
    isOpen,
  } = props;

  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const toggle = renderSidebarToggle();

  if (!isOpen) {
    return (
      <div className={styles.closed}>
        {toggle}
      </div>
    );
  }

  return (
    <div className={styles.common}>
      {toggle}

      <SearchResultReportPanelContainer
        color={panelColor}
        config={config}
        recordType={recordType}
        selectedItems={selectedItems}
      />

      <SearchResultBatchPanelContainer
        color={panelColor}
        config={config}
        history={history}
        recordType={recordType}
        selectedItems={selectedItems}
      />
    </div>
  );
}

SearchResultSidebar.propTypes = propTypes;
SearchResultSidebar.defaultProps = defaultProps;
