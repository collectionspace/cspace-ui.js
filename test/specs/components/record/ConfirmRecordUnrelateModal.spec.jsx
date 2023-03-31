/* global document */

import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import ConfirmRecordUnrelateModal from '../../../../src/components/record/ConfirmRecordUnrelateModal';
import createTestContainer from '../../../helpers/createTestContainer';
import asyncQuerySelector from '../../../helpers/asyncQuerySelector';
import { asyncRender, render } from '../../../helpers/renderHelpers';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    group: {
      messages: {
        record: {
          name: {
            id: 'record.group.name',
            defaultMessage: 'Group',
          },
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
      },
      title: () => 'Group Record Title',
    },
  },
};

function tryQuery(queryString, resolve, reject, attempt) {
  if (attempt * 50 > 1000) {
    reject();
  }

  setTimeout(() => {
    // console.log(`query #${attempt} for ${queryString}`);
    const result = document.querySelector(queryString);
    if (result) {
      // console.log(`found it ${result}`);
      resolve(result);
    }

    // console.log(`is null ? ${result}`);
    tryQuery(queryString, resolve, reject, attempt + 1);
  }, 50);
}

function query(queryString) {
  return new Promise((resolve, reject) => {
    tryQuery(queryString, resolve, reject, 0);
  });
}

describe('ConfirmRecordUnrelateModal', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);

    Modal.setAppElement(this.container);
  });

  afterEach(function after() {
    unmountComponentAtNode(this.container);
    this.container.remove();
    this.container = null;
  });

  it('should render a modal', async function test() {
    const data = Immutable.Map();

    await asyncRender(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    const modal = await asyncQuerySelector(document, '.ReactModal__Content--after-open');
    modal.should.not.equal(null);
  });

  it('should render nothing if isOpen is false', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          data={data}
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if isMultiSelect is false and data is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if isMultiSelect is true and recordCount is zero', function test() {
    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          isOpen={false}
          recordCount={0}
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render a prompt message containing the record title', async function test() {
    const data = Immutable.Map();

    await asyncRender(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    const modal = await query('.ReactModal__Content--after-open > div > div');
    modal.textContent.should.equal('Unrelate Group Record Title from the primary record?');
  });

  it('should render a prompt message containing the record count if isMultiSelect is true', async function test() {
    const data = Immutable.Map();

    await asyncRender(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isMultiSelect
          isOpen
          recordCount={4}
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    const modal = await query('.ReactModal__Content--after-open > div > div');
    modal.textContent.should.equal('Unrelate 4 selected records from the primary record?');
  });

  it('should render an unrelating message if isUnrelating is true', async function test() {
    const data = Immutable.Map();

    await asyncRender(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          isUnrelating
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    // todo: this or query on confirm record unrelate div?
    const modal = await query('.ReactModal__Content--after-open > div > div');
    modal.textContent.should.equal('Unrelating...');
  });
});
