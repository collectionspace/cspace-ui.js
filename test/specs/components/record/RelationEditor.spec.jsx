/* global window */

import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import RelationEditor from '../../../../src/components/record/RelationEditor';

const expect = chai.expect;

chai.should();

const config = {

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

    result.type.should.equal(RecordEditorContainer);

    result.props.csid.should.equal(object.csid);
    result.props.recordType.should.equal(object.recordType);
    result.props.relatedSubjectCsid.should.equal(subject.csid);
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

  it('should call createRelation followed by onRecordCreated when a new record is created', function test() {
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

    const newRecordCsid = '9999';

    let createSubject = null;
    let createObject = null;
    let createPredicate = null;

    const createRelation = (subjectArg, objectArg, predicateArg) => {
      createSubject = subjectArg;
      createObject = objectArg;
      createPredicate = predicateArg;

      return Promise.resolve();
    };

    let createdCsid = null;

    const handleRecordCreated = (csidArg) => {
      createdCsid = csidArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditor
        config={config}
        subject={subject}
        object={object}
        predicate={predicate}
        findResult={findResult}
        createRelation={createRelation}
        onRecordCreated={handleRecordCreated}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.onRecordCreated(newRecordCsid);

    createSubject.should.equal(subject);
    createObject.should.deep.equal({ csid: newRecordCsid });
    createPredicate.should.equal(predicate);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        createdCsid.should.equal(newRecordCsid);

        resolve();
      }, 0);
    });
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

    const findRelation = (configArg, descriptor) => {
      findConfig = configArg;
      findSubject = descriptor.subject;
      findObject = descriptor.object;
      findPredicate = descriptor.predicate;
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

    const findRelation = (configArg, descriptor) => {
      findConfig = configArg;
      findSubject = descriptor.subject;
      findObject = descriptor.object;
      findPredicate = descriptor.predicate;
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
});
