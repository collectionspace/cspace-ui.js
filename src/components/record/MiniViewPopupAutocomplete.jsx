import React, { Component } from 'react';
import { components as inputComponents } from 'cspace-input';
import MiniViewPopup from './MiniViewPopup';
import styles from '../../../styles/cspace-ui/MiniViewPopupAutocomplete.css';


const { AutocompleteInput } = inputComponents;

const propTypes = {
  ...AutocompleteInput.propTypes,
};

export default class MiniViewPopupAutocomplete extends Component {
  constructor() {
    super();

    this.setDomNode = this.setDomNode.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

    this.state = {
      hovered: false,
    };
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleOnMouseEnter() {
    this.setState({
      hovered: true,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      hovered: false,
    });
  }

  renderMiniViewPopup() {
    const {
      value,
      ...remainingProps
    } = this.props;

    const popupMiniInlineStyle = { minWidth: this.domNode.offsetWidth };

    if (value) {
      return (
        <MiniViewPopup
          onMouseLeave={this.handleOnMouseLeave}
          popupMiniInlineStyle={popupMiniInlineStyle}
          value={value}
          {...remainingProps}
        />
      );
    }
    return null;
  }

  render() {
    const {
      hovered,
    } = this.state;

    const autocompleteProps = Object.assign({}, this.props);
    delete autocompleteProps.recordType;
    delete autocompleteProps.config;

    let miniViewPopup = null;

    if (hovered) {
      miniViewPopup = this.renderMiniViewPopup();
    }

    return (
      <div
        className={styles.common}
        ref={this.setDomNode}
        onMouseEnter={this.handleOnMouseEnter}
      >
        <AutocompleteInput
          {...autocompleteProps}
        />
        {miniViewPopup}
      </div>
    );
  }
}

MiniViewPopupAutocomplete.propTypes = propTypes;
