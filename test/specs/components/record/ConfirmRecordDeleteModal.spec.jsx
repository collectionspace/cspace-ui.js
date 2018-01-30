/* global document, window */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';

import ConfirmRecordDeleteModal from '../../../../src/components/record/ConfirmRecordDeleteModal';
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
        },
      },
      serviceConfig: {
        serviceType: 'procedure',
      },
      title: () => 'Group Record Title',
    },
    place: {
      messages: {
        record: {
          name: {
            id: 'record.place.name',
            defaultMessage: 'Place',
          },
        },
      },
      serviceConfig: {
        serviceType: 'authority',
      },
      title: () => 'Place Record Title',
    },
  },
};

describe('ConfirmRecordDeleteModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);

    Modal.setAppElement(this.container);
  });

  it('should render a modal', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
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
        <ConfirmRecordDeleteModal
          data={data}
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render nothing if data is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);
  });

  it('should render a prompt message containing the record title', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div').textContent.should
      .equal('Delete Group Record Title?');

    unmountComponentAtNode(this.container);
  });

  it('should render a prompt message containing the record title', function test() {
    const data = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div').textContent.should
      .equal('Delete Group Record Title?');

    unmountComponentAtNode(this.container);
  });

  it('should call checkForRelations when opened, and render a warning message if it resolves to true', function test() {
    const data = Immutable.Map();

    let checkedPredicate = null;

    const checkForRelations = (predicateArg) => {
      checkedPredicate = predicateArg;

      return Promise.resolve(true);
    };

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="group"
          checkForRelations={checkForRelations}
        />
      </IntlProvider>, this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        checkedPredicate.should.equal('affects');

        document.querySelector('.ReactModal__Content--after-open > div').textContent.should
          .contain('This record is related to other records');

        unmountComponentAtNode(this.container);

        resolve();
      }, 0);
    });
  });

  it('should not call checkForRelations if the record is not a procedure or object', function test() {
    const data = Immutable.Map();

    let checkForRelationsCalled = false;

    const checkForRelations = () => {
      checkForRelationsCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen={false}
          recordType="place"
        />
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="place"
          checkForRelations={checkForRelations}
        />
      </IntlProvider>, this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        checkForRelationsCalled.should.equal(false);

        unmountComponentAtNode(this.container);

        resolve();
      }, 0);
    });
  });

  it('should render a warning message and no prompt when the record data contains hierarchy relations', function test() {
    const data = Immutable.fromJS({
      document: {
        'rel:relations-common-list': {
          totalItems: '2',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open > div').textContent.should
      .not.contain('Delete Group Record Title?');

    document.querySelector('.ReactModal__Content--after-open > div').textContent.should
      .contain('Group Record Title cannot be deleted because it belongs to a hierarchy');

    unmountComponentAtNode(this.container);
  });

  it('should not render a delete button when the record data contains hierarchy relations', function test() {
    const data = Immutable.fromJS({
      document: {
        'rel:relations-common-list': {
          totalItems: '2',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          data={data}
          isOpen
          recordType="group"
        />
      </IntlProvider>, this.container);

    expect(document.querySelector('.ReactModal__Content--after-open button[name="delete"]')).to
      .equal(null);

    // unmountComponentAtNode(this.container);
  });
});
