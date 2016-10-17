import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import Panel from '../../../../src/components/layout/Panel';

import RecordTypeAwarePanelContainer, {
  PanelContainer,
} from '../../../../src/containers/layout/PanelContainer';

import {
  COLLAPSE_PANEL,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([]);

describe('PanelContainer', function suite() {
  it('should set props on Panel', function test() {
    const recordType = 'object';
    const panelName = 'descPanel';

    const store = mockStore({
      prefs: {
        panels: {
          [recordType]: {
            [panelName]: true,
          },
        },
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PanelContainer
        recordType={recordType}
        name={panelName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Panel);
    result.props.should.have.property('collapsed', true);
    result.props.should.have.property('onToggleCollapsed').that.is.a('function');

    result.props.onToggleCollapsed(panelName, false);

    const action = store.getActions()[0];

    action.should.have.property('type', COLLAPSE_PANEL);
    action.should.have.deep.property('meta.recordType', recordType);
    action.should.have.deep.property('meta.name', panelName);
    action.should.have.property('payload', false);
  });

  it('should set collapsed from own props if state is not present in the store', function test() {
    const recordType = 'object';
    const panelName = 'descPanel';

    const store = mockStore({
      prefs: {
        panels: {
          [recordType]: {
            // panelName is not present
          },
        },
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PanelContainer
        recordType={recordType}
        name={panelName}
        collapsed
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('collapsed', true);
  });
});

describe('RecordTypeAwarePanelContainer', function suite() {
  it('should set recordType prop on the base component from context', function test() {
    const recordType = 'object';
    const context = { recordType };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordTypeAwarePanelContainer
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('recordType', recordType);
  });
});
