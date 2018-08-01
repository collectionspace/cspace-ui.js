import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  SHOW_NOTIFICATION,
} from '../../../src/actions/notification';

import {
  CLEAR_RELATION_STATE,
  RELATION_DELETE_STARTED,
  RELATION_DELETE_FULFILLED,
  RELATION_DELETE_REJECTED,
  RELATION_FIND_STARTED,
  RELATION_FIND_FULFILLED,
  RELATION_FIND_REJECTED,
  RELATION_SAVE_STARTED,
  RELATION_SAVE_FULFILLED,
  RELATION_SAVE_REJECTED,
  SUBJECT_RELATIONS_UPDATED,
  checkForRelations,
  clearState,
  find,
  create,
  createBidirectional,
  batchCreate,
  batchCreateBidirectional,
  deleteRelation,
  unrelate,
  unrelateBidirectional,
  batchUnrelate,
  batchUnrelateBidirectional,
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
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
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

    it('should throw if neither object csid nor subject csid are supplied', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      expect(store.dispatch.bind(store, find(config, {}, {}, predicate)))
        .to.throw(Error, /subject csid or object csid must be supplied/);
    });
  });

  describe('create', function actionSuite() {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
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

          actions[2].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[2].meta.should.contain({
            subject,
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
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
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

          actions[4].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[4].meta.should.contain({
            subject,
          });
        });
    });
  });

  describe('batchCreate', function actionSuite() {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
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

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[1],
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
              subject,
              object: objects[2],
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

          actions[6].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[6].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 403,
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

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[1].should.contain({
            type: RELATION_SAVE_REJECTED,
          });

          actions[2].should.contain({
            type: SHOW_NOTIFICATION,
          });
        });
    });
  });

  describe('batchCreateBidirectional', function actionSuite() {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
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

          actions.should.have.lengthOf(10);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[0],
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
              object: objects[0],
              predicate,
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[0],
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
              subject: objects[0],
              object: subject,
              predicate,
            },
          });

          actions[4].should.deep.equal({
            type: RELATION_SAVE_STARTED,
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
              object: objects[1],
              predicate,
            },
          });

          actions[6].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[1],
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

          actions[8].should.contain({
            type: SHOW_NOTIFICATION,
          });

          actions[9].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[9].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(createUrl, {
        status: 403,
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

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[0],
              predicate,
            },
          });

          actions[1].should.contain({
            type: RELATION_SAVE_REJECTED,
          });

          actions[2].should.contain({
            type: SHOW_NOTIFICATION,
          });
        });
    });
  });

  describe('deleteRelation', function actionSuite() {
    const relationCsid = 'aaaa';
    const deleteUrl = `/cspace-services/relations/${relationCsid}`;

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_DELETE_FULFILLED on success', function test() {
      const store = mockStore();

      moxios.stubRequest(deleteUrl, {
        status: 200,
      });

      return store.dispatch(deleteRelation(relationCsid))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsid,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: relationCsid,
            },
          });
        });
    });

    it('should dispatch RELATION_DELETE_REJECTED on error', function test() {
      const store = mockStore();

      moxios.stubRequest(deleteUrl, {
        status: 400,
      });

      return store.dispatch(deleteRelation(relationCsid))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsid,
            },
          });

          actions[1].should.have.property('type', RELATION_DELETE_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              csid: relationCsid,
            });
        })
        .catch(() => {});
    });

    it('should throw if no csid is supplied', function test() {
      const store = mockStore();

      expect(store.dispatch.bind(store, deleteRelation()))
        .to.throw(Error, /csid must be supplied/);
    });
  });

  describe('unrelate', function actionSuite() {
    const relationCsid = 'aaaa';
    const deleteUrl = `/cspace-services/relations/${relationCsid}`;

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_DELETE_FULFILLED on success', function test() {
      const store = mockStore({
        relation: Immutable.fromJS({
          find: {
            [subject.csid]: {
              [object.csid]: {
                [predicate]: {
                  result: {
                    'rel:relations-common-list': {
                      'relation-list-item': {
                        csid: relationCsid,
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      });

      moxios.stubRequest(deleteUrl, {
        status: 200,
      });

      return store.dispatch(unrelate(config, subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsid,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: relationCsid,
            },
          });

          actions[2].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[2].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch RELATION_DELETE_REJECTED on error', function test() {
      const store = mockStore({
        relation: Immutable.fromJS({
          find: {
            [subject.csid]: {
              [object.csid]: {
                [predicate]: {
                  result: {
                    'rel:relations-common-list': {
                      'relation-list-item': {
                        csid: relationCsid,
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      });

      moxios.stubRequest(deleteUrl, {
        status: 400,
      });

      return store.dispatch(unrelate(config, subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsid,
            },
          });

          actions[1].should.have.property('type', RELATION_DELETE_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              csid: relationCsid,
            });
        });
    });

    it('should find the relation if it is not already in the store', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      moxios.stubRequest(findUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(unrelate(config, subject, object, predicate))
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

    it('should throw if object csid and subject csid are not both supplied', function test() {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      expect(store.dispatch.bind(store, unrelate(config, subject, {}, predicate)))
        .to.throw(Error, /subject csid and object csid must be supplied/);
    });
  });

  describe('unrelateBidirectional', function actionSuite() {
    const forwardRelationCsid = 'aaaa';
    const backwardRelationCsid = 'bbbb';

    const forwardDeleteUrl = `/cspace-services/relations/${forwardRelationCsid}`;
    const backwardDeleteUrl = `/cspace-services/relations/${backwardRelationCsid}`;

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_DELETE_FULFILLED twice, once for each direction', function test() {
      const store = mockStore({
        relation: Immutable.fromJS({
          find: {
            [subject.csid]: {
              [object.csid]: {
                [predicate]: {
                  result: {
                    'rel:relations-common-list': {
                      'relation-list-item': {
                        csid: forwardRelationCsid,
                      },
                    },
                  },
                },
              },
            },
            [object.csid]: {
              [subject.csid]: {
                [predicate]: {
                  result: {
                    'rel:relations-common-list': {
                      'relation-list-item': {
                        csid: backwardRelationCsid,
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      });

      moxios.stubRequest(forwardDeleteUrl, {
        status: 200,
      });

      moxios.stubRequest(backwardDeleteUrl, {
        status: 200,
      });

      return store.dispatch(unrelateBidirectional(config, subject, object, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(6);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: forwardRelationCsid,
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: forwardRelationCsid,
            },
          });

          actions[2].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[2].meta.should.contain({
            subject,
          });

          actions[3].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: backwardRelationCsid,
            },
          });

          actions[4].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: backwardRelationCsid,
            },
          });

          actions[5].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[5].meta.should.contain({
            subject: object,
          });
        });
    });
  });

  describe('batchUnrelate', function actionSuite() {
    const objects = [
      {
        csid: '1000',
        recordType: 'group',
      },
      {
        csid: '2000',
        recordType: 'group',
      },
    ];

    const relationCsids = [
      'aaaa',
      'bbbb',
    ];

    const deleteUrls = relationCsids.map(csid => `/cspace-services/relations/${csid}`);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_DELETE_FULFILLED once for each object', function test() {
      const relationState = objects.reduce((map, obj, index) =>
        map.setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
          'rel:relations-common-list': {
            'relation-list-item': {
              csid: relationCsids[index],
            },
          },
        })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      deleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 200,
        });
      });

      return store.dispatch(batchUnrelate(config, subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(5);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsids[0],
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: relationCsids[0],
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsids[1],
            },
          });

          actions[3].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: relationCsids[1],
            },
          });

          actions[4].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[4].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', function test() {
      const relationState = objects.reduce((map, obj, index) =>
        map.setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
          'rel:relations-common-list': {
            'relation-list-item': {
              csid: relationCsids[index],
            },
          },
        })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      deleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 403,
        });
      });

      return store.dispatch(batchUnrelate(config, subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsids[0],
            },
          });

          actions[1].should.contain({
            type: RELATION_DELETE_REJECTED,
          });

          actions[2].should.contain({
            type: SHOW_NOTIFICATION,
          });
        });
    });
  });

  describe('batchUnrelateBidirectional', function actionSuite() {
    const objects = [
      {
        csid: '1000',
        recordType: 'group',
      },
      {
        csid: '2000',
        recordType: 'group',
      },
    ];

    const forwardRelationCsids = [
      'aaaa0',
      'bbbb0',
    ];

    const backwardRelationCsids = [
      'aaaa1',
      'bbbb1',
    ];

    const forwardDeleteUrls =
      forwardRelationCsids.map(csid => `/cspace-services/relations/${csid}`);

    const backwardDeleteUrls =
      backwardRelationCsids.map(csid => `/cspace-services/relations/${csid}`);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch RELATION_DELETE_FULFILLED once for each object', function test() {
      const relationState = objects.reduce((map, obj, index) =>
        map
          .setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
            'rel:relations-common-list': {
              'relation-list-item': {
                csid: forwardRelationCsids[index],
              },
            },
          }))
          .setIn(['find', obj.csid, subject.csid, predicate, 'result'], Immutable.fromJS({
            'rel:relations-common-list': {
              'relation-list-item': {
                csid: backwardRelationCsids[index],
              },
            },
          })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      forwardDeleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 200,
        });
      });

      backwardDeleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 200,
        });
      });

      return store.dispatch(batchUnrelateBidirectional(config, subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(11);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: forwardRelationCsids[0],
            },
          });

          actions[1].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: forwardRelationCsids[0],
            },
          });

          actions[2].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: backwardRelationCsids[0],
            },
          });

          actions[3].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: backwardRelationCsids[0],
            },
          });

          actions[4].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[4].meta.should.contain({
            subject: objects[0],
          });

          actions[5].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: forwardRelationCsids[1],
            },
          });

          actions[6].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: forwardRelationCsids[1],
            },
          });

          actions[7].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: backwardRelationCsids[1],
            },
          });

          actions[8].should.deep.equal({
            type: RELATION_DELETE_FULFILLED,
            payload: {
              status: 200,
              headers: undefined,
              statusText: undefined,
              data: undefined,
            },
            meta: {
              csid: backwardRelationCsids[1],
            },
          });

          actions[9].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[9].meta.should.contain({
            subject: objects[1],
          });

          actions[10].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[10].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', function test() {
      const relationState = objects.reduce((map, obj, index) =>
        map
          .setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
            'rel:relations-common-list': {
              'relation-list-item': {
                csid: forwardRelationCsids[index],
              },
            },
          }))
          .setIn(['find', obj.csid, subject.csid, predicate, 'result'], Immutable.fromJS({
            'rel:relations-common-list': {
              'relation-list-item': {
                csid: backwardRelationCsids[index],
              },
            },
          })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      forwardDeleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 403,
        });
      });

      backwardDeleteUrls.forEach((url) => {
        moxios.stubRequest(url, {
          status: 403,
        });
      });

      return store.dispatch(batchUnrelateBidirectional(config, subject, objects, predicate))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: forwardRelationCsids[0],
            },
          });

          actions[1].should.contain({
            type: RELATION_DELETE_REJECTED,
          });

          actions[2].should.contain({
            type: SHOW_NOTIFICATION,
          });
        });
    });
  });

  describe('checkForRelations', function actionSuite() {
    const csid = '1234';
    const checkUrl = `/cspace-services/relations?prd=${predicate}&sbj=${csid}&andReciprocal=true&wf_deleted=false&pgSz=1`;

    before(() => {
      const store = mockStore();

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should resolve to true if relations are found for the given csid and predicate', function test() {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'rel:relations-common-list': {
            totalItems: '4',
          },
        },
      });

      return store.dispatch(checkForRelations(csid, predicate)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no relations are found for the given csid and predicate', function test() {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'rel:relations-common-list': {
            totalItems: '0',
          },
        },
      });

      return store.dispatch(checkForRelations(csid, predicate)).then((result) => {
        result.should.equal(false);
      });
    });
  });
});
