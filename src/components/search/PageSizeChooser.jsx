import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import ComboBoxInputContainer from '../../containers/input/ComboBoxInputContainer';
import styles from '../../../styles/cspace-ui/PageSizeChooser.css';

const messages = defineMessages({
  pageSize: {
    id: 'pageSizeChooser.pageSize',
    description: 'The current page size displayed above search results.',
    defaultMessage: '{pageSize} per page',
  },
});

const propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func,
};

export default class PageSizeChooser extends Component {
  constructor(props) {
    super(props);

    this.handleCommit = this.handleCommit.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(label) {
    const {
      onPageSizeChange,
    } = this.props;

    if (onPageSizeChange) {
      const value = parseInt(label, 10);

      if (!isNaN(value) && value > 0) {
        onPageSizeChange(value);
      }
    }
  }

  handleCommit(path, value) {
    const {
      pageSize,
      onPageSizeChange,
    } = this.props;

    if (onPageSizeChange) {
      const newPageSize = parseInt(value, 10);

      if (newPageSize !== pageSize) {
        onPageSizeChange(newPageSize);
      }
    }
  }

  render() {
    const {
      pageSize,
    } = this.props;

    const chooser = (
      <ComboBoxInputContainer
        optionListName="searchResultPageSizes"
        value={pageSize.toString()}
        onAddOption={this.handleAddOption}
        onCommit={this.handleCommit}
      />
    );

    return (
      <div className={styles.common}>
        <FormattedMessage
          {...messages.pageSize}
          tagName="div"
          values={{ pageSize: chooser }}
        />
      </div>
    );
  }
}

PageSizeChooser.propTypes = propTypes;
