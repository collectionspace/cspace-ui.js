import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { setupWorker, rest } from 'msw';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  parseDisplayDate,
} from '../../../src/actions/structuredDate';

chai.use(chaiImmutable);
chai.should();

describe('structured date action creator', () => {
  const worker = setupWorker();

  before(async () => {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('parseDisplayDate', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    const parseStructuredDateUrl = '/cspace-services/structureddates';

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should resolve to an object containing a parsed structured date value', () => {
      const dateToParse = '2000';

      worker.use(
        rest.get(parseStructuredDateUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('dateToParse') === dateToParse
          ) {
            return res(ctx.json({
              'ns2:structureddate_common': {
                displayDate: '2000',
                earliestSingleDate: {
                  year: '2000',
                  month: '1',
                  day: '1',
                  era: 'urn:cspace:core.collectionspace.org:vocabularies:name(dateera):item:name(ce)\'CE\'',
                },
                latestDate: {
                  year: '2000',
                  month: '12',
                  day: '31',
                  era: 'urn:cspace:core.collectionspace.org:vocabularies:name(dateera):item:name(ce)\'CE\'',
                },
                scalarValuesComputed: 'false',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(parseDisplayDate('2000'))
        .then((result) => {
          result.should.have.property('value').that.equals(Immutable.Map({
            dateDisplayDate: '2000',
            dateEarliestSingleYear: '2000',
            dateEarliestSingleMonth: '1',
            dateEarliestSingleDay: '1',
            dateEarliestSingleEra: 'urn:cspace:core.collectionspace.org:vocabularies:name(dateera):item:name(ce)\'CE\'',
            dateEarliestSingleCertainty: null,
            dateEarliestSingleQualifier: null,
            dateEarliestSingleQualifierUnit: null,
            dateEarliestSingleQualifierValue: null,
            dateLatestYear: '2000',
            dateLatestMonth: '12',
            dateLatestDay: '31',
            dateLatestEra: 'urn:cspace:core.collectionspace.org:vocabularies:name(dateera):item:name(ce)\'CE\'',
            dateLatestCertainty: null,
            dateLatestQualifier: null,
            dateLatestQualifierUnit: null,
            dateLatestQualifierValue: null,
            scalarValuesComputed: 'false',
          }));
        });
    });

    it('should resolve to an object with isError set to true when the display date is not parseable', () => {
      worker.use(
        rest.get(parseStructuredDateUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(parseDisplayDate('dsailjdfi'))
        .then((result) => {
          result.should.have.property('isError').that.equals(true);
        });
    });

    it('should resolve to a structured date with all fields set to null when the display date is blank', () => (
      store.dispatch(parseDisplayDate(''))
        .then((result) => {
          result.should.have.property('value').that.equals(Immutable.Map({
            dateDisplayDate: null,
            dateEarliestSingleYear: null,
            dateEarliestSingleMonth: null,
            dateEarliestSingleDay: null,
            dateEarliestSingleEra: null,
            dateEarliestSingleCertainty: null,
            dateEarliestSingleQualifier: null,
            dateEarliestSingleQualifierUnit: null,
            dateEarliestSingleQualifierValue: null,
            dateLatestYear: null,
            dateLatestMonth: null,
            dateLatestDay: null,
            dateLatestEra: null,
            dateLatestCertainty: null,
            dateLatestQualifier: null,
            dateLatestQualifierUnit: null,
            dateLatestQualifierValue: null,
            scalarValuesComputed: null,
          }));
        })
    ));
  });
});
