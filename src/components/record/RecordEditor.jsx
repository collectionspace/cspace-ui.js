import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import RecordButtonBarContainer from '../../containers/record/RecordButtonBarContainer';
import RecordHistory from '../../components/record/RecordHistory';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

const { Label } = inputComponents;

function getLabel(component, messages) {
  const {
    msgkey,
    name,
  } = component.props;

  const key = msgkey || name;
  const message = messages.field[key];

  if (!message || message.hidden) {
    return null;
  }

  return (
    <Label>
      <FormattedMessage {...message} />
    </Label>
  );
}

function renderTemplate(component, messages, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      if (propTypes.name) {
        if (propTypes.label && typeof component.props.label === 'undefined') {
          overrideProps.label = getLabel(component, messages);
        }
      }

      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName] && !component.props[handlerName]) {
          overrideProps[handlerName] = handlers[handlerName];
        }
      });
    }
  }

  return React.cloneElement(
    component,
    overrideProps,
    React.Children.map(
      component.props.children,
      child => renderTemplate(child, messages, handlers)));
}

const propTypes = {
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
};

const childContextTypes = {
  recordType: PropTypes.string,
  csid: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default class RecordEditor extends Component {
  getChildContext() {
    const {
      csid,
      recordType,
    } = this.props;

    return {
      csid,
      recordType,
    };
  }

  render() {
    const {
      csid,
      data,
      recordType,
      vocabulary,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

    const {
      config,
    } = this.context;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return null;
    }

    const vocabularyConfig = vocabulary
      ? recordTypeConfig.vocabularies[vocabulary]
      : undefined;

    const {
      forms,
      messages,
    } = recordTypeConfig;

    const handlers = {
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    };

    const formTemplate = forms.default;

    const formContent = React.cloneElement(formTemplate, {
      name: DOCUMENT_PROPERTY_NAME,
      value: data.get(DOCUMENT_PROPERTY_NAME),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messages, handlers)),
    });

    return (
      <form
        autoComplete="off"
        className={styles.common}
      >
        <header>
          <RecordButtonBarContainer
            csid={csid}
            recordTypeConfig={recordTypeConfig}
            vocabularyConfig={vocabularyConfig}
          />
          <RecordHistory recordData={data} />
        </header>
        {formContent}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;
RecordEditor.contextTypes = contextTypes;
