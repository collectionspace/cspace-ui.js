import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  AUTH_VOCABS_READ_FULFILLED,
  SET_AUTH_VOCAB_WORKFLOW_STATE,
  LOGOUT_FULFILLED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getVocabCsid,
  getVocabWorkflowState,
} from '../../../src/reducers/authority';

chai.use(chaiImmutable);
chai.should();

describe('authority reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.deep.equal(Immutable.Map());
  });

  context('on AUTH_VOCABS_READ_FULFILLED', () => {
    const config = {
      recordTypes: {
        place: {
          name: 'place',
          serviceConfig: {
            servicePath: 'placeauthorities',
          },
          vocabularies: {
            local: {
              name: 'local',
              serviceConfig: {
                servicePath: 'urn:cspace:name(place)',
              },
            },
            tgn: {
              name: 'tgn',
              serviceConfig: {
                servicePath: 'urn:cspace:name(tgn_place)',
              },
            },
          },
        },
        work: {
          name: 'work',
          serviceConfig: {
            servicePath: 'workauthorities',
          },
          vocabularies: {
            cona: {
              name: 'cona',
              serviceConfig: {
                servicePath: 'urn:cspace:name(cona_work)',
              },
            },
          },
        },
      },
    };

    const responses = [
      {
        data: {
          'ns2:abstract-common-list': {
            'list-item': [
              {
                csid: '4d17f904-eaf1-464b-9597',
                uri: '/placeauthorities/4d17f904-eaf1-464b-9597',
                workflowState: 'project',
                shortIdentifier: 'place',
              },
              {
                csid: 'e9619db2-a7f0-42ef-a8e0',
                uri: '/placeauthorities/e9619db2-a7f0-42ef-a8e0',
                workflowState: 'locked',
                shortIdentifier: 'tgn_place',
              },
            ],
          },
        },
      },
      {
        data: {
          'ns2:abstract-common-list': {
            'list-item': {
              csid: '7346b0ea-e6b4-4da4-99db',
              uri: '/workauthorities/7346b0ea-e6b4-4da4-99db',
              workflowState: 'project',
              shortIdentifier: 'cona_work',
            },
          },
        },
      },
    ];

    it('should set the csid and workflowState for each vocabulary in the payload', () => {
      const state = reducer(undefined, {
        type: AUTH_VOCABS_READ_FULFILLED,
        payload: responses,
        meta: {
          config,
        },
      });

      state.should.deep.equal(Immutable.fromJS({
        place: {
          local: {
            csid: '4d17f904-eaf1-464b-9597',
            workflowState: 'project',
          },
          tgn: {
            csid: 'e9619db2-a7f0-42ef-a8e0',
            workflowState: 'locked',
          },
        },
        work: {
          cona: {
            csid: '7346b0ea-e6b4-4da4-99db',
            workflowState: 'project',
          },
        },
      }));

      getVocabCsid(state, 'place', 'tgn').should.equal('e9619db2-a7f0-42ef-a8e0');
      getVocabWorkflowState(state, 'place', 'tgn').should.equal('locked');
    });

    it('should do nothing if a response contains no items', () => {
      const state = reducer(undefined, {
        type: AUTH_VOCABS_READ_FULFILLED,
        payload: [{}],
        meta: {
          config,
        },
      });

      state.should.equal(Immutable.Map());
    });
  });

  context('on LOGOUT_FULFILLED', () => {
    it('should clear all state', () => {
      const state = reducer(Immutable.fromJS({
        person: {
          local: {
            csid: '1234',
            workflowState: 'project',
          },
        },
      }), {
        type: LOGOUT_FULFILLED,
      });

      state.should.equal(Immutable.Map());
    });
  });

  context('on SET_AUTH_VOCAB_WORKFLOW_STATE', () => {
    it('should set the workflow state for the given vocabulary', () => {
      const state = reducer(Immutable.fromJS({
        person: {
          local: {
            csid: '1234',
            workflowState: 'project',
          },
        },
      }), {
        type: SET_AUTH_VOCAB_WORKFLOW_STATE,
        payload: 'locked',
        meta: {
          recordType: 'person',
          vocabulary: 'local',
        },
      });

      state.should.equal(Immutable.fromJS({
        person: {
          local: {
            csid: '1234',
            workflowState: 'locked',
          },
        },
      }));
    });
  });
});
