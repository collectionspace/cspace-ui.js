import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchResultBatchPanelContainer from '../../containers/search/SearchResultBatchPanelContainer';
import SearchResultReportPanelContainer from '../../containers/search/SearchResultReportPanelContainer';
import styles from '../../../styles/cspace-ui/SearchResultSidebar.css';

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
  selectedItems: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isOpen: true,
};

export default function SearchResultSidebar(props) {
  const {
    config,
    history,
    recordType,
    isOpen,
    selectedItems,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.common}>
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
