import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import parseAuthoritySpec from '../../helpers/parseAuthoritySpec';
import styles from '../../../styles/cspace-ui/QuickAdd.css';

const propTypes = {
  add: PropTypes.func,
  authority: PropTypes.string,
  displayName: PropTypes.string,
  recordPlugins: PropTypes.object,
};

export default class QuickAdd extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    event.preventDefault();

    const {
      add,
      displayName,
    } = this.props;

    if (add) {
      const {
        authorityname: authorityName,
        vocabularyname: vocabularyName,
      } = event.currentTarget.dataset;

      add(authorityName, vocabularyName, displayName);
    }
  }

  render() {
    const {
      authority,
      displayName,
      recordPlugins,
    } = this.props;

    const authorities = parseAuthoritySpec(authority);

    const buttons = authorities.map((authoritySpec) => {
      const {
        authorityName,
        vocabularyName,
      } = authoritySpec;

      const vocabularyConfig =
        recordPlugins[authorityName].serviceConfig.vocabularies[vocabularyName];

      if (!vocabularyConfig) {
        return null;
      }

      const messages = vocabularyConfig.messageDescriptors;

      return (
        <li key={vocabularyName}>
          <button
            data-authorityname={authorityName}
            data-vocabularyname={vocabularyName}
            onClick={this.handleButtonClick}
          >
            <FormattedMessage {...messages.vocabNameTitle} />
          </button>
        </li>
      );
    });

    return (
      <div className={styles.normal}>
        <div>Add <strong>{displayName}</strong> to</div>
        <ul>
          {buttons}
        </ul>
      </div>
    );
  }
}

QuickAdd.propTypes = propTypes;
