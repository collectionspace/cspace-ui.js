/* global document, window */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';

import ConfirmRecordDeleteModal from '../../../../src/components/record/ConfirmRecordDeleteModal';
import createTestContainer from '../../../helpers/createTestContainer';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    authrole: {
      messages: {
        record: {
          name: {
            id: 'record.authrole.name',
            defaultMessage: 'Role',
          },
        },
      },
      serviceConfig: {
        serviceType: 'security',
      },
      title: () => 'Role Title',
    },
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
        servicePath: 'placeauthorities',
        serviceType: 'authority',
      },
      vocabularies: {
        local: {
          serviceConfig: {
            servicePath: 'urn:cspace:name(place)',
          },
        },
      },
      title: () => 'Place Record Title',
    },
  },
};

describe('ConfirmRecordDeleteModal', () => {
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
      </IntlProvider>, this.container,
    );

    return new Promise((resolve) => {
      window.setTimeout(() => {
        document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

        unmountComponentAtNode(this.container);

        resolve();
      }, 20);
    });
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
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render nothing if data is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <ConfirmRecordDeleteModal
          config={config}
          isOpen={false}
          recordType="group"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
    expect(document.querySelector('.ReactModal__Content--after-open')).to.equal(null);

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
      </IntlProvider>, this.container,
    );

    return new Promise((resolve) => {
      window.setTimeout(() => {
        document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
        .equal('Delete Group Record Title?');

        unmountComponentAtNode(this.container);

        resolve();
      }, 20);
    });
  });

  context('when the record type is a procedure or object', () => {
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
        </IntlProvider>, this.container,
      );

      render(
        <IntlProvider locale="en">
          <ConfirmRecordDeleteModal
            config={config}
            data={data}
            isOpen
            recordType="group"
            checkForRelations={checkForRelations}
          />
        </IntlProvider>, this.container,
      );

      return new Promise((resolve) => {
        window.setTimeout(() => {
          checkedPredicate.should.equal('affects');

          document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
            .contain('This record is related to other records');

          unmountComponentAtNode(this.container);

          resolve();
        }, 20);
      });
    });
  });

  context('when the record type is an authority', () => {
    it('should call checkForUses when opened, and render a message if it resolves to true', function test() {
      const data = Immutable.Map();

      let checkForUsesCalled = false;

      const checkForUses = () => {
        checkForUsesCalled = true;

        return Promise.resolve(true);
      };

      render(
        <IntlProvider locale="en">
          <ConfirmRecordDeleteModal
            config={config}
            data={data}
            isOpen={false}
            recordType="place"
            vocabulary="local"
            csid="1234"
          />
        </IntlProvider>, this.container,
      );

      render(
        <IntlProvider locale="en">
          <ConfirmRecordDeleteModal
            config={config}
            data={data}
            isOpen
            recordType="place"
            vocabulary="local"
            csid="1234"
            checkForUses={checkForUses}
          />
        </IntlProvider>, this.container,
      );

      return new Promise((resolve) => {
        window.setTimeout(() => {
          checkForUsesCalled.should.equal(true);

          document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
            .contain('cannot be deleted because it is used by other records');

          unmountComponentAtNode(this.container);

          resolve();
        }, 20);
      });
    });
  });

  context('when the record type is authrole', () => {
    it('should call checkForRoleUses when opened, and render a message if it resolves to true', function test() {
      const data = Immutable.Map();

      let checkForRoleUsesCalled = false;

      const checkForRoleUses = () => {
        checkForRoleUsesCalled = true;

        return Promise.resolve(true);
      };

      render(
        <IntlProvider locale="en">
          <ConfirmRecordDeleteModal
            config={config}
            data={data}
            isOpen={false}
            recordType="authrole"
            csid="1234"
          />
        </IntlProvider>, this.container,
      );

      render(
        <IntlProvider locale="en">
          <ConfirmRecordDeleteModal
            config={config}
            data={data}
            isOpen
            recordType="authrole"
            csid="1234"
            checkForRoleUses={checkForRoleUses}
          />
        </IntlProvider>, this.container,
      );

      return new Promise((resolve) => {
        window.setTimeout(() => {
          checkForRoleUsesCalled.should.equal(true);

          document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
            .contain('cannot be deleted because it is associated with user accounts');

          unmountComponentAtNode(this.container);

          resolve();
        }, 20);
      });
    });
  });

  it('should render a warning message and no prompt when the record data contains hierarchy relations', function test() {
    const data = Immutable.fromJS({
      document: {
        'rel:relations-common-list': {
          'relation-list-item': [
            {},
            {},
          ],
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
      </IntlProvider>, this.container,
    );

    return new Promise((resolve) => {
      window.setTimeout(() => {
        document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
          .not.contain('Delete Group Record Title?');

        document.querySelector('.ReactModal__Content--after-open > div > div').textContent.should
          .contain('Group Record Title cannot be deleted because it belongs to a hierarchy');

        unmountComponentAtNode(this.container);

        resolve();
      }, 20);
    });
  });

  it('should not render a delete button when the record data contains hierarchy relations', function test() {
    const data = Immutable.fromJS({
      document: {
        'rel:relations-common-list': {
          'relation-list-item': [
            {},
            {},
          ],
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
      </IntlProvider>, this.container,
    );

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(document.querySelector('.ReactModal__Content--after-open button[name="delete"]')).to
          .equal(null);

        unmountComponentAtNode(this.container);

        resolve();
      }, 20);
    });
  });
});
