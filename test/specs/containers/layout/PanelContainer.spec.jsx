import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import { Panel } from 'cspace-layout';

import {
  ConnectedPanel,
} from '../../../../src/containers/layout/PanelContainer';

import {
  COLLAPSE_PANEL,
} from '../../../../src/actions/prefs';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([]);

describe('PanelContainer', function suite() {
  const recordType = 'object';
  const panelName = 'desc';

  const config = {
    recordTypes: {
      [recordType]: {
        messages: {
          panel: {
            [panelName]: {
              id: 'panel.header',
              defaultMessage: 'Description Information',
            },
            foo: {
              id: 'panel.foo',
              defaultMessage: 'Foo message',
            },
          },
        },
      },
    },
  };

  it('should set props on Panel', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {
          [recordType]: {
            [panelName]: {
              collapsed: true,
            },
          },
        },
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        config={config}
        recordType={recordType}
        name={panelName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Panel);
    result.props.should.have.property('collapsed', true);
    result.props.should.have.property('header').that.is.an('object');
    result.props.should.have.property('onToggleCollapsed').that.is.a('function');

    result.props.onToggleCollapsed(panelName, false);

    const action = store.getActions()[0];

    action.should.have.property('type', COLLAPSE_PANEL);
    action.should.have.deep.property('meta.recordType', recordType);
    action.should.have.deep.property('meta.name', panelName);
    action.should.have.property('payload', false);
  });

  it('should set collapsed from own props if state is not present in the store', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {
          [recordType]: {
            // panelName is not present
          },
        },
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        config={config}
        recordType={recordType}
        name={panelName}
        collapsed
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('collapsed', true);
  });

  it('should set header content using the message descriptor keyed by panel name', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        config={config}
        recordType={recordType}
        name={panelName}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const header = result.props.header;
    const formattedMessage = React.Children.only(header.props.children);

    formattedMessage.props.defaultMessage.should.equal('Description Information');
  });

  it('should set header content using the message descriptor keyed by msgkey prop if supplied', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        config={config}
        recordType={recordType}
        name={panelName}
        msgkey="foo"
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const header = result.props.header;
    const formattedMessage = React.Children.only(header.props.children);

    formattedMessage.props.defaultMessage.should.equal('Foo message');
  });

  it('should render no header content if no message is found', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        config={config}
        recordType={recordType}
        name={panelName}
        msgkey="bar"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.header).to.equal(null);
  });
});
