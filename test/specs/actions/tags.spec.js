import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chaiAsPromised from 'chai-as-promised';
import { setupWorker, rest } from 'msw';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import readServiceTags from '../../../src/actions/tags';
import {
  PROCEDURE_BY_TAG_READ_FULFILLED,
  PROCEDURE_BY_TAG_READ_REJECTED,
  PROCEDURE_BY_TAG_READ_STARTED,
  SERVICE_TAGS_READ_FULFILLED,
  SERVICE_TAGS_READ_REJECTED,
  SERVICE_TAGS_READ_STARTED,
} from '../../../src/constants/actionCodes';

chai.use(chaiAsPromised);
chai.should();

const mockStore = configureMockStore([thunk]);
const successTag = 'test-tag';
const failureTag = 'failure-tag';

describe('tags action creator', () => {
  const worker = setupWorker();
  const procedureUrl = '/cspace-services/servicegroups/procedure';
  const procedureTagsUrl = '/cspace-services/servicegroups/procedure/tags';

  before(async () => {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('success', () => {
    const store = mockStore();

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('reads tags and procedures when successful', () => {
      worker.use(
        rest.get(procedureTagsUrl, (req, res, ctx) => res(ctx.json({
          'ns2:abstract-common-list': {
            'list-item': [{ name: successTag }],
          },
        }))),

        rest.get(procedureUrl, (req, res, ctx) => res(ctx.json({
        }))),
      );

      return store.dispatch(readServiceTags())
        .then(() => {
          const actions = store.getActions();

          const tagReadIdx = actions.findIndex((el) => el.type === SERVICE_TAGS_READ_STARTED);
          const tagFulfilledIdx = actions.findIndex(
            (el) => el.type === SERVICE_TAGS_READ_FULFILLED,
          );
          const procedureReadIdx = actions.findIndex(
            (el) => el.type === PROCEDURE_BY_TAG_READ_STARTED,
          );
          const procedureFulfilledIdx = actions.findIndex(
            (el) => el.type === PROCEDURE_BY_TAG_READ_FULFILLED,
          );

          [tagReadIdx, tagFulfilledIdx, procedureReadIdx, procedureFulfilledIdx]
            .should.not.include(-1);

          const procedureRead = actions[procedureReadIdx];
          const procedureFulfilled = actions[procedureFulfilledIdx];

          procedureRead.meta.should.contain({ tag: successTag });
          procedureFulfilled.meta.should.contain({ tag: successTag });
          procedureFulfilled.payload.status.should.equal(200);
        });
    });

    it('resolves early when no tags are found', () => {
      worker.use(
        rest.get(procedureTagsUrl, (req, res, ctx) => res(ctx.json({
          'ns2:abstract-common-list': {
          },
        }))),
      );

      return store.dispatch(readServiceTags())
        .then(() => {
          const actions = store.getActions();

          const tagReadIdx = actions.findIndex((el) => el.type === SERVICE_TAGS_READ_STARTED);
          const tagFulfilledIdx = actions.findIndex(
            (el) => el.type === SERVICE_TAGS_READ_FULFILLED,
          );
          const procedureReadIdx = actions.findIndex(
            (el) => el.type === PROCEDURE_BY_TAG_READ_STARTED,
          );

          [tagReadIdx, tagFulfilledIdx]
            .should.not.include(-1);

          procedureReadIdx.should.equal(-1);
        });
    });
  });

  describe('failure', () => {
    const store = mockStore();

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should not query procedures when the service tag read fails', () => {
      worker.use(
        rest.get(procedureTagsUrl, (req, res, ctx) => res(
          ctx.status(403),
          ctx.json({ message: 'forbidden' }),
        )),
      );

      return store.dispatch(readServiceTags()).should.eventually.be.rejected
        .then(() => {
          const actions = store.getActions();

          const tagReadIdx = actions.findIndex((el) => el.type === SERVICE_TAGS_READ_STARTED);
          const tagRejectedIdx = actions.findIndex(
            (el) => el.type === SERVICE_TAGS_READ_REJECTED,
          );
          const tagFulfilledIdx = actions.findIndex(
            (el) => el.type === SERVICE_TAGS_READ_FULFILLED,
          );

          [tagReadIdx, tagRejectedIdx].should.not.include(-1, 'Expected service reads to exist in actions');
          tagFulfilledIdx.should.equal(-1, 'Did not expect fulfilled to exist');
        });
    });

    it('should reject if one procedure read fails', () => {
      worker.use(
        rest.get(procedureTagsUrl, (req, res, ctx) => res(ctx.json({
          'ns2:abstract-common-list': {
            'list-item': [{ name: successTag }, { name: failureTag }],
          },
        }))),

        rest.get(procedureUrl, (req, res, ctx) => {
          const tag = req.url.searchParams.get('servicetag');

          if (tag === failureTag) {
            return res(ctx.status(400));
          }

          return res(ctx.json({}));
        }),
      );

      return store.dispatch(readServiceTags()).should.eventually.be.rejected
        .then(() => {
          const actions = store.getActions();

          const tagReadIdx = actions.findIndex((el) => el.type === SERVICE_TAGS_READ_STARTED);
          const tagFulfilledIdx = actions.findIndex(
            (el) => el.type === SERVICE_TAGS_READ_FULFILLED,
          );
          const procedureReadIdx = actions.findIndex(
            (el) => el.type === PROCEDURE_BY_TAG_READ_STARTED,
          );
          const procedureRejectedIdx = actions.findIndex(
            (el) => el.type === PROCEDURE_BY_TAG_READ_REJECTED,
          );

          [tagReadIdx, tagFulfilledIdx, procedureReadIdx, procedureRejectedIdx]
            .should.not.include(-1);

          const rejected = actions[procedureRejectedIdx];
          rejected.meta.should.contain({ tag: failureTag });
        });
    });
  });
});
