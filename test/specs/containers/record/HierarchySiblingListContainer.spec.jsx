import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import HierarchySiblingList from '../../../../src/components/record/HierarchySiblingList';
import HierarchySiblingListContainer from '../../../../src/containers/record/HierarchySiblingListContainer';

import {
  RELATION_FIND_STARTED,
} from '../../../../src/actions/relation';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('HierarchySiblingListContainer', function suite() {
  it('should set props on HierarchySiblingList', function test() {
    const parentCsid = '1234';
    const recordType = 'person';
    const findResult = Immutable.Map();

    const relationStore = Immutable.Map().setIn(
      ['find', undefined, parentCsid, 'hasBroader', 'result'], findResult
    );

    const store = mockStore({
      relation: relationStore,
    });

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchySiblingListContainer
        parentCsid={parentCsid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(HierarchySiblingList);
    result.props.should.have.property('findResult', findResult);
    result.props.should.have.property('findRelations').that.is.a('function');
  });

  it('should connect findRelations to find action creator', function test() {
    const parentCsid = '1234';
    const recordType = 'person';

    const subject = {
      recordType,
    };

    const object = {
      recordType,
      csid: parentCsid,
    };

    const predicate = 'hasBroader';

    const store = mockStore({
      relation: Immutable.Map(),
    });

    const context = { store };

    const config = {
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchySiblingListContainer
        parentCsid={parentCsid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to findRelationw will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the find action creator gets called, and
    // dispatches RELATION_FIND_STARTED.

    try {
      result.props.findRelations(config, subject, object, predicate);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', RELATION_FIND_STARTED);
      action.should.have.deep.property('meta.subject', subject);
      action.should.have.deep.property('meta.object', object);
      action.should.have.deep.property('meta.predicate', predicate);
    }
  });
});
