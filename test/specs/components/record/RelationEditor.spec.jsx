/* global window */

import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import RelationEditor from '../../../../src/components/record/RelationEditor';
import RelationButtonBar from '../../../../src/components/record/RelationButtonBar';

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {
    group: {
      messages: {
        record: {
          name: {
            id: 'record.group.name',
            defaultMessage: 'Group',
          },
        },
      },
      title: () => 'Title',
    },
  },
};

describe('RelationEditor', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a record editor if the relation is found', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
      />);

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    recordEditorContainer.should.not.equal(null);

    recordEditorContainer.props.csid.should.equal(object.csid);
    recordEditorContainer.props.recordType.should.equal(object.recordType);
    recordEditorContainer.props.relatedSubjectCsid.should.equal(subject.csid);
  });

  it('should render nothing if there is no relation find result', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render an error message div if the relation find result contains no items', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '0',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should render an error message div if an object error is provided', function test() {
    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    const error = Immutable.Map({
      code: 'ERROR_CODE',
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        object={object}
        objectError={error}
        findResult={findResult}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should call createRelation followed by onRecordCreated when a record is created', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      recordType: 'group',
    };

    const predicate = 'affects';

    let createRelationSubject = null;
    let createRelationObject = null;
    let createRelationPredicate = null;

    const createRelation = (subjectArg, objectArg, predicateArg) => {
      createRelationSubject = subjectArg;
      createRelationObject = objectArg;
      createRelationPredicate = predicateArg;

      return Promise.resolve();
    };

    let createdCsid = null;
    let createdIsNavigating = null;

    const handleRecordCreated = (csidArg, isNavigatingArg) => {
      createdCsid = csidArg;
      createdIsNavigating = isNavigatingArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        createRelation={createRelation}
        onRecordCreated={handleRecordCreated}
      />);

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    const newRecordCsid = '5678';
    const isNavigating = true;

    recordEditorContainer.props.onRecordCreated(newRecordCsid, isNavigating);

    createRelationSubject.should.equal(subject);
    createRelationObject.should.deep.equal({ csid: newRecordCsid });
    createRelationPredicate.should.equal(predicate);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        createdCsid.should.equal(newRecordCsid);
        createdIsNavigating.should.equal(isNavigating);

        resolve();
      }, 0);
    });
  });

  it('should return null when a record create is attempted but no createRelation prop is supplied', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      recordType: 'group',
    };

    const predicate = 'affects';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
      />);

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    const newRecordCsid = '5678';
    const isNavigating = true;

    expect(recordEditorContainer.props.onRecordCreated(newRecordCsid, isNavigating)).to
      .equal(null);
  });

  it('should call onRecordTransitioned when a record is transitioned', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let transitionedTransitionName = null;

    const handleRecordTransitioned = (transitionNameArg) => {
      transitionedTransitionName = transitionNameArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
        onRecordTransitioned={handleRecordTransitioned}
      />);

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    const transitionName = 'transitionName';

    recordEditorContainer.props.onRecordTransitioned(transitionName);

    transitionedTransitionName.should.equal(transitionName);
  });

  it('should call onClose when a record is transitioned with transition name \'delete\'', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let handlerCalled = false;

    const close = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
        onClose={close}
      />);

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    const transitionName = 'delete';

    recordEditorContainer.props.onRecordTransitioned(transitionName);

    handlerCalled.should.equal(true);
  });

  it('should call findRelation when mounted', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const predicate = 'affects';

    let findConfig = null;
    let findSubject = null;
    let findObject = null;
    let findPredicate = null;

    const findRelation = (configArg, subjectArg, objectArg, predicateArg) => {
      findConfig = configArg;
      findSubject = subjectArg;
      findObject = objectArg;
      findPredicate = predicateArg;
    };

    render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        findRelation={findRelation}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.equal(subject);
    findObject.should.deep.equal(object);
    findPredicate.should.equal(predicate);
  });

  it('should call findRelation when subject, object, or predicate changes', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const predicate = 'affects';

    let findConfig = null;
    let findSubject = null;
    let findObject = null;
    let findPredicate = null;

    const findRelation = (configArg, subjectArg, objectArg, predicateArg) => {
      findConfig = configArg;
      findSubject = subjectArg;
      findObject = objectArg;
      findPredicate = predicateArg;
    };

    render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
      />, this.container);

    const newObject = {
      csid: 'abcd',
      recordType: 'group',
    };

    render(
      <RelationEditor
        config={config}
        subject={subject}
        object={newObject}
        predicate={predicate}
        findRelation={findRelation}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.equal(subject);
    findObject.should.deep.equal(newObject);
    findPredicate.should.equal(predicate);

    const newSubject = {
      csid: '1111',
      recordType: 'collectionobject',
    };

    render(
      <RelationEditor
        config={config}
        subject={newSubject}
        object={object}
        predicate={predicate}
        findRelation={findRelation}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.equal(newSubject);
    findObject.should.deep.equal(object);
    findPredicate.should.equal(predicate);

    const newPredicate = 'pred';

    render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={newPredicate}
        findRelation={findRelation}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.equal(subject);
    findObject.should.deep.equal(object);
    findPredicate.should.equal(newPredicate);
  });

  it('should call onUnmount when unmounted', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const predicate = 'affects';

    let handlerCalled = false;

    const handleUnmount = () => {
      handlerCalled = true;
    };

    handlerCalled.should.equal(false);

    render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        onUnmount={handleUnmount}
      />, this.container);

    render(
      <div />, this.container);

    handlerCalled.should.equal(true);
  });

  it('should call onClose when the cancel button is clicked in the button bar', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let handlerCalled = false;

    const handleClose = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
        onClose={handleClose}
      />);

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, RelationButtonBar);

    buttonBar.props.onCancelButtonClick();

    handlerCalled.should.equal(true);
  });

  it('should call onClose when the close button is clicked in the button bar', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let handlerCalled = false;

    const handleClose = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        findResult={findResult}
        onClose={handleClose}
      />);

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, RelationButtonBar);

    buttonBar.props.onCloseButtonClick();

    handlerCalled.should.equal(true);
  });

  it('should call onClose, then unrelate and onUnrelated when unmounted when the unrelate button is clicked in the button bar', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const predicate = 'affects';

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let handleCloseCalled = false;

    const handleClose = () => {
      handleCloseCalled = true;
    };

    let unrelateConfig = null;
    let unrelateSubject = null;
    let unrelateObject = null;
    let unrelatePredicate = null;

    const unrelate = (configArg, subjectArg, objectArg, predicateArg) => {
      unrelateConfig = configArg;
      unrelateSubject = subjectArg;
      unrelateObject = objectArg;
      unrelatePredicate = predicateArg;

      return Promise.resolve();
    };

    let handleUnrelatedSubject = null;
    let handleUnrelatedObject = null;
    let handleUnrelatedPredicate = null;

    const handleUnrelated = (subjectArg, objectArg, predicateArg) => {
      handleUnrelatedSubject = subjectArg;
      handleUnrelatedObject = objectArg;
      handleUnrelatedPredicate = predicateArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        findResult={findResult}
        onClose={handleClose}
        unrelate={unrelate}
        onUnrelated={handleUnrelated}
      />);

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, RelationButtonBar);

    buttonBar.props.onUnrelateButtonClick();

    handleCloseCalled.should.equal(true);

    expect(unrelateConfig).to.equal(null);

    shallowRenderer.unmount();

    unrelateConfig.should.equal(config);
    unrelateSubject.should.equal(subject);
    unrelateObject.should.equal(object);
    unrelatePredicate.should.equal(predicate);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleUnrelatedSubject.should.equal(subject);
        handleUnrelatedObject.should.equal(object);
        handleUnrelatedPredicate.should.equal(predicate);

        resolve();
      }, 0);
    });
  });

  it('should not call unrelate when unmounted if navigation is cancelled following the unrelate button being clicked', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const object = {
      csid: '5678',
      recordType: 'group',
    };

    const predicate = 'affects';

    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        totalItems: '1',
      },
    });

    let unrelateCalled = false;

    const unrelate = () => {
      unrelateCalled = true;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        findResult={findResult}
        unrelate={unrelate}
      />);

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, RelationButtonBar);

    buttonBar.props.onUnrelateButtonClick();

    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.props.onSaveCancelled();

    shallowRenderer.unmount();

    unrelateCalled.should.equal(false);
  });
});
