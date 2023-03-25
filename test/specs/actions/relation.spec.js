import chaiAsPromised from 'chai-as-promised';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';

import {
  SHOW_NOTIFICATION,
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
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
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

const { expect } = chai;

chai.use(chaiAsPromised);
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

describe('relation action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    this.timeout(3000);

    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

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

  const findUrl = '/cspace-services/relations';
  const createUrl = '/cspace-services/relations';

  describe('clearState', () => {
    it('should create a CLEAR_RELATION_STATE action', () => {
      clearState().should.deep.equal({
        type: CLEAR_RELATION_STATE,
      });
    });
  });

  describe('find', () => {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_FIND_FULFILLED on success', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(findUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (
            searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '0'
            && searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('sbjType') === sbjType
            && searchParams.get('obj') === object.csid
            && searchParams.get('objType') === objType
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions[1].type.should.equal(RELATION_FIND_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            subject,
            object,
            predicate,
          });
        });
    });

    it('should dispatch RELATION_FIND_REJECTED on error', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(findUrl, (req, res, ctx) => res(ctx.status(400))),
      );

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

    it('should return null if a find result already exists for the descriptor', () => {
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

    it('should throw if neither object csid nor subject csid are supplied', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      expect(store.dispatch.bind(store, find(config, {}, {}, predicate)))
        .to.throw(Error, /subject csid or object csid must be supplied/);
    });
  });

  describe('create', () => {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_SAVE_FULFILLED on success', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.post(createUrl, (req, res, ctx) => res(
          ctx.status(201),
          ctx.set('location', 'some/new/url'),
        )),
      );

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

          actions[1].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[1].payload.status.should.equal(201);
          actions[1].payload.headers.location.should.equal('some/new/url');

          actions[1].meta.should.deep.equal({
            subject,
            object,
            predicate,
          });

          actions[2].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[2].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch RELATION_SAVE_REJECTED on error', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.post(createUrl, (req, res, ctx) => res(ctx.status(400))),
      );

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

  describe('createBidirectional', () => {
    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_SAVE_FULFILLED twice, once in each direction', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.post(createUrl, (req, res, ctx) => res(
          ctx.status(201),
          ctx.set('location', 'some/new/url'),
        )),
      );

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

          actions[1].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[1].payload.status.should.equal(201);
          actions[1].payload.headers.location.should.equal('some/new/url');

          actions[1].meta.should.deep.equal({
            subject,
            object,
            predicate,
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: object,
              object: subject,
              predicate,
            },
          });

          actions[3].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[3].payload.status.should.equal(201);
          actions[3].payload.headers.location.should.equal('some/new/url');

          actions[3].meta.should.deep.equal({
            subject: object,
            object: subject,
            predicate,
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

  describe('batchCreate', () => {
    const checkUrl = '/cspace-services/relations';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_SAVE_FULFILLED once for each object', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),

        rest.post(createUrl, (req, res, ctx) => res(
          ctx.status(201),
          ctx.set('location', 'some/new/url'),
        )),
      );

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

          actions[1].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[1].payload.status.should.equal(201);
          actions[1].payload.headers.location.should.equal('some/new/url');

          actions[1].meta.should.deep.equal({
            subject,
            object: objects[0],
            predicate,
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[3].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[3].payload.status.should.equal(201);
          actions[3].payload.headers.location.should.equal('some/new/url');

          actions[3].meta.should.deep.equal({
            subject,
            object: objects[1],
            predicate,
          });

          actions[4].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[2],
              predicate,
            },
          });

          actions[5].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[5].payload.status.should.equal(201);
          actions[5].payload.headers.location.should.equal('some/new/url');

          actions[5].meta.should.deep.equal({
            subject,
            object: objects[2],
            predicate,
          });

          actions[6].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[6].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),

        rest.post(createUrl, (req, res, ctx) => res(ctx.status(403))),
      );

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

    it('should dispatch nothing for each object that is already related to the subject', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '1',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions.should.have.lengthOf(1);

          actions[0].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[0].meta.should.contain({
            subject,
          });
        });
    });
  });

  describe('batchCreateBidirectional', () => {
    const checkUrl = '/cspace-services/relations';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_SAVE_FULFILLED twice for each object', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),

        rest.post(createUrl, (req, res, ctx) => res(
          ctx.status(201),
          ctx.set('location', 'some/new/url'),
        )),
      );

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

          actions[1].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[1].payload.status.should.equal(201);
          actions[1].payload.headers.location.should.equal('some/new/url');

          actions[1].meta.should.deep.equal({
            subject,
            object: objects[0],
            predicate,
          });

          actions[2].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[0],
              object: subject,
              predicate,
            },
          });

          actions[3].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[3].payload.status.should.equal(201);
          actions[3].payload.headers.location.should.equal('some/new/url');

          actions[3].meta.should.deep.equal({
            subject: objects[0],
            object: subject,
            predicate,
          });

          actions[4].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject,
              object: objects[1],
              predicate,
            },
          });

          actions[5].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[5].payload.status.should.equal(201);
          actions[5].payload.headers.location.should.equal('some/new/url');

          actions[5].meta.should.deep.equal({
            subject,
            object: objects[1],
            predicate,
          });

          actions[6].should.deep.equal({
            type: RELATION_SAVE_STARTED,
            meta: {
              subject: objects[1],
              object: subject,
              predicate,
            },
          });

          actions[7].type.should.equal(RELATION_SAVE_FULFILLED);
          actions[7].payload.status.should.equal(201);
          actions[7].payload.headers.location.should.equal('some/new/url');

          actions[7].meta.should.deep.equal({
            subject: objects[1],
            object: subject,
            predicate,
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

    it('should dispatch SHOW_NOTIFICATION on error', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),

        rest.post(createUrl, (req, res, ctx) => res(ctx.status(403))),
      );

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

    it('should dispatch nothing for each object that is already related to the subject', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('obj')
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '1',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions.should.have.lengthOf(2);

          actions[0].should.contain({
            type: SHOW_NOTIFICATION,
          });

          actions[1].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[1].meta.should.contain({
            subject,
          });
        });
    });
  });

  describe('deleteRelation', () => {
    const relationCsid = 'aaaa';
    const deleteUrl = `/cspace-services/relations/${relationCsid}`;

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_DELETE_FULFILLED on success', () => {
      const store = mockStore();

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(200))),
      );

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

          actions[1].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[1].payload.status.should.equal(200);

          actions[1].meta.should.deep.equal({
            csid: relationCsid,
          });
        });
    });

    it('should dispatch RELATION_DELETE_REJECTED on error', () => {
      const store = mockStore();

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(deleteRelation(relationCsid)).should.eventually.be.rejected
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

    it('should throw if no csid is supplied', () => {
      const store = mockStore();

      expect(store.dispatch.bind(store, deleteRelation()))
        .to.throw(Error, /csid must be supplied/);
    });
  });

  describe('unrelate', () => {
    const relationCsid = 'aaaa';
    const deleteUrl = `/cspace-services/relations/${relationCsid}`;

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_DELETE_FULFILLED on success', () => {
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

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(200))),
      );

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

          actions[1].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[1].payload.status.should.equal(200);

          actions[1].meta.should.deep.equal({
            csid: relationCsid,
          });

          actions[2].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[2].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch RELATION_DELETE_REJECTED on error', () => {
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

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(400))),
      );

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

    it('should find the relation if it is not already in the store', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      worker.use(
        rest.get(findUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (
            searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '0'
            && searchParams.get('prd') === predicate
            && searchParams.get('sbj') === subject.csid
            && searchParams.get('sbjType') === sbjType
            && searchParams.get('obj') === object.csid
            && searchParams.get('objType') === objType
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions[1].type.should.equal(RELATION_FIND_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            subject,
            object,
            predicate,
          });
        });
    });

    it('should throw if object csid and subject csid are not both supplied', () => {
      const store = mockStore({
        relation: Immutable.Map(),
      });

      expect(store.dispatch.bind(store, unrelate(config, subject, {}, predicate)))
        .to.throw(Error, /subject csid and object csid must be supplied/);
    });
  });

  describe('unrelateBidirectional', () => {
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

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_DELETE_FULFILLED twice, once for each direction', () => {
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

      worker.use(
        rest.delete(forwardDeleteUrl, (req, res, ctx) => res(ctx.status(200))),
        rest.delete(backwardDeleteUrl, (req, res, ctx) => res(ctx.status(200))),
      );

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

          actions[1].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[1].payload.status.should.equal(200);

          actions[1].meta.should.deep.equal({
            csid: forwardRelationCsid,
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

          actions[4].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[4].payload.status.should.equal(200);

          actions[4].meta.should.deep.equal({
            csid: backwardRelationCsid,
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

  describe('batchUnrelate', () => {
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

    const deleteUrl = '/cspace-services/relations/:csid';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_DELETE_FULFILLED once for each object', () => {
      const relationState = objects.reduce((map, obj, index) => map.setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
        'rel:relations-common-list': {
          'relation-list-item': {
            csid: relationCsids[index],
          },
        },
      })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => {
          const { params } = req;

          if (relationCsids.includes(params.csid)) {
            return res(ctx.status(200));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions[1].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[1].payload.status.should.equal(200);

          actions[1].meta.should.deep.equal({
            csid: relationCsids[0],
          });

          actions[2].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: relationCsids[1],
            },
          });

          actions[3].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[3].payload.status.should.equal(200);

          actions[3].meta.should.deep.equal({
            csid: relationCsids[1],
          });

          actions[4].should.contain({
            type: SUBJECT_RELATIONS_UPDATED,
          });

          actions[4].meta.should.contain({
            subject,
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION on error', () => {
      const relationState = objects.reduce((map, obj, index) => map.setIn(['find', subject.csid, obj.csid, predicate, 'result'], Immutable.fromJS({
        'rel:relations-common-list': {
          'relation-list-item': {
            csid: relationCsids[index],
          },
        },
      })), Immutable.Map());

      const store = mockStore({
        relation: relationState,
      });

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(403))),
      );

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

  describe('batchUnrelateBidirectional', () => {
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

    const deleteUrl = '/cspace-services/relations/:csid';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch RELATION_DELETE_FULFILLED once for each object', () => {
      const relationState = objects.reduce((map, obj, index) => map
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

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => {
          const { params } = req;

          if (
            forwardRelationCsids.includes(params.csid)
            || backwardRelationCsids.includes(params.csid)
          ) {
            return res(ctx.status(200));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions[1].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[1].payload.status.should.equal(200);

          actions[1].meta.should.deep.equal({
            csid: forwardRelationCsids[0],
          });

          actions[2].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: backwardRelationCsids[0],
            },
          });

          actions[3].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[3].payload.status.should.equal(200);

          actions[3].meta.should.deep.equal({
            csid: backwardRelationCsids[0],
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

          actions[6].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[6].payload.status.should.equal(200);

          actions[6].meta.should.deep.equal({
            csid: forwardRelationCsids[1],
          });

          actions[7].should.deep.equal({
            type: RELATION_DELETE_STARTED,
            meta: {
              csid: backwardRelationCsids[1],
            },
          });

          actions[8].type.should.equal(RELATION_DELETE_FULFILLED);
          actions[8].payload.status.should.equal(200);

          actions[8].meta.should.deep.equal({
            csid: backwardRelationCsids[1],
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

    it('should dispatch SHOW_NOTIFICATION on error', () => {
      const relationState = objects.reduce((map, obj, index) => map
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

      worker.use(
        rest.delete(deleteUrl, (req, res, ctx) => res(ctx.status(403))),
      );

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

  describe('checkForRelations', () => {
    const csid = '1234';
    const checkUrl = '/cspace-services/relations';

    before(() => {
      const store = mockStore();

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should resolve to true if relations are found for the given csid and predicate', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '4',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(checkForRelations(csid, predicate)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no relations are found for the given csid and predicate', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('prd') === predicate
            && searchParams.get('sbj') === csid
            && searchParams.get('andReciprocal') === 'true'
            && searchParams.get('wf_deleted') === 'false'
            && searchParams.get('pgSz') === '1'
          ) {
            return res(ctx.json({
              'rel:relations-common-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(checkForRelations(csid, predicate)).then((result) => {
        result.should.equal(false);
      });
    });
  });
});
