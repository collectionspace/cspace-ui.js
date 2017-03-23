import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import isEqual from 'lodash/isEqual';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';

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
  predicate: PropTypes.string,
  findResult: PropTypes.instanceOf(Immutable.Map),
  cloneRecord: PropTypes.func,
  createRelation: PropTypes.func,
  findRelation: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onUnmount: PropTypes.func,
};

export default class RelationEditor extends Component {
  constructor() {
    super();

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
    } = this.props;

    const {
      subject: prevSubject,
      object: prevObject,
      predicate: prevPredicate,
    } = prevProps;

    if (
      !isEqual(subject, prevSubject) ||
      !isEqual(object, prevObject) ||
      predicate !== prevPredicate
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

  initRelation() {
    const {
      config,
      subject,
      object,
      predicate,
      findRelation,
    } = this.props;

    if (findRelation && object.csid) {
      findRelation(config, {
        subject,
        object,
        predicate,
      });
    }
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

      createRelation({ subject, object, predicate })
        .then(() => {
          if (onRecordCreated) {
            onRecordCreated(newRecordCsid);
          }
        });
    }
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

      const count = parseInt(findResult.getIn(['ns3:relations-common-list', 'totalItems']), 10);

      if (isNaN(count) || count < 1) {
        // There is no relation.
        // TODO: Show proper error page.

        return <div>Relation not found</div>;
      }
    }

    return (
      <RecordEditorContainer
        cloneCsid={cloneCsid}
        config={config}
        csid={object.csid}
        recordType={object.recordType}
        relatedSubjectCsid={subject.csid}
        clone={cloneRecord}
        onRecordCreated={this.handleRecordCreated}
      />
    );
  }
}

RelationEditor.propTypes = propTypes;
