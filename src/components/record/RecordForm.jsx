import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import warning from 'warning';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordForm.css';

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

    return React.cloneElement(
      component,
      overrideProps,
      React.Children.map(
        component.props.children,
        child => renderTemplate(child, messages, handlers)));
  }

  return component;
}

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  readOnly: PropTypes.bool,
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
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
};

export default class RecordForm extends Component {
  getChildContext() {
    const {
      config,
      csid,
      recordType,
      vocabulary,
    } = this.props;

    return {
      config,
      csid,
      recordType,
      vocabulary,
    };
  }

  render() {
    const {
      config,
      data,
      formName,
      readOnly,
      recordType,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return null;
    }

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

    let formTemplate;

    if (formName) {
      formTemplate = get(forms, [formName, 'template']);
    }

    if (!formTemplate) {
      // Try to get the configured default form.

      const defaultFormName = recordTypeConfig.defaultForm || 'default';

      if (defaultFormName) {
        formTemplate = get(forms, [defaultFormName, 'template']);
      }

      warning(formTemplate, `No form template found for form name ${formName} or default form name ${defaultFormName} in record type ${recordType}. Check the record type plugin configuration.`);
    }

    if (typeof formTemplate === 'function') {
      const computedFormName = formTemplate(data);

      if (!computedFormName) {
        return null;
      }

      formTemplate = forms[computedFormName].template;

      warning(formTemplate, `No form template found for computed form name ${computedFormName} in record type ${recordType}. Check the record type plugin configuration.`);
    }

    const formContent = React.cloneElement(formTemplate, {
      readOnly,
      name: DOCUMENT_PROPERTY_NAME,
      value: data.get(DOCUMENT_PROPERTY_NAME),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messages, handlers)),
    });

    return (
      <div className={styles.common}>
        {formContent}
      </div>
    );
  }
}

RecordForm.propTypes = propTypes;
RecordForm.defaultProps = defaultProps;
RecordForm.childContextTypes = childContextTypes;
