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

const expect = chai.expect;

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
        photo: {
          messages: {
            name: {
              id: 'form.collectionobject.photo.name',
              defaultMessage: 'Photo Template',
            },
          },
          template: <p>photo template</p>,
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

  it('should render a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView config={config} recordType="collectionobject" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing for an unknown record type', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView config={config} recordType="foo" />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the specified form template', function test() {
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

    this.container.querySelector('p').textContent.should.equal('inventory template');
  });

  it('should render the data into the form template', function test() {
    const objectNumber = '1-421';

    const data = Immutable.fromJS({
      document: {
        objectNumber,
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            config={config}
            data={data}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('input[name="objectNumber"]').value.should.equal(objectNumber);
  });
});