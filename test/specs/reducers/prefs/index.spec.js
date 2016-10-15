import reducer, {
  isPanelCollapsed,
} from '../../../../src/reducers/prefs';

const expect = chai.expect;

chai.should();

describe('prefs reducer', function suite() {
  it('should compose the initial states of its composed reducers', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({
      panels: {},
    });

    expect(isPanelCollapsed(state, 'object', 'panelName')).to.equal(undefined);
  });

  describe('isPanelCollapsed selector', function selectorSuite() {
    it('should select from the panels key', function test() {
      isPanelCollapsed({
        panels: {
          object: {
            panelName: true,
          },
        },
      }, 'object', 'panelName').should.equal(true);
    });
  });
});
