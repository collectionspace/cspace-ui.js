import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  ADD_ID_GENERATORS,
  READ_ID_GENERATOR_FULFILLED,
} from '../../../src/actions/idGenerator';

import reducer, {
  get,
} from '../../../src/reducers/idGenerator';

chai.use(chaiImmutable);
chai.should();

describe('ID generator reducer', function suite() {
  it('should have empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle ADD_ID_GENERATORS', function test() {
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
      loanin: {
        csid: 'ed87e7c6-0678-4f42-9d33-f671835586ef',
        messages: {
          type: {
            id: 'idGenerator.loanin.type',
            defaultMessage: 'Loan In',
          },
        },
      },
    };

    const state = reducer(Immutable.Map(), {
      type: ADD_ID_GENERATORS,
      payload: idGenerators,
    });

    state.should.deep.equal(Immutable.fromJS(idGenerators));

    get(state, 'accession').should.deep.equal(Immutable.fromJS(idGenerators.accession));
    get(state, 'loanin').should.deep.equal(Immutable.fromJS(idGenerators.loanin));

    const moreIdGenerators = {
      intake: {
        csid: '8088cfa5-c743-4824-bb4d-fb11b12847f7',
        messages: {
          type: {
            id: 'idGenerator.intake.type',
            defaultMessage: 'Intake',
          },
        },
      },
    };

    const newState = reducer(state, {
      type: ADD_ID_GENERATORS,
      payload: moreIdGenerators,
    });

    get(newState, 'accession').should.deep.equal(Immutable.fromJS(idGenerators.accession));
    get(newState, 'loanin').should.deep.equal(Immutable.fromJS(idGenerators.loanin));
    get(newState, 'intake').should.deep.equal(Immutable.fromJS(moreIdGenerators.intake));
  });

  it('should handle READ_ID_GENERATOR_FULFILLED', function test() {
    const initialState = Immutable.fromJS({
      accession: {
        csid: '9dd92952-c384-44dc-a736-95e435c1759c',
        messages: {
          type: {
            id: 'idGenerator.accession.type',
            defaultMessage: 'Accession',
          },
        },
      },
      loanin: {
        csid: 'ed87e7c6-0678-4f42-9d33-f671835586ef',
        messages: {
          type: {
            id: 'idGenerator.loanin.type',
            defaultMessage: 'Loan In',
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: READ_ID_GENERATOR_FULFILLED,
      payload: {
        data: {
          idgenerator: {
            displayid: '2016.1.23',
          },
        },
      },
      meta: {
        idGeneratorName: 'accession',
      },
    });

    state.should.deep.equal(initialState.setIn(['accession', 'sample'], '2016.1.23'));
  });
});
