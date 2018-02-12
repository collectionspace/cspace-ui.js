/* global document, window */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import ConfirmRecordUnrelateModal from '../../../../src/components/record/ConfirmRecordUnrelateModal';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

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

describe('ConfirmRecordUnrelateModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);

    Modal.setAppElement(this.container);
  });

  it('should render a modal', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
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
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if isMultiSelect is false and data is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);

    unmountComponentAtNode(this.container);
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
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render a prompt message containing the record title', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
      .equal('Unrelate Group Record Title from the primary record?');

    unmountComponentAtNode(this.container);
  });

  it('should render a prompt message containing the record count if isMultiSelect is true', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isMultiSelect
          isOpen
          recordCount={4}
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
      .equal('Unrelate 4 selected records from the primary record?');

    unmountComponentAtNode(this.container);
  });

  it('should render an unrelating message if isUnrelating is true', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordUnrelateModal
          config={config}
          data={data}
          isOpen
          isUnrelating
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
      .equal('Unrelating...');

    unmountComponentAtNode(this.container);
  });
});
