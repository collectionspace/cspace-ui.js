import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl';
import { baseComponents as inputComponents } from 'cspace-input';
import PageSizeChooser from './PageSizeChooser';
import styles from '../../../styles/cspace-ui/Pager.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  previousLabel: {
    id: 'pager.previous',
    defaultMessage: '<',
  },
  nextLabel: {
    id: 'pager.next',
    defaultMessage: '>',
  },
  gap: {
    id: 'pager.gap',
    defaultMessage: '...',
  },
});

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptionListName: PropTypes.string,
  windowSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

const defaultProps = {
  windowSize: 5,
};

export default class Pager extends Component {
  constructor() {
    super();

    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
    this.handlePrevButtonClick = this.handlePrevButtonClick.bind(this);
  }

  handleNextButtonClick() {
    const {
      currentPage,
      onPageChange,
    } = this.props;

    if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  }

  handlePageButtonClick(event) {
    const {
      onPageChange,
    } = this.props;

    if (onPageChange) {
      const {
        pagenum: pageNum,
      } = event.currentTarget.dataset;

      onPageChange(parseInt(pageNum, 10));
    }
  }

  handlePrevButtonClick() {
    const {
      currentPage,
      onPageChange,
    } = this.props;

    if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  }

  renderPages() {
    const {
      currentPage,
      lastPage,
      windowSize,
    } = this.props;

    const pageCount = lastPage + 1;

    let windowStart = 0;
    let windowEnd = lastPage;

    if (windowSize < pageCount) {
      let beforeWindowSize = Math.floor((windowSize - 1) / 2);
      let afterWindowSize = windowSize - 1 - beforeWindowSize;

      if (beforeWindowSize > currentPage) {
        const offset = beforeWindowSize - currentPage;

        beforeWindowSize -= offset;
        afterWindowSize += offset;
      } else if (currentPage + afterWindowSize > lastPage) {
        const offset = (currentPage + afterWindowSize) - lastPage;

        beforeWindowSize += offset;
        afterWindowSize -= offset;
      }

      windowStart = currentPage - beforeWindowSize;
      windowEnd = currentPage + afterWindowSize;
    }

    const pages = [];

    if (windowStart > 0) {
      pages.push({
        pageNum: 0,
        label: <FormattedNumber value={1} />,
      });

      const gap = windowStart;

      if (gap > 2) {
        const gapMiddle = windowStart - Math.floor(windowStart / 2);

        pages.push({
          pageNum: gapMiddle,
          label: <FormattedMessage {...messages.gap} />,
        });
      } else if (gap > 1) {
        pages.push({
          pageNum: 1,
          label: <FormattedNumber value={2} />,
        });
      }
    }

    for (let pageNum = windowStart; pageNum <= windowEnd; pageNum += 1) {
      pages.push({
        pageNum,
        label: <FormattedNumber value={pageNum + 1} />,
      });
    }

    if (windowEnd < lastPage) {
      const gap = lastPage - windowEnd;

      if (gap > 2) {
        const gapMiddle = windowEnd + Math.ceil((lastPage - windowEnd) / 2);

        pages.push({
          pageNum: gapMiddle,
          label: <FormattedMessage {...messages.gap} />,
        });
      } else if (gap > 1) {
        pages.push({
          pageNum: lastPage - 1,
          label: <FormattedNumber value={lastPage} />,
        });
      }

      pages.push({
        pageNum: lastPage,
        label: <FormattedNumber value={lastPage + 1} />,
      });
    }

    const items = pages.map(page =>
      <li key={page.pageNum}>
        <MiniButton
          data-pagenum={page.pageNum}
          disabled={page.pageNum === currentPage}
          onClick={this.handlePageButtonClick}
        >
          {page.label}
        </MiniButton>
      </li>
    );

    return (
      <ul>
        {items}
      </ul>
    );
  }

  render() {
    const {
      currentPage,
      lastPage,
      pageSize,
      pageSizeOptionListName,
      onPageSizeChange,
    } = this.props;

    return (
      <div className={styles.common}>
        <PageSizeChooser
          embedded
          pageSize={pageSize}
          pageSizeOptionListName={pageSizeOptionListName}
          onPageSizeChange={onPageSizeChange}
        />
        <nav>
          <MiniButton
            disabled={currentPage === 0}
            onClick={this.handlePrevButtonClick}
          >
            <FormattedMessage {...messages.previousLabel} />
          </MiniButton>
          {this.renderPages()}
          <MiniButton
            disabled={currentPage === lastPage}
            onClick={this.handleNextButtonClick}
          >
            <FormattedMessage {...messages.nextLabel} />
          </MiniButton>
        </nav>
      </div>
    );
  }
}

Pager.propTypes = propTypes;
Pager.defaultProps = defaultProps;
