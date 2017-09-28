import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import MiniView from '../../../../src/components/record/MiniView';

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
                <TextInput name="desc" msgkey="foo" />
                <TextInput name="color" label="Color" />
                <TextInput name="bar" />
              </Panel>
            </CompoundInput>
          ),
        },
        inventory: {
          messages: {
            name: {
              id: 'form.collectionobject.inventory.name',
              defaultMessage: 'Inventory Template',
            },
          },
          template: <p>inventory template</p>,
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
          foo: {
            id: 'field.foo.label',
            defaultMessage: 'Some label',
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

  it('should wrap a RecordForm component', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            config={config}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const miniView = this.container.querySelector('.cspace-ui-MiniView--common');
    miniView.firstElementChild.className.should.equal('cspace-ui-RecordForm--common');
  });

  it('should render a mini form template by default', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            config={config}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const recordForm = this.container.querySelector('.cspace-ui-RecordForm--common');
    recordForm.firstElementChild.className.should.equal('cspace-input-CompoundInput--common');
  });

  it('should render a mini form template if conflicting form name is provided ', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            config={config}
            recordType="collectionobject"
            formName="inventory"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const recordForm = this.container.querySelector('.cspace-ui-RecordForm--common');
    recordForm.firstElementChild.className.should.equal('cspace-input-CompoundInput--common');
  });
});
