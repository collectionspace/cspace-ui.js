import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { Panel } from 'cspace-layout';

import {
  ConnectedPanel,
} from '../../../../src/containers/layout/PanelContainer';

import {
  COLLAPSE_PANEL,
} from '../../../../src/constants/actionCodes';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([]);

describe('PanelContainer', () => {
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

  it('should set props on Panel', () => {
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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        store={store}
        config={config}
        recordType={recordType}
        name={panelName}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, Panel);

    panel.type.should.equal(Panel);
    panel.props.should.have.property('collapsed', true);
    panel.props.should.have.property('header').that.is.an('object');
    panel.props.should.have.property('onToggleCollapsed').that.is.a('function');

    panel.props.onToggleCollapsed(panelName, false);

    const action = store.getActions()[0];

    action.should.have.property('type', COLLAPSE_PANEL);
    action.should.have.deep.property('meta.recordType', recordType);
    action.should.have.deep.property('meta.name', panelName);
    action.should.have.property('payload', false);
  });

  it('should set collapsed from own props if state is not present in the store', () => {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {
          [recordType]: {
            // panelName is not present
          },
        },
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        store={store}
        config={config}
        recordType={recordType}
        name={panelName}
        collapsed
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, Panel);

    panel.props.should.have.property('collapsed', true);
  });

  it('should set header content using the message descriptor keyed by panel name', () => {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        store={store}
        config={config}
        recordType={recordType}
        name={panelName}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, Panel);
    const { header } = panel.props;
    const formattedMessage = React.Children.only(header.props.children);

    formattedMessage.props.defaultMessage.should.equal('Description Information');
  });

  it('should set header content using the message descriptor keyed by msgkey prop if supplied', () => {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        store={store}
        config={config}
        recordType={recordType}
        name={panelName}
        msgkey="foo"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, Panel);
    const { header } = panel.props;
    const formattedMessage = React.Children.only(header.props.children);

    formattedMessage.props.defaultMessage.should.equal('Foo message');
  });

  it('should render no header content if no message is found', () => {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {},
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedPanel
        store={store}
        config={config}
        recordType={recordType}
        name={panelName}
        msgkey="bar"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, Panel);

    expect(panel.props.header).to.equal(null);
  });
});
