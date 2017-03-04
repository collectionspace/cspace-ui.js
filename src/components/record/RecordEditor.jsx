import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import RecordButtonBarContainer from '../../containers/record/RecordButtonBarContainer';
import RecordHistory from '../../components/record/RecordHistory';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

function renderTemplate(component, messages, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
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
  config: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
};

const childContextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  csid: PropTypes.string,
};

export default class RecordEditor extends Component {
  getChildContext() {
    const {
      config,
      csid,
      recordType,
    } = this.props;

    return {
      config,
      csid,
      recordType,
    };
  }

  render() {
    const {
      config,
      csid,
      data,
      isModified,
      isSavePending,
      recordType,
      vocabulary,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

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
            isModified={isModified}
            isSavePending={isSavePending}
            recordTypeConfig={recordTypeConfig}
            vocabularyConfig={vocabularyConfig}
          />
          <RecordHistory
            data={data}
            isModified={isModified}
            isSavePending={isSavePending}
          />
        </header>
        {formContent}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;
