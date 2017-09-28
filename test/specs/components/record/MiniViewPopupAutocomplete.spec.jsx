import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputcomponents } from 'cspace-input';
import { Row } from 'cspace-layout';
import Panel from '../../../../src/containers/layout/PanelContainer';
import createTestContainer from '../../../helpers/createTestContainer';
import MiniViewPopupAutocomplete from '../../../../src/components/record/MiniViewPopupAutocomplete';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map(),
  record: Immutable.Map(),
});

const {
  CompoundInput,
  TextInput,
} = inputcomponents;

const config = {
  recordTypes: {
    person: {
      forms: {
        mini: {
          messages: {
            name: {
              id: 'form.person.mini.name',
              defaultMessage: 'Mini Template',
            },
          },
          template: (
            <CompoundInput>
              <Panel name="info" collapsible>
                <CompoundInput name="personTermGroupList">
                  <CompoundInput name="personTermGroup">
                    <Panel>
                      <Row>
                        <TextInput name="termDisplayName" label="Term display name" />
                        <TextInput name="termType" label="Person term type" />
                      </Row>
                    </Panel>
                  </CompoundInput>
                </CompoundInput>
              </Panel>
            </CompoundInput>
          ),
        },
      },
      messages: {
        record: {
          name: {
            id: 'record.person.name',
            description: 'The name of the record type.',
            defaultMessage: 'Person',
          },
          collectionName: {
            id: 'record.person.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Persons',
          },
        },
        panel: {
          info: {
            id: 'panel.person.info',
            defaultMessage: 'Person Information',
          },
        },
      },
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
      fields: {
        personTermGroupList: {
          config: {
            messages: {
              name: {
                id: 'field.person.personTermGroupList.name',
                defaultMessage: 'Term',
              },
            },
          },
          personTermGroup: {
            config: {
              repeating: true,
            },
            termDisplayName: {
              config: {
                messages: {
                  name: {
                    id: 'field.person.termDisplayName.name',
                    defaultMessage: 'Display name',
                  },
                },
                required: true,
              },
            },
            termType: {
              config: {
                messages: {
                  name: {
                    id: 'field.person.termType.name',
                    defaultMessage: 'Type',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

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
            recordType="person"
            value={value}
            recordTypes={config.recordTypes}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should not render a MiniViewPopup if there is no value', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniViewPopupAutocomplete
            source={'person/local,person/ulan'}
            config={config}
            recordType="person"
            recordTypes={config.recordTypes}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const miniViewPopupAutoComplete = this.container.querySelector('.cspace-ui-MiniViewPopupAutocomplete--common');

    Simulate.mouseEnter(miniViewPopupAutoComplete);

    const miniViewPopup = this.container.querySelector('.cspace-ui-MiniViewPopup--common');

    expect(miniViewPopup).to.equal(null);
  });
});
