import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedUploadInput } from '../../../../src/containers/input/UploadInputContainer';

import {
  SET_UPLOAD_TYPE,
} from '../../../../src/actions/prefs';

chai.should();

const { UploadInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('UploadInputContainer', function suite() {
  const uploadType = 'file';

  const store = mockStore({
    prefs: Immutable.fromJS({
      uploadType,
    }),
  });

  const context = {
    store,
  };

  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: message => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on UploadInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(UploadInput);
    result.props.type.should.equal(uploadType);
    result.props.onTypeChanged.should.be.a('function');
    result.props.typeInputLabel.should.be.a('string');
    result.props.fileOptionLabel.should.be.a('string');
    result.props.urlOptionLabel.should.be.a('string');
    result.props.fileInputLabel.should.be.a('string');
    result.props.fileChooseButtonLabel.should.be.a('string');
    result.props.urlInputLabel.should.be.a('string');
    result.props.formatFileInfo.should.be.a('function');
  });

  it('should use intl to format the file info', function test() {
    let formattedValues = null;

    intl.formatMessage = (messageArg, valuesArg) => {
      formattedValues = Object.assign({}, valuesArg);

      return `formatted ${messageArg.id}`;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    const fileName = 'foo.jpg';
    const fileType = 'image/jpeg';
    const fileSize = 1024;

    result.props.formatFileInfo(fileName, fileType, fileSize).should
      .equal('formatted UploadInputContainer.fileInfo');

    formattedValues.should.deep.equal({
      name: fileName,
      type: fileType,
      size: fileSize,
    });
  });

  it('should connect onTypeChanged to setUploadType action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedUploadInput
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const newType = 'url';

    result.props.onTypeChanged(newType);

    const actions = store.getActions();

    actions.should.have.lengthOf(1);

    actions[0].should.deep.equal({
      type: SET_UPLOAD_TYPE,
      payload: newType,
    });
  });
});
