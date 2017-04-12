import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import RelationButtonBar from './RelationButtonBar';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RelationEditor.css';

const messages = defineMessages({
  editTitle: {
    id: 'relationEditor.editTitle',
    defaultMessage: `{hasRecordTitle, select,
      yes   {Related {recordTypeName}: {recordTitle}}
      other {Related {recordTypeName}}
    }`,
  },
  newTitle: {
    id: 'relationEditor.newTitle',
    defaultMessage: `{hasRecordTitle, select,
      yes   {New Related {recordTypeName}: {recordTitle}}
      other {New Related {recordTypeName}}
    }`,
  },
  notFound: {
    id: 'relationEditor.notFound',
    defaultMessage: 'Not Found',
  },
  noRelation: {
    id: 'relationEditor.noRelation',
    defaultMessage: 'There is no related record with CSID "{csid}" and type "{recordType}".',
  },
});

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.object,
  // TODO: These uses aren't properly detected. Try updating eslint-plugin-react.
  /* eslint-disable react/no-unused-prop-types */
  subject: PropTypes.shape({
    csid: PropTypes.string,
  }),
  object: PropTypes.shape({
    csid: PropTypes.string,
    recordType: PropTypes.string,
  }),
  /* eslint-enable react/no-unused-prop-types */
  objectData: PropTypes.instanceOf(Immutable.Map),
  predicate: PropTypes.string,
  findResult: PropTypes.instanceOf(Immutable.Map),
  cloneRecord: PropTypes.func,
  createRelation: PropTypes.func,
  findRelation: PropTypes.func,
  unrelate: PropTypes.func,
  onClose: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onUnmount: PropTypes.func,
  onUnrelated: PropTypes.func,
};

export default class RelationEditor extends Component {
  constructor() {
    super();

    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleUnrelateButtonClick = this.handleUnrelateButtonClick.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
  }

  componentDidMount() {
    this.initRelation();
  }

  componentDidUpdate(prevProps) {
    const {
      subject,
      object,
      predicate,
      findResult,
    } = this.props;

    const {
      subject: prevSubject,
      object: prevObject,
      predicate: prevPredicate,
      findResult: prevFindResult,
    } = prevProps;

    if (
      !isEqual(subject, prevSubject) ||
      !isEqual(object, prevObject) ||
      predicate !== prevPredicate ||
      (!findResult && prevFindResult)
    ) {
      this.initRelation();
    }
  }

  componentWillUnmount() {
    const {
      onUnmount,
    } = this.props;

    if (onUnmount) {
      onUnmount();
    }
  }

  close() {
    const {
      onClose,
    } = this.props;

    if (onClose) {
      onClose();
    }
  }

  initRelation() {
    const {
      config,
      subject,
      object,
      predicate,
      findRelation,
    } = this.props;

    if (findRelation && object.csid) {
      findRelation(config, subject, object, predicate);
    }
  }

  unrelate() {
    const {
      config,
      subject,
      object,
      predicate,
      unrelate,
      onUnrelated,
    } = this.props;

    if (unrelate) {
      unrelate(config, subject, object, predicate)
        .then(() => {
          if (onUnrelated) {
            onUnrelated(subject, object, predicate);
          }
        });
    }
  }

  handleCancelButtonClick() {
    this.close();
  }

  handleCloseButtonClick() {
    this.close();
  }

  handleUnrelateButtonClick() {
    this.unrelate();
    this.close();
  }

  handleRecordCreated(newRecordCsid) {
    const {
      subject,
      predicate,
      createRelation,
      onRecordCreated,
    } = this.props;

    if (createRelation) {
      const object = {
        csid: newRecordCsid,
      };

      createRelation(subject, object, predicate)
        .then(() => {
          if (onRecordCreated) {
            onRecordCreated(newRecordCsid);
          }
        });
    }
  }

  renderHeader() {
    const {
      config,
      object,
      objectData,
    } = this.props;

    const recordTypeConfig = config.recordTypes[object.recordType];

    if (!recordTypeConfig) {
      return null;
    }

    const cspaceDocument = objectData ? objectData.get(DOCUMENT_PROPERTY_NAME) : undefined;
    const recordTitle = recordTypeConfig.title(cspaceDocument);
    const hasRecordTitle = recordTitle ? 'yes' : 'no';

    const recordTypeName = (
      <FormattedMessage
        {...get(recordTypeConfig, ['messages', 'record', 'name'])}
      />
    );

    const values = {
      recordTypeName,
      hasRecordTitle,
      recordTitle,
    };

    const title = object.csid
      ? <FormattedMessage {...messages.editTitle} values={values} />
      : <FormattedMessage {...messages.newTitle} values={values} />;

    return (
      <header>
        <h3>{title}</h3>
        <RelationButtonBar
          object={object}
          onCancelButtonClick={this.handleCancelButtonClick}
          onCloseButtonClick={this.handleCloseButtonClick}
          onUnrelateButtonClick={this.handleUnrelateButtonClick}
        />
      </header>
    );
  }

  render() {
    const {
      cloneRecord,
      cloneCsid,
      config,
      subject,
      object,
      findResult,
    } = this.props;

    if (object.csid) {
      if (!findResult) {
        return null;
      }

      // FIXME: Services should return a consistent (or no) namespace prefix.

      const list = findResult.get('ns2:relations-common-list') || findResult.get('ns3:relations-common-list');
      const count = parseInt(list.get('totalItems'), 10);

      if (isNaN(count) || count < 1) {
        // There is no relation.

        return (
          <div>
            <h1><FormattedMessage {...messages.notFound} /></h1>
            <p>
              <FormattedMessage
                {...messages.noRelation}
                values={{ csid: object.csid, recordType: object.recordType }}
              />
            </p>
          </div>
        );
      }
    }

    return (
      <div className={styles.common}>
        {this.renderHeader()}
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={object.csid}
          recordType={object.recordType}
          relatedSubjectCsid={subject.csid}
          clone={cloneRecord}
          onRecordCreated={this.handleRecordCreated}
        />
      </div>
    );
  }
}

RelationEditor.propTypes = propTypes;
