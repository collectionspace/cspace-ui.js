import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import merge from 'lodash/merge';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordFormSelector from '../../../../src/components/record/RecordFormSelector';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.collectionobject.default.name',
              defaultMessage: 'Default Template',
            },
          },
          template: <div />,
        },
        inventory: {
          messages: {
            name: {
              id: 'form.collectionobject.inventory.name',
              defaultMessage: 'Inventory Template',
            },
          },
          template: <div />,
        },
        photo: {
          messages: {
            name: {
              id: 'form.collectionobject.photo.name',
              defaultMessage: 'Photo Template',
            },
          },
          template: <div />,
        },
      },
    },
    group: {
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.group.default.name',
              defaultMessage: 'Default Template',
            },
          },
          template: <div />,
        },
        other: {
          disabled: true,
          messages: {
            name: {
              id: 'form.group.other.name',
              defaultMessage: 'Other Template',
            },
          },
          template: <div />,
        },
      },
    },
  },
};

const expectedClassName = 'cspace-ui-RecordFormSelector--common';

describe('RecordFormSelector', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={config}
          recordType="collectionobject"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={config}
          recordType="collectionobject"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render nothing if there are no forms configured for the record type', function test() {
    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={config}
          recordType="foo"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });


  it('should render nothing if only one form is enabled for the record type', function test() {
    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={config}
          recordType="group"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render a dropdown menu with an option for each form', function test() {
    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={config}
          recordType="collectionobject"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    const dropdownMenuInput = this.container.querySelector('.cspace-input-DropdownMenuInput--common');

    dropdownMenuInput.should.not.equal(null);

    const input = dropdownMenuInput.querySelector('input');

    Simulate.mouseDown(input);

    const items = dropdownMenuInput.querySelectorAll('li');

    items.should.have.lengthOf(3);

    items[0].textContent.should.equal('Default Template');
    items[1].textContent.should.equal('Inventory Template');
    items[2].textContent.should.equal('Photo Template');
  });

  it('should sort options by sortOrder', function test() {
    const sortedConfig = merge({}, config, {
      recordTypes: {
        collectionobject: {
          forms: {
            default: {
              sortOrder: 2,
            },
            inventory: {
              sortOrder: 0,
            },
            photo: {
              sortOrder: 1,
            },
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <RecordFormSelector
          config={sortedConfig}
          recordType="collectionobject"
          formName="default"
        />
      </IntlProvider>, this.container,
    );

    const dropdownMenuInput = this.container.querySelector('.cspace-input-DropdownMenuInput--common');

    dropdownMenuInput.should.not.equal(null);

    const input = dropdownMenuInput.querySelector('input');

    Simulate.mouseDown(input);

    const items = dropdownMenuInput.querySelectorAll('li');

    items.should.have.lengthOf(3);

    items[0].textContent.should.equal('Inventory Template');
    items[1].textContent.should.equal('Photo Template');
    items[2].textContent.should.equal('Default Template');
  });
});
