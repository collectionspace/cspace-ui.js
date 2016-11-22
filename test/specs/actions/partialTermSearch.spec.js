import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  ADD_TERM_STARTED,
  ADD_TERM_FULFILLED,
  ADD_TERM_REJECTED,
  PARTIAL_TERM_SEARCH_STARTED,
  PARTIAL_TERM_SEARCH_FULFILLED,
  PARTIAL_TERM_SEARCH_REJECTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../../src/actions/partialTermSearch';

chai.should();

describe('partialTermSearch action creator', function suite() {
  describe('addTerm', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const authorityServiceName = 'personauthorities';
    const vocabularyName = 'person';
    const termAddUrl = `/cspace-services/${authorityServiceName}/urn:cspace:name(${vocabularyName})/items`;
    const termReadUrl = '/some/new/url/csid';
    const displayName = 'abc';

    const serviceConfig = {
      name: 'personauthorities',
      vocabularies: {
        person: {},
        ulan_pa: {},
      },
      quickAddData: () => ({}),
    };

    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch ADD_TERM_FULFILLED on success', function test() {
      moxios.stubRequest(termAddUrl, {
        status: 201,
        headers: {
          location: termReadUrl,
        },
      });

      moxios.stubRequest(`/cspace-services${termReadUrl}`, {
        status: 200,
        response: {},
      });

      const store = mockStore({});

      return store.dispatch(addTerm(serviceConfig, vocabularyName, displayName))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ADD_TERM_STARTED,
            meta: {
              displayName,
              authorityServiceName,
              vocabularyName,
            },
          });

          actions[1].should.deep.equal({
            type: ADD_TERM_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              displayName,
              authorityServiceName,
              vocabularyName,
            },
          });
        });
    });

    it('should dispatch ADD_TERM_REJECTED on error', function test() {
      moxios.stubRequest(termAddUrl, {
        status: 400,
        response: {},
      });

      const store = mockStore({});

      return store.dispatch(addTerm(serviceConfig, vocabularyName, displayName))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ADD_TERM_STARTED,
            meta: {
              displayName,
              authorityServiceName,
              vocabularyName,
            },
          });

          actions[1].should.have.property('type', ADD_TERM_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              displayName,
              authorityServiceName,
              vocabularyName,
            });
        });
    });
  });

  describe('findMatchingTerms', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const authorityServiceName = 'personauthorities';
    const vocabularyName = 'person';
    const partialTerm = 'abc';
    const termSearchUrl = `/cspace-services/${authorityServiceName}/urn:cspace:name(${vocabularyName})/items?pt=${partialTerm}&wf_deleted=false`;

    const serviceConfig = {
      name: 'personauthorities',
      vocabularies: {
        person: {},
        ulan_pa: {},
      },
      quickAddData: () => ({}),
    };

    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch PARTIAL_TERM_SEARCH_FULFILLED on success', function test() {
      moxios.stubRequest(termSearchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({});

      return store.dispatch(findMatchingTerms(serviceConfig, vocabularyName, partialTerm))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_STARTED,
            meta: {
              partialTerm,
              authorityServiceName,
              vocabularyName,
            },
          });

          actions[1].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              partialTerm,
              authorityServiceName,
              vocabularyName,
            },
          });
        });
    });

    it('should dispatch PARTIAL_TERM_SEARCH_REJECTED on error', function test() {
      moxios.stubRequest(termSearchUrl, {
        status: 400,
        response: {},
      });

      const store = mockStore({});

      return store.dispatch(findMatchingTerms(serviceConfig, vocabularyName, partialTerm))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_STARTED,
            meta: {
              partialTerm,
              authorityServiceName,
              vocabularyName,
            },
          });

          actions[1].should.have.property('type', PARTIAL_TERM_SEARCH_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              partialTerm,
              authorityServiceName,
              vocabularyName,
            });
        });
    });
  });

  describe('clearMatchedTerms', function actionSuite() {
    it('should create a CLEAR_PARTIAL_TERM_SEARCH_RESULTS action', function test() {
      clearMatchedTerms().should.deep.equal({
        type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
      });
    });
  });
});
