import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import RecordButtonBar from './RecordButtonBar';
import RecordHistory from './RecordHistory';
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
  cloneCsid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  onRecordCreated: PropTypes.func,
  save: PropTypes.func,
  revert: PropTypes.func,
  clone: PropTypes.func,
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

export default class RecordEditor extends Component {
  constructor() {
    super();

    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleRevertButtonClick = this.handleRevertButtonClick.bind(this);
    this.handleCloneButtonClick = this.handleCloneButtonClick.bind(this);
  }

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

  componentDidMount() {
    this.initRecord();
  }

  componentDidUpdate(prevProps) {
    const {
      recordType,
      vocabulary,
      csid,
      cloneCsid,
    } = this.props;

    const {
      recordType: prevRecordType,
      vocabulary: prevVocabulary,
      csid: prevCsid,
      cloneCsid: prevCloneCsid,
    } = prevProps;

    if (
      recordType !== prevRecordType ||
      vocabulary !== prevVocabulary ||
      csid !== prevCsid ||
      cloneCsid !== prevCloneCsid
    ) {
      this.initRecord();
    }
  }

  initRecord() {
    const {
      csid,
      cloneCsid,
      createNewRecord,
      readRecord,
    } = this.props;

    if (csid) {
      if (readRecord) {
        readRecord();
      }
    } else if (createNewRecord) {
      createNewRecord(cloneCsid);
    }
  }

  handleCloneButtonClick() {
    const {
      clone,
      csid,
    } = this.props;

    if (clone) {
      clone(csid);
    }
  }

  handleRevertButtonClick() {
    const {
      revert,
    } = this.props;

    if (revert) {
      revert();
    }
  }

  handleSaveButtonClick() {
    const {
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      save(onRecordCreated);
    }
  }

  render() {
    const {
      config,
      csid,
      data,
      isModified,
      isSavePending,
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
          <RecordButtonBar
            csid={csid}
            isModified={isModified}
            isSavePending={isSavePending}
            onSaveButtonClick={this.handleSaveButtonClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
          />
          <RecordHistory
            data={data}
            isModified={isModified}
            isSavePending={isSavePending}
          />
        </header>
        {formContent}
        <footer>
          <RecordButtonBar
            csid={csid}
            isModified={isModified}
            isSavePending={isSavePending}
            onSaveButtonClick={this.handleSaveButtonClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
          />
        </footer>
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;

