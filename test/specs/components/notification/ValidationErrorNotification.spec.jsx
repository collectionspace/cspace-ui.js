import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import Notification from '../../../../src/components/notification/Notification';
import ValidationErrorMessage from '../../../../src/components/notification/ValidationErrorMessage';
import ValidationErrorNotification from '../../../../src/components/notification/ValidationErrorNotification';

import {
  ERR_MISSING_REQ_FIELD,
} from '../../../../src/constants/errorCodes';

import {
  configKey,
} from '../../../../src/helpers/configHelpers';

import {
  ERROR_KEY,
} from '../../../../src/helpers/recordDataHelpers';

const expect = chai.expect;

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
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: fieldDescriptor,
    },
  },
};

const errors = Immutable.fromJS({
  objectNumber: {
    [ERROR_KEY]: {
      code: ERR_MISSING_REQ_FIELD,
    },
  },
});

describe('ValidationErrorNotification', function suite() {
  it('should render as a Notification containing a ValidationErrorMessage child', function test() {
    const context = {
      config,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ValidationErrorNotification
        id="test"
        errors={errors}
        recordType="collectionobject"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Notification);

    const children = result.props.children;

    children.type.should.equal(ValidationErrorMessage);

    children.props.errors.should.equal(errors);
    children.props.fieldDescriptor.should.equal(fieldDescriptor);
  });

  it('should render nothing if no errors are provided', function test() {
    const context = {
      config,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ValidationErrorNotification
        id="test"
        recordType="collectionobject"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });
});
