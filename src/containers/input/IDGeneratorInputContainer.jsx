import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import withCsid from '../../enhancers/withCsid';

import {
  createID,
  readIDGenerator,
} from '../../actions/idGenerator';

import { getIDGenerator } from '../../reducers';

const { IDGeneratorInput } = inputComponents;

const columnMessages = defineMessages({
  sampleColumn: {
    id: 'idGeneratorInput.column.sample',
    description: 'Label of the number pattern sample column displayed in the ID generator dropdown.',
    defaultMessage: 'Last Generated Value',
  },
  typeColumn: {
    id: 'idGeneratorInput.column.type',
    description: 'Label of the number pattern type column displayed in the ID generator dropdown.',
    defaultMessage: 'Type',
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    idGeneratorName: idGeneratorNameProp,
    intl,
  } = ownProps;

  const idGeneratorNames = Array.isArray(idGeneratorNameProp)
    ? idGeneratorNameProp
    : idGeneratorNameProp.split(',');

  const patterns = [];

  idGeneratorNames.forEach((idGeneratorName) => {
    const idGenerator = getIDGenerator(state, idGeneratorName);

    if (idGenerator) {
      patterns.push({
        name: idGeneratorName,
        type: intl.formatMessage(idGenerator.getIn(['messages', 'type']).toJS()),
        sample: idGenerator.get('sample'),
      });
    }
  });

  return {
    patterns,
    sampleColumnLabel: intl.formatMessage(columnMessages.sampleColumn),
    typeColumnLabel: intl.formatMessage(columnMessages.typeColumn),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    generateID: (idGeneratorName, path) => {
      dispatch(createID(idGeneratorName, csid, path));
    },
    onOpen: (patterns) => {
      patterns.forEach((pattern) => {
        dispatch(readIDGenerator(pattern.name));
      });
    },
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    csid,
    idGeneratorName,
    intl,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedIDGeneratorInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(IDGeneratorInput);

const IntlizedConnectedIDGeneratorInput = injectIntl(withCsid(ConnectedIDGeneratorInput));

IntlizedConnectedIDGeneratorInput.propTypes = IDGeneratorInput.propTypes;

export default IntlizedConnectedIDGeneratorInput;
