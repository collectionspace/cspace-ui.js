import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { getUploadType } from '../../reducers';
import { setUploadType } from '../../actions/prefs';

const { UploadInput } = inputComponents;

const messages = defineMessages({
  typeInputLabel: {
    id: 'UploadInputContainer.typeInputLabel',
    defaultMessage: 'Upload',
  },
  fileOptionLabel: {
    id: 'UploadInputContainer.fileOptionLabel',
    defaultMessage: 'local file',
  },
  urlOptionLabel: {
    id: 'UploadInputContainer.urlOptionLabel',
    defaultMessage: 'external media',
  },
  fileInputLabel: {
    id: 'UploadInputContainer.fileInputLabel',
    defaultMessage: 'File',
  },
  fileChooseButtonLabel: {
    id: 'UploadInputContainer.fileChooseButtonLabel',
    defaultMessage: 'Select…',
  },
  urlInputLabel: {
    id: 'UploadInputContainer.urlInputLabel',
    defaultMessage: 'URL',
  },
  fileInfo: {
    id: 'UploadInputContainer.fileInfo',
    defaultMessage: '{name} ({type}, {size, number} bytes)',
  },
});

const mapStateToProps = (state) => ({
  type: getUploadType(state),
});

const mapDispatchToProps = {
  onTypeChanged: setUploadType,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    intl,
    ...remainingOwnProps
  } = ownProps;

  const intlProps = {
    typeInputLabel: intl.formatMessage(messages.typeInputLabel),
    fileOptionLabel: intl.formatMessage(messages.fileOptionLabel),
    urlOptionLabel: intl.formatMessage(messages.urlOptionLabel),
    fileInputLabel: intl.formatMessage(messages.fileInputLabel),
    fileChooseButtonLabel: intl.formatMessage(messages.fileChooseButtonLabel),
    urlInputLabel: intl.formatMessage(messages.urlInputLabel),
    formatFileInfo: (name, type, size) => intl.formatMessage(
      messages.fileInfo, { name, type, size },
    ),
  };

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
    ...intlProps,
  };
};

export const ConnectedUploadInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(UploadInput);

const IntlizedUploadInput = injectIntl(ConnectedUploadInput);

IntlizedUploadInput.propTypes = UploadInput.propTypes;

export default IntlizedUploadInput;
