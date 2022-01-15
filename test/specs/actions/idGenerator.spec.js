import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  ADD_ID_GENERATORS,
  READ_ID_GENERATOR_STARTED,
  READ_ID_GENERATOR_FULFILLED,
  READ_ID_GENERATOR_REJECTED,
  CREATE_ID_STARTED,
  CREATE_ID_FULFILLED,
  CREATE_ID_REJECTED,
  REMOVE_NOTIFICATION,
  VALIDATION_PASSED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  addIDGenerators,
  readIDGenerator,
  createID,
} from '../../../src/actions/idGenerator';

import {
  NOTIFICATION_ID_VALIDATION,
} from '../../../src/actions/notification';

const { expect } = chai;

chai.should();

describe('ID generator action creator', () => {
  describe('addIDGenerators', () => {
    it('should create an ADD_ID_GENERATORS action', () => {
      const idGenerators = {
        accession: {
          csid: '9dd92952-c384-44dc-a736-95e435c1759c',
          messages: {
            type: {
              id: 'idGenerator.accession.type',
              defaultMessage: 'Accession',
            },
          },
        },
      };

      addIDGenerators(idGenerators).should.deep.equal({
        type: ADD_ID_GENERATORS,
        payload: idGenerators,
      });
    });
  });

  describe('readIDGenerator', () => {
    const mockStore = configureMockStore([thunk]);
    const idGeneratorName = 'accession';
    const idGeneratorCsid = '1234';

    const store = mockStore({
      idGenerator: Immutable.fromJS({
        [idGeneratorName]: {
          csid: idGeneratorCsid,
        },
      }),
      prefs: Immutable.Map(),
      user: Immutable.Map(),
    });

    const readIDGeneratorUrl = new RegExp(`/cspace-services/idgenerators/${idGeneratorCsid}.*`);

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should dispatch READ_ID_GENERATOR_FULFILLED on success', () => {
      moxios.stubRequest(readIDGeneratorUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(readIDGenerator(idGeneratorName))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_ID_GENERATOR_STARTED,
            meta: {
              idGeneratorName,
            },
          });

          actions[1].should.deep.equal({
            type: READ_ID_GENERATOR_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              idGeneratorName,
            },
          });
        });
    });

    it('should dispatch READ_ID_GENERATOR_REJECTED on error', () => {
      moxios.stubRequest(readIDGeneratorUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(readIDGenerator(idGeneratorName))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_ID_GENERATOR_STARTED,
            meta: {
              idGeneratorName,
            },
          });

          actions[1].should.have.property('type', READ_ID_GENERATOR_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              idGeneratorName,
            });
        });
    });

    it('should dispatch no action (null) when no csid is found for the ID generator name', () => {
      expect(store.dispatch(readIDGenerator('foo'))).to.equal(null);
    });
  });

  describe('createID', () => {
    const mockStore = configureMockStore([thunk]);
    const idGeneratorName = 'accession';
    const idGeneratorCsid = '1234';

    const store = mockStore({
      idGenerator: Immutable.fromJS({
        [idGeneratorName]: {
          csid: idGeneratorCsid,
        },
      }),
      prefs: Immutable.Map(),
      user: Immutable.Map(),
      record: Immutable.Map(),
    });

    const recordTypeConfig = {};
    const createIDUrl = `/cspace-services/idgenerators/${idGeneratorCsid}/ids`;
    const csid = '9987';
    const path = ['collectionobjects_common', 'objectNumber'];
    const transform = (number) => number;

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should dispatch CREATE_ID_FULFILLED on success', () => {
      moxios.stubRequest(createIDUrl, {
        status: 200,
        response: '2016.1.1',
      });

      return store.dispatch(createID(recordTypeConfig, idGeneratorName, csid, path, transform))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(4);

          actions[0].should.deep.equal({
            type: CREATE_ID_STARTED,
            meta: {
              recordTypeConfig,
              idGeneratorName,
              csid,
              path,
            },
          });

          actions[1].should.deep.equal({
            type: CREATE_ID_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: '2016.1.1',
            },
            meta: {
              recordTypeConfig,
              idGeneratorName,
              csid,
              path,
              transform,
            },
          });

          actions[2].should.deep.equal({
            type: VALIDATION_PASSED,
            meta: {
              csid,
              path: [],
            },
          });

          actions[3].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });
        });
    });

    it('should dispatch CREATE_ID_REJECTED on error', () => {
      moxios.stubRequest(createIDUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(createID(recordTypeConfig, idGeneratorName, csid, path))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: CREATE_ID_STARTED,
            meta: {
              recordTypeConfig,
              idGeneratorName,
              csid,
              path,
            },
          });

          actions[1].should.have.property('type', CREATE_ID_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              recordTypeConfig,
              idGeneratorName,
              csid,
              path,
            });
        });
    });

    it('should dispatch no action (null) when no csid is found for the ID generator name', () => {
      expect(store.dispatch(createID('foo', csid, path))).to.equal(null);
    });
  });
});
