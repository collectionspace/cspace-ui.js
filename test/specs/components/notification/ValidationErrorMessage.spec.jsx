import React from 'react';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ValidationErrorMessage from '../../../../src/components/notification/ValidationErrorMessage';

import {
  ERR_MISSING_REQ_FIELD,
} from '../../../../src/constants/errorCodes';

import {
  configKey,
} from '../../../../src/helpers/configHelpers';

import {
  ERROR_KEY,
} from '../../../../src/helpers/recordDataHelpers';

const { expect } = chai;

chai.should();

const fieldDescriptor = {
  objectNumber: {
    [configKey]: {
      messages: {
        fullName: {
          id: 'objectNumber.fullName',
          defaultMessage: 'Object number full name',
        },
        name: {
          id: 'objectNumber.name',
          defaultMessage: 'Object number name',
        },
      },
    },
  },
  department: {
    [configKey]: {
      messages: {
        name: {
          id: 'department.name',
          defaultMessage: 'Department name',
        },
      },
    },
  },
  altNum: {
    [configKey]: {},
  },
};

describe('ValidationErrorMessage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a ul', function test() {
    const errors = Immutable.fromJS({
      objectNumber: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('UL');
  });

  it('should render the full name of a field if present', function test() {
    const errors = Immutable.fromJS({
      objectNumber: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('li').textContent.should.contain('Object number full name');
  });

  it('should fall back to the name of a field if full name is not present', function test() {
    const errors = Immutable.fromJS({
      department: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('li').textContent.should.contain('Department name');
  });

  it('should fall back to the id of a field if neither full name nor name are present', function test() {
    const errors = Immutable.fromJS({
      altNum: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('li').textContent.should.contain('altNum');
  });

  it('should render a list item for each error', function test() {
    const errors = Immutable.fromJS({
      objectNumber: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
      department: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
      altNum: {
        [ERROR_KEY]: {
          code: ERR_MISSING_REQ_FIELD,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    this.container.querySelectorAll('li').should.have.lengthOf(3);
  });

  it('should render nothing if there are no errors', function test() {
    const errors = null;

    render(
      <IntlProvider locale="en">
        <ValidationErrorMessage
          errors={errors}
          fieldDescriptor={fieldDescriptor}
        />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
