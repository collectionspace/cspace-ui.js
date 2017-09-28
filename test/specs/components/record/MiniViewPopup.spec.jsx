import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import MiniViewPopup from '../../../../src/components/record/MiniViewPopup';

chai.should();

const {
  CompoundInput,
  TextInput,
} = inputComponents;

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map(),
  record: Immutable.Map(),
});

const config = {
  recordTypes: {
    collectionobject: {
      forms: {
        mini: {
          messages: {
            name: {
              id: 'form.collectionobject.mini.name',
              defaultMessage: 'Mini Template',
            },
          },
          template: (
            <CompoundInput>
              <Panel name="id">
                <TextInput name="objectNumber" />
              </Panel>
            </CompoundInput>
          ),
        },
      },
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Object',
          },
        },
        panel: {
          id: {
            id: 'panel.id.label',
            defaultMessage: 'Object Identification Information',
          },
        },
        field: {
          objectNumber: {
            id: 'field.objectNumber.label',
            defaultMessage: 'Identification number',
          },
        },
      },
    },
  },
};

describe('MiniView', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should wrap a Popup which wraps a MiniView', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniViewPopup
            config={config}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-layout-Popup--common').should.not.equal(null);
    this.container.querySelector('.cspace-ui-MiniView--common').should.not.equal(null);
  });
});
