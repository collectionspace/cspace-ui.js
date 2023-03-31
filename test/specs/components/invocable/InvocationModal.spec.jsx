/* global window, document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import Modal from 'cspace-layout/lib/components/Modal';
import asyncQuerySelector from '../../../helpers/asyncQuerySelector';
import InvocationModal from '../../../../src/components/invocable/InvocationModal';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  searchToSelect: Immutable.Map(),
  optionList: Immutable.Map({
    reportMimeTypes: [
      {
        value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        message: {
          id: 'option.message.1',
          defaultMessage: 'MS Word (.docx)',
        },
      },
      {
        value: 'text/csv',
        message: {
          id: 'option.message.2',
          defaultMessage: 'CSV',
        },
      },
    ],
  }),
  prefs: Immutable.Map(),
  record: Immutable.Map(),
  search: Immutable.Map(),
  user: Immutable.Map(),
});

const csid = '1234';

const reportData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      uri: `/reports/${csid}`,
    },
    'ns2:reports_common': {
      name: 'Test Report',
      supportsNoContext: 'true',
      supportsSingleDoc: 'true',
      outputMIME: 'text/csv',
    },
  },
});

const config = {
  recordTypes: {
    collectionobject: {
      name: 'collectionobject',
      columns: {
        default: {
          objectNumber: {
            order: 10,
          },
          title: {
            order: 20,
          },
        },
      },
      serviceConfig: {
        servicePath: 'collectionobjects',
      },
    },
    report: {
      messages: {
        record: {
          invokeUnsaved: {
            id: 'report.invokeUnsaved',
            defaultMessage: 'Unsaved changes!',
          },
          name: {
            id: 'report.name',
            defaultMessage: 'Report',
          },
          singleTargetMissing: {
            id: 'report.singleTargetMissing',
            defaultMessage: 'Single target missing!',
          },
        },
      },
      serviceConfig: {
        servicePath: 'reports',
      },
      title: (data) => data.getIn(['document', 'ns2:reports_common', 'name']),
    },
  },
};

const invocationDescriptor = Immutable.fromJS({
  mode: 'single',
  items: {
    1234: {
      csid: '1234',
    },
  },
});

describe('InvocationModal', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);

    Modal.setAppElement(this.container);
  });

  it('should render a modal', async function test() {
    await act(async () => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                csid={csid}
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');
    modal.should.not.equal(null);

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render nothing if isOpen is false', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationModal
              config={config}
              initialInvocationDescriptor={invocationDescriptor}
              isOpen={false}
              csid={csid}
              data={reportData}
              recordType="report"
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if data is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <InvocationModal
              config={config}
              csid={csid}
              initialInvocationDescriptor={invocationDescriptor}
              isOpen={false}
              recordType="report"
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render a title using the data', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                isRecordModified
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render title using data');

    modal.querySelector('h1').textContent.should.equal('Test Report');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render the record name as the title if no title is found in the data', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                isRecordModified
                data={Immutable.Map()}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render the record name as title');

    modal.querySelector('h1').textContent.should.equal('Report');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render a no-break space as the title if data is undefined', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                isRecordModified
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a no-break space');

    modal.querySelector('header > div').textContent.should.equal(' ');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render an unsaved warning if isRecordModified is true', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                isRecordModified
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a no-break space');

    modal.querySelector('.cspace-ui-FormStatusMessage--warning').textContent.should.equal('Unsaved changes!');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render a running message if isRunning is true', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                isRunning
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');

    modal.querySelector('p').textContent.should.contain('Running');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render a format picker if recordType is report', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');

    modal.querySelector('.cspace-ui-InvocationFormatPicker--common').should.not.equal(null);

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should not render a format picker if recordType is not report', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                recordType="batch"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');

    expect(modal.querySelector('.cspace-ui-InvocationFormatPicker--common')).to.equal(null);

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should call onInvokeButtonClick when the invoke button is clicked', async function test() {
    let invokeButtonClicked;

    const handleInvokeButtonClick = () => {
      invokeButtonClicked = true;
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                onInvokeButtonClick={handleInvokeButtonClick}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');
    const button = modal.querySelector('button[name="invoke"]');

    Simulate.click(button);

    invokeButtonClicked.should.equal(true);
    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should update the invocation descriptor when a change is committed', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');
    const dropdownMenuInput = modal.querySelector('.cspace-input-DropdownMenuInput--common');
    const input = dropdownMenuInput.querySelector('input');

    input.value = 'sing';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    input.value.should.equal('single record');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        unmountComponentAtNode(this.container);
        this.container.remove();

        resolve();
      }, 0);
    });
  });

  it('should update the invocation descriptor when a format picker value is committed', async function test() {
    let invokedDescriptor;

    const handleInvokeButtonClick = (dataArg, invocationDescriptorArg) => {
      invokedDescriptor = invocationDescriptorArg;
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                onInvokeButtonClick={handleInvokeButtonClick}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open', 'render a running message');
    const dropdownMenuInput = modal.querySelector('footer .cspace-input-DropdownMenuInput--common');
    const input = dropdownMenuInput.querySelector('input');

    input.value = 'docx';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    input.value.should.equal('MS Word (.docx)');

    const button = modal.querySelector('button[name="invoke"]');

    Simulate.click(button);

    invokedDescriptor.get('outputMIME').should.equal('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        unmountComponentAtNode(this.container);
        this.container.remove();

        resolve();
      }, 0);
    });
  });

  it('should call readRecord when opened', async function test() {
    let readRecordCalled;

    const readRecord = () => {
      readRecordCalled = true;
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={invocationDescriptor}
                csid={csid}
                isOpen={false}
                data={reportData}
                recordType="report"
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={`${csid}999`}
                initialInvocationDescriptor={invocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                readRecord={readRecord}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    readRecordCalled.should.equal(true);

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should call searchCsid when opened if the initial invocation descriptor has a single csid and no item data', async function test() {
    const singleCsidInvocationDescriptor = Immutable.Map({
      mode: 'single',
      recordType: 'collectionobject',
      csid: '1234',
    });

    let searchedConfig;
    let searchedRecordType;
    let searchedCsid;

    const searchCsid = (configArg, recordTypeArg, csidArg) => {
      searchedConfig = configArg;
      searchedRecordType = recordTypeArg;
      searchedCsid = csidArg;

      return Promise.resolve({
        data: {
          'ns2:abstract-common-list': {
            'list-item': {
              csid: '1234',
              objectNumber: '1-1234',
              uri: '/collectionobjects/1234',
            },
          },
        },
      });
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                csid={csid}
                isOpen={false}
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                searchCsid={searchCsid}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    searchedConfig.should.equal(config);
    searchedRecordType.should.equal('collectionobject');
    searchedCsid.should.equal('1234');

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');

    modal.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('1-1234');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should update the mime type when data is received', async function test() {
    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={invocationDescriptor}
                csid={csid}
                isOpen
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={invocationDescriptor}
                csid={csid}
                isOpen
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');
    const dropdownMenuInput = modal.querySelector('footer .cspace-input-DropdownMenuInput--common');
    const input = dropdownMenuInput.querySelector('input');

    input.value.should.equal('CSV');
    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should create an item containing the invocation descriptor csid if no item is found by searchCsid', async function test() {
    const singleCsidInvocationDescriptor = Immutable.Map({
      mode: 'single',
      recordType: 'collectionobject',
      csid: '1234',
    });

    const searchCsid = () => Promise.resolve({
      data: {
        'ns2:abstract-common-list': {},
      },
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                csid={csid}
                isOpen={false}
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                searchCsid={searchCsid}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');

    modal.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('1234');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should create an item containing the invocation descriptor csid if searchCsid fails', async function test() {
    const singleCsidInvocationDescriptor = Immutable.Map({
      mode: 'single',
      recordType: 'collectionobject',
      csid: '1234',
    });

    const searchCsid = () => Promise.reject();

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                csid={csid}
                isOpen={false}
                data={reportData}
                recordType="report"
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    act(() => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <InvocationModal
                config={config}
                csid={csid}
                initialInvocationDescriptor={singleCsidInvocationDescriptor}
                isOpen
                data={reportData}
                recordType="report"
                searchCsid={searchCsid}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');

    modal.querySelector('.cspace-input-ChooserInput--common > div').textContent
      .should.equal('1234');

    unmountComponentAtNode(this.container);
    this.container.remove();
  });
});
