import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedUploadInput } from '../../../../src/containers/input/UploadInputContainer';

import {
  SET_UPLOAD_TYPE,
} from '../../../../src/constants/actionCodes';

chai.should();

const { UploadInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('UploadInputContainer', () => {
  const uploadType = 'file';

  const store = mockStore({
    prefs: Immutable.fromJS({
      uploadType,
    }),
  });

  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: (message) => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on UploadInput', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        store={store}
        intl={intl}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, UploadInput);

    input.props.type.should.equal(uploadType);
    input.props.onTypeChanged.should.be.a('function');
    input.props.typeInputLabel.should.be.a('string');
    input.props.fileOptionLabel.should.be.a('string');
    input.props.urlOptionLabel.should.be.a('string');
    input.props.fileInputLabel.should.be.a('string');
    input.props.fileChooseButtonLabel.should.be.a('string');
    input.props.urlInputLabel.should.be.a('string');
    input.props.formatFileInfo.should.be.a('function');
  });

  it('should use intl to format the file info', () => {
    let formattedValues = null;

    intl.formatMessage = (messageArg, valuesArg) => {
      formattedValues = { ...valuesArg };

      return `formatted ${messageArg.id}`;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        store={store}
        intl={intl}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, UploadInput);

    const fileName = 'foo.jpg';
    const fileType = 'image/jpeg';
    const fileSize = 1024;

    input.props.formatFileInfo(fileName, fileType, fileSize).should
      .equal('formatted UploadInputContainer.fileInfo');

    formattedValues.should.deep.equal({
      name: fileName,
      type: fileType,
      size: fileSize,
    });
  });

  it('should connect onTypeChanged to setUploadType action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        store={store}
        intl={intl}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, UploadInput);
    const newType = 'url';

    input.props.onTypeChanged(newType);

    const actions = store.getActions();

    actions.should.have.lengthOf(1);

    actions[0].should.deep.equal({
      type: SET_UPLOAD_TYPE,
      payload: newType,
    });
  });
});
