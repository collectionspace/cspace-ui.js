import React, { Component } from 'react';
import { components as inputComponents } from 'cspace-input';
import MiniViewPopup from './MiniViewPopup';

const { AutocompleteInput } = inputComponents;

export default class MiniViewPopupAutocomplete extends Component {
  constructor() {
    super();
    this.setDomNode = this.setDomNode.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

    this.state = ({
      onHover: false,
    });
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleOnMouseEnter() {
    this.setState({
      onHover: true,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      onHover: false,
    });
  }

  renderMiniViewPopup() {
    const {
      onHover,
    } = this.state;

    const {
      ...allProps
    } = this.props;

  // domNode not available before component mount so how to get this.domNode.offsetWidth? 
  // const popupInlineStyle = { width: '' };
    const popupInlineStyle = { width: this.domNode.offsetWidth };

    if (onHover) { // TODO: ...and autocomplete has value
      return (
        <MiniViewPopup
          popupInlineStyle={popupInlineStyle}
          {...allProps}
        />
      );
    }
    return null;
  }

  render() {
    const {
      ...allProps
    } = this.props;

    return (
      <div
        ref={this.setDomNode}
        onMouseEnter={this.handleOnMouseEnter}
      >
        <AutocompleteInput
          {...allProps}
        />
        {this.renderMiniViewPopup()}
      </div>
    );
  }
}
