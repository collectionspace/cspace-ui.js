import {
  COLLAPSE_PANEL,
} from '../../../../src/actions/prefs';

import reducer, {
  isCollapsed,
} from '../../../../src/reducers/prefs/panels';

const expect = chai.expect;

chai.should();

describe('panels reducer', function suite() {
  it('should have empty initial state', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({});

    expect(isCollapsed(state, 'object', 'panelName')).to.equal(undefined);
  });

  it('should return undefined on isPanelCollapsed calls before initialization', function test() {
    expect(isCollapsed(null, 'object', 'panelName')).to.equal(undefined);
    expect(isCollapsed({}, 'object', 'panelName')).to.equal(undefined);
  });

  it('should handle COLLAPSE_PANEL', function test() {
    const recordType = 'object';
    const panelName = 'descPanel';
    const collapsed = true;

    const state = reducer({}, {
      type: COLLAPSE_PANEL,
      payload: collapsed,
      meta: {
        recordType,
        name: panelName,
      },
    });

    state.should.deep.equal({
      object: {
        descPanel: collapsed,
      },
    });

    isCollapsed(state, recordType, panelName).should.equal(collapsed);
  });
});
