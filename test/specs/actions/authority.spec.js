import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  AUTH_VOCABS_READ_STARTED,
  AUTH_VOCABS_READ_FULFILLED,
  AUTH_VOCABS_READ_REJECTED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  checkForUses,
  readAuthVocabs,
} from '../../../src/actions/authority';

const mockStore = configureMockStore([thunk]);

describe('authority action creator', () => {
  describe('readAuthVocabs', () => {
    const store = mockStore({
      authority: Immutable.Map(),
      // user: Immutable.Map(),
    });

    const config = {
      recordTypes: {
        group: {
          serviceConfig: {
            serviceType: 'procedure',
          },
        },
        person: {
          serviceConfig: {
            servicePath: 'personauthorities',
            serviceType: 'authority',
          },
        },
        organization: {
          serviceConfig: {
            servicePath: 'orgauthorities',
            serviceType: 'authority',
          },
        },
      },
    };

    const readAuthorityUrl = /^\/cspace-services\/.*authorities?/;

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should dispatch AUTH_VOCABS_READ_FULFILLED on success', () => {
      moxios.stubRequest(readAuthorityUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(readAuthVocabs(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.deep.equal({
            type: AUTH_VOCABS_READ_FULFILLED,
            payload: [
              {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
            ],
            meta: {
              config,
            },
          });
        });
    });

    it('should dispatch AUTH_VOCABS_READ_FULFILLED if there are errors, but they are all 403', () => {
      moxios.stubRequest(readAuthorityUrl, {
        status: 403,
        response: {},
      });

      return store.dispatch(readAuthVocabs(config))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.contain({
            type: AUTH_VOCABS_READ_FULFILLED,
          });
        });
    });

    it('should dispatch AUTH_VOCABS_READ_REJECTED on errors other than 403', () => {
      moxios.stubRequest(readAuthorityUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(readAuthVocabs(config))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.contain({
            type: AUTH_VOCABS_READ_REJECTED,
          });
        });
    });
  });

  describe('checkForUses', () => {
    const recordType = 'person';
    const recordTypeServicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const csid = '1234';
    const checkUrl = `/cspace-services/${recordTypeServicePath}/${vocabularyServicePath}/items/${csid}/refObjs?wf_deleted=false&pgSz=1`;

    const config = {
      recordTypes: {
        [recordType]: {
          serviceConfig: {
            servicePath: recordTypeServicePath,
          },
          vocabularies: {
            [vocabulary]: {
              serviceConfig: {
                servicePath: vocabularyServicePath,
              },
            },
          },
        },
      },
    };

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

    it('should resolve to true if uses are found for the given authority item', () => {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'ns3:authority-ref-doc-list': {
            totalItems: '2',
          },
        },
      });

      return store.dispatch(checkForUses(config, recordType, vocabulary, csid)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no uses are found for the authority item', () => {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'ns3:authority-ref-doc-list': {
            totalItems: '0',
          },
        },
      });

      return store.dispatch(checkForUses(config, recordType, vocabulary, csid)).then((result) => {
        result.should.equal(false);
      });
    });
  });
});
