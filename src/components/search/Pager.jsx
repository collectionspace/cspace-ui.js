import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl';
import { baseComponents as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/Pager.css';

const { LineInput, MiniButton } = inputComponents;

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
  windowSize: PropTypes.number,
  onPageSelect: PropTypes.func,
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
  
  handleNextButtonClick(event) {
    const {
      currentPage,
      onPageSelect,
    } = this.props;

    if (onPageSelect) {
      onPageSelect(currentPage + 1);
    }  
  }

  handlePageButtonClick(event) {
    const {
      onPageSelect,
    } = this.props;

    if (onPageSelect) {
      const {
        pagenum: pageNum,
      } = event.currentTarget.dataset;

      onPageSelect(parseInt(pageNum, 10));
    }
  }
  
  handlePrevButtonClick(event) {
    const {
      currentPage,
      onPageSelect,
    } = this.props;

    if (onPageSelect) {
      onPageSelect(currentPage - 1);
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
      }
      else if (currentPage + afterWindowSize > lastPage) {
        const offset = currentPage + afterWindowSize - lastPage;

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

    for (let pageNum = windowStart; pageNum <= windowEnd; pageNum++) {
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
    } = this.props;

    return (
      <nav className={styles.common}>
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
    );
  }
}

Pager.propTypes = propTypes;
Pager.defaultProps = defaultProps;
