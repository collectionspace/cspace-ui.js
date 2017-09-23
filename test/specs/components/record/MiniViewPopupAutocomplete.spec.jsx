import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import MiniViewPopupAutocomplete from '../../../../src/components/record/MiniViewPopupAutocomplete';

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
        default: {
          messages: {
            name: {
              id: 'form.collectionobject.default.name'
            },
          },
        },
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

const recordTypes = {
  person: {
    vocabularies: {
      local: {
        messages: {
          name: {
            id: 'vocab.person.local.name',
            defaultMessage: 'Local',
          },
          collectionName: {
            id: 'vocab.person.local.collectionName',
            defaultMessage: 'Local Persons',
          },
        },
      },
      ulan: {
        messages: {
          name: {
            id: 'vocab.person.ulan.name',
            defaultMessage: 'ULAN',
          },
          collectionName: {
            id: 'vocab.person.ulan.collectionName',
            defaultMessage: 'ULAN Persons',
          },
        },
      },
    },
  },
}

const janMatches = Immutable.Map().setIn(['jan', 'person', 'local', 'items'], [
  {
    refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe)\'Jane Doe\'',
    uri: '/personauthorities/fbe3019a-f8d4-4f84-a900/items/7fc7c8ca-8ca0-4a29-8e2e',
  },
]);

describe('MiniViewPopupAutocomplete', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div', function test() {
    const value = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe)\'Jane Doe\'';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniViewPopupAutocomplete
            source={'person/local,person/ulan'}
            config={config}
            recordType='collectionobject'
            value={value}
            recordTypes={recordTypes}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    // this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});