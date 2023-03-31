import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

import Field from '../../../../src/components/record/Field';
import Panel from '../../../../src/containers/layout/PanelContainer';
import RecordForm from '../../../../src/components/record/RecordForm';

const { expect } = chai;

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
      fields: {
        document: {
          barList: {
            '[config]': {
              view: {
                type: CompoundInput,
              },
            },
            bar: {
              '[config]': {
                repeating: true,
                view: {
                  type: TextInput,
                },
              },
            },
          },
          bazGroupList: {
            '[config]': {
              view: {
                type: CompoundInput,
              },
            },
            bazGroup: {
              '[config]': {
                repeating: true,
                view: {
                  type: CompoundInput,
                  props: {
                    tabular: true,
                    sortableFields: {
                      baz: true,
                    },
                  },
                },
              },
              baz: {
                '[config]': {
                  messages: {
                    name: {
                      id: 'baz.name',
                      defaultMessage: 'Baz',
                    },
                  },
                  view: {
                    type: TextInput,
                  },
                },
              },
            },
          },
        },
      },
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.collectionobject.default.name',
              defaultMessage: 'Default Template',
            },
          },
          template: (
            <CompoundInput>
              <Panel name="id">
                <TextInput name="objectNumber" />
                <TextInput name="desc" msgkey="foo" />
                <TextInput name="color" label="Color" />

                <Field name="barList">
                  <Field name="bar" />
                </Field>

                <Field name="bazGroupList">
                  <Field name="bazGroup">
                    <Field name="baz" />
                  </Field>
                </Field>
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
        computed: {
          template: (data) => data.getIn(['foo', 'bar']),
        },
        computed2: {
          template: () => <div id="computedFormTemplate">Computed form template content</div>,
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

describe('RecordForm', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing for an unknown record type', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            recordType="foo"
            recordTypeConfig={config.recordTypes.foo}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the specified form template', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            formName="inventory"
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('p').textContent.should.equal('inventory template');
  });

  it('should resolve a computed form template', function test() {
    const data = Immutable.fromJS({
      foo: {
        bar: 'inventory',
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            data={data}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            formName="computed"
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('p').textContent.should.equal('inventory template');
  });

  it('should render nothing if a computed form returns no form name', function test() {
    const data = Immutable.fromJS({
      foo: {
        bar: undefined,
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            data={data}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            formName="computed"
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the element if a computed form returns a React element', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            formName="computed2"
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('#computedFormTemplate').textContent.should.equal('Computed form template content');
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
          <RecordForm
            config={config}
            data={data}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('input[data-name="objectNumber"]').value.should.equal(objectNumber);
  });

  it('should supply recordTypeConfig and csid parameters to onCommit function', function test() {
    const csid = 'abcd';

    let calledRecordTypeConfig = null;
    let calledCsid = null;
    let calledPath = null;
    let calledValue = null;

    const handleCommit = (recordTypeConfigArg, csidArg, pathArg, valueArg) => {
      calledRecordTypeConfig = recordTypeConfigArg;
      calledCsid = csidArg;
      calledPath = pathArg;
      calledValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            csid={csid}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            onCommit={handleCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const field = this.container.querySelector('input[data-name="objectNumber"]');

    field.value = '1-1234';

    Simulate.blur(field);

    calledRecordTypeConfig.should.equal(config.recordTypes.collectionobject);
    calledCsid.should.equal(csid);
    calledPath.should.deep.equal(['document', 'objectNumber']);
    calledValue.should.equal('1-1234');
  });

  it('should supply recordTypeConfig and csid parameters to onAddInstance function', function test() {
    const csid = 'abcd';

    let calledRecordTypeConfig = null;
    let calledCsid = null;
    let calledPath = null;
    let calledPosition = null;

    const handleAddInstance = (recordTypeConfigArg, csidArg, pathArg, positionArg) => {
      calledRecordTypeConfig = recordTypeConfigArg;
      calledCsid = csidArg;
      calledPath = pathArg;
      calledPosition = positionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            csid={csid}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            onAddInstance={handleAddInstance}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[data-name="add"]');

    Simulate.click(button);

    calledRecordTypeConfig.should.equal(config.recordTypes.collectionobject);
    calledCsid.should.equal(csid);
    calledPath.should.deep.equal(['document', 'barList', 'bar']);
    expect(calledPosition).to.equal(undefined);
  });

  it('should supply recordTypeConfig and csid parameters to onMoveInstance function', function test() {
    const csid = 'abcd';

    let calledRecordTypeConfig = null;
    let calledCsid = null;
    let calledPath = null;
    let calledNewPosition = null;

    const handleMoveInstance = (recordTypeConfigArg, csidArg, pathArg, newPositionArg) => {
      calledRecordTypeConfig = recordTypeConfigArg;
      calledCsid = csidArg;
      calledPath = pathArg;
      calledNewPosition = newPositionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            csid={csid}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            onMoveInstance={handleMoveInstance}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[data-name="moveToTop"]');

    Simulate.click(button);

    calledRecordTypeConfig.should.equal(config.recordTypes.collectionobject);
    calledCsid.should.equal(csid);
    calledPath.should.deep.equal(['document', 'barList', 'bar', '0']);
    calledNewPosition.should.equal(0);
  });

  it('should supply recordTypeConfig and csid parameters to onRemoveInstance function', function test() {
    const csid = 'abcd';

    const data = Immutable.fromJS({
      document: {
        barList: {
          bar: ['a', 'b'],
        },
      },
    });

    let calledRecordTypeConfig = null;
    let calledCsid = null;
    let calledPath = null;

    const handleRemoveInstance = (recordTypeConfigArg, csidArg, pathArg) => {
      calledRecordTypeConfig = recordTypeConfigArg;
      calledCsid = csidArg;
      calledPath = pathArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            csid={csid}
            data={data}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            onRemoveInstance={handleRemoveInstance}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[data-name="remove"]');

    Simulate.click(button);

    calledRecordTypeConfig.should.equal(config.recordTypes.collectionobject);
    calledCsid.should.equal(csid);
    calledPath.should.deep.equal(['document', 'barList', 'bar', '0']);
  });

  it('should supply config, recordTypeConfig, and csid parameters to onSortInstances function', function test() {
    const csid = 'abcd';

    let calledConfig = null;
    let calledRecordTypeConfig = null;
    let calledCsid = null;
    let calledPath = null;
    let calledByField = null;

    const handleSortInstances = (configArg, recordTypeConfigArg, csidArg, pathArg, byFieldArg) => {
      calledConfig = configArg;
      calledRecordTypeConfig = recordTypeConfigArg;
      calledCsid = csidArg;
      calledPath = pathArg;
      calledByField = byFieldArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordForm
            config={config}
            csid={csid}
            recordType="collectionobject"
            recordTypeConfig={config.recordTypes.collectionobject}
            onSortInstances={handleSortInstances}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[data-name="baz"]');

    Simulate.click(button);

    calledConfig.should.equal(config);
    calledRecordTypeConfig.should.equal(config.recordTypes.collectionobject);
    calledCsid.should.equal(csid);
    calledPath.should.deep.equal(['document', 'bazGroupList', 'bazGroup']);
    calledByField.should.equal('baz');
  });
});
