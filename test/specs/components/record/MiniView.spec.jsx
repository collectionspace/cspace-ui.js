import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { Row } from 'cspace-layout';

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
    person: {
      fields: {

      },
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
              <Panel name="info">
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
        panel: {
          info: {
            id: 'panel.person.info',
            defaultMessage: 'Person Information',
          },
        },
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
      },
      name: 'person',
      serviceConfig: {
        documentName: 'persons',
        objectName: 'Person',
        serviceName: 'Persons',
        servicePath: 'personauthorities',
        serviceType: 'authority',
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
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
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
          serviceConfig: {
            servicePath: 'urn:cspace:name(person_ulan)',
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
            recordType="person"
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
            recordType="person"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const recordForm = this.container.querySelector('.cspace-ui-RecordForm--common');
    recordForm.firstElementChild.className.should.equal('cspace-input-CompoundInput--common');
  });

  it('should render a mini form template if conflicting form name is provided', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            config={config}
            recordType="person"
            formName="inventory"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const recordForm = this.container.querySelector('.cspace-ui-RecordForm--common');
    recordForm.firstElementChild.className.should.equal('cspace-input-CompoundInput--common');
  });

  it('should populate fields with data', function test() {
    const data = Immutable.fromJS({
      document: {
        '@name': 'persons',
        'ns2:collectionspace_core': {
          tenantId: 1,
          uri: '/personauthorities/763d495d-5d59-4aea-88ee/items/d3c29fb3-bffa-47fa-8db3',
          updatedAt: '2017-10-03T07:52:46.311Z',
          '@xmlns:ns2': 'http://collectionspace.org/collectionspace_core/',
          '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          workflowState: 'project',
          updatedBy: 'admin@core.collectionspace.org',
          createdAt: '2017-10-03T07:52:46.311Z',
          refName:
          'urn:cspace:core.collectionspace.org:personauthorities:name(person): item:name(bob1507017166311) \'bob\'',
          createdBy: 'admin@core.collectionspace.org',
          'ns2:persons_common': {
            gender: 'female',
            rev: 0,
            schoolsOrStyles: null,
            shortIdentifier: 'bob1507017166311',
            csid: 'd3c29fb3-bffa-47fa-8db3',
            '@xmlns:ns2': 'http://collectionspace.org/services/person',
            personTermGroupList: {
              personTermGroup: {
                termDisplayName: 'bob',
                termType: 'Artist',
                termStatus: 'under review',
              },
            },
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MiniView
            data={data}
            config={config}
            recordType="person"
          />
        </StoreProvider>
      </IntlProvider>, this.container);
  });
});
