import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  PROCEDURE_BY_TAG_READ_FULFILLED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getTags,
} from '../../../src/reducers/tags';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('service tags reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  it('should do nothing if no record types are present', () => {
    const recordType = 'collectionobject';
    const serviceTag = 'test-tag';
    const tagData = {
      document: {
        'ns2:servicegroups_common': {
        },
      },
    };

    const state = reducer(undefined, {
      type: PROCEDURE_BY_TAG_READ_FULFILLED,
      payload: {
        data: tagData,
      },
      meta: {
        tag: serviceTag,
      },
    });

    state.should.deep.equal(Immutable.Map({}));
    expect(getTags(state, recordType)).to.equal(undefined);
  });

  it('should associate record types with a tag', () => {
    const recordType = 'CollectionObject';
    const recordTypeLower = recordType.toLowerCase();
    const serviceTag = 'test-tag';
    const tagData = {
      document: {
        'ns2:servicegroups_common': {
          hasDocTypes: {
            hasDocType: [
              recordType,
            ],
          },
        },
      },
    };

    const state = reducer(undefined, {
      type: PROCEDURE_BY_TAG_READ_FULFILLED,
      payload: {
        data: tagData,
      },
      meta: {
        tag: serviceTag,
      },
    });

    state.should.deep.equal(Immutable.Map({
      [recordTypeLower]: serviceTag,
    }));
    expect(getTags(state, recordTypeLower)).to.equal(serviceTag);
  });
});
