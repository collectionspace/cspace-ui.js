import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  CLEAR_RELATION_STATE,
  RELATION_FIND_STARTED,
  RELATION_FIND_FULFILLED,
  RELATION_FIND_REJECTED,
  RELATION_SAVE_STARTED,
  RELATION_SAVE_FULFILLED,
  RELATION_SAVE_REJECTED,
  SUBJECT_RELATIONS_UPDATED,
  clearState,
  find,
  create,
  createBidirectional,
  batchCreate,
  batchCreateBidirectional,
} from '../../../src/actions/relation';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  recordTypes: {
    collectionobject: {
      serviceConfig: {
        objectName: 'CollectionObject',
      },
    },
    group: {
      serviceConfig: {
        objectName: 'Group',
      },
    },
  },
};

describe('relation action creator', function suite() {
  const subject = {
    csid: '1234',
    recordType: 'collectionobject',
  };

  const object = {
    csid: '5678',
    recordType: 'group',
  };

  const predicate = 'affects';

  const sbjType = config.recordTypes[subject.recordType].serviceConfig.objectName;
  const objType = config.recordTypes[object.recordType].serviceConfig.objectName;

  const findUrl = `/cspace-services/relations?prd=${predicate}&wf_deleted=false&pgSz=0&sbj=${subject.csid}&sbjType=${sbjType}&obj=${object.csid}&objType=${objType}`;
  const createUrl = '/cspace-services/relations';

  describe('clearState', function actionSuite() {
    it('should create a CLEAR_RELATION_STATE action', function test() {
      clearState().should.deep.equal({
        type: CLEAR_RELATION_STATE,
      });
    });
  });

  describe('find', function actionSuite() {
    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_FIND_FULFILLED on success', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(findUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(find(config, subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_FIND_STARTED,
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_FIND_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              subject,
              object,
              predicate,
            },
          });
        });
    });

    it('should dispatch RELATION_FIND_REJECTED on error', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(findUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(find(config, subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_FIND_STARTED,
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[1].should.have.property('type', RELATION_FIND_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              subject,
              object,
              predicate,
            });
        });
    });

    it('should return null if a find result already exists for the descriptor', function test() {
      const store = mockStore({
        relation: Immutable.fromJS({
          find: {
            [subject.csid]: {
              [object.csid]: {
                [predicate]: {
                  result: {},
                },
              },
            },
          },
        }),
      });

      expect(store.dispatch(find(config, subject, object, predicate))).to.equal(null);
    });

    it('should throw if object csid or subject csid are not supplied', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      expect(store.dispatch.bind(store, find(config, { subject, object: {}, predicate })))
        .to.throw(Error, /subject csid and object csid must be supplied/);
    });
  });

  describe('create', function actionSuite() {
    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_SAVE_FULFILLED on success', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 201,
        headers: {
          location: 'some/new/url',
        },
      });

      return store.dispatch(create(subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[2].should.deep.equal({
            type: SUBJECT_RELATIONS_UPDATED,
            meta: subject,
          });
        });
    });

    it('should dispatch RELATION_SAVE_REJECTED on error', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 400,
        data: {},
      });

      return store.dispatch(create(subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[1].should.have.property('type', RELATION_SAVE_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              subject,
              object,
              predicate,
            });
        });
    });
  });

  describe('createBidirectional', function actionSuite() {
    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_SAVE_FULFILLED twice, once in each direction', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 201,
        headers: {
          location: 'some/new/url',
        },
      });

      return store.dispatch(createBidirectional(subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(5);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object,
              predicate,
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: object,
              object: subject,
              predicate,
            },
          });

          actions[3].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject: object,
              object: subject,
              predicate,
            },
          });

          actions[4].should.deep.equal({
            type: SUBJECT_RELATIONS_UPDATED,
            meta: subject,
          });
        });
    });
  });

  describe('batchCreate', function actionSuite() {
    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_SAVE_FULFILLED once for each object', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 201,
        headers: {
          location: 'some/new/url',
        },
      });

      const objects = [
        {
          csid: '1111',
          recordType: 'group',
        },
        {
          csid: '2222',
          recordType: 'group',
        },
        {
          csid: '3333',
          recordType: 'group',
        },
      ];

      return store.dispatch(batchCreate(subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(7);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[2],
              predicate,
            },
          });

          actions[3].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[4].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[5].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object: objects[2],
              predicate,
            },
          });

          actions[6].should.deep.equal({
            type: SUBJECT_RELATIONS_UPDATED,
            meta: subject,
          });
        });
    });
  });

  describe('batchCreateBidirectional', function actionSuite() {
    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_SAVE_FULFILLED twice for each object', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 201,
        headers: {
          location: 'some/new/url',
        },
      });

      const objects = [
        {
          csid: '1111',
          recordType: 'group',
        },
        {
          csid: '2222',
          recordType: 'group',
        },
      ];

      return store.dispatch(batchCreateBidirectional(subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(9);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[3].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[4].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[0],
              object: subject,
              predicate,
            },
          });

          actions[5].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[1],
              object: subject,
              predicate,
            },
          });

          actions[6].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject: objects[0],
              object: subject,
              predicate,
            },
          });

          actions[7].should.deep.equal({
            type: RELATION_SAVE_FULFILLED,
            payload: {
              status: 201,
              headers: {
                location: 'some/new/url',
              },
              statusText: undefined,
              data: undefined,
            },
            meta: {
              subject: objects[1],
              object: subject,
              predicate,
            },
          });

          actions[8].should.deep.equal({
            type: SUBJECT_RELATIONS_UPDATED,
            meta: subject,
          });
        });
    });
  });
});
