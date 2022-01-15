import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import get from 'lodash/get';
import { components as inputComponents } from 'cspace-input';
import withConfig from '../../enhancers/withConfig';
import withCsid from '../../enhancers/withCsid';
import withRecordType from '../../enhancers/withRecordType';

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
    config,
    source,
    intl,
  } = ownProps;

  const {
    idGeneratorTransform: transform,
  } = config;

  const idGeneratorNames = Array.isArray(source) ? source : source.split(',');
  const patterns = [];

  idGeneratorNames.forEach((idGeneratorName) => {
    const idGenerator = getIDGenerator(state, idGeneratorName);

    if (idGenerator) {
      const sample = idGenerator.get('sample');

      patterns.push({
        name: idGeneratorName,
        type: intl.formatMessage(idGenerator.getIn(['messages', 'type']).toJS()),
        sample: transform ? transform(sample) : sample,
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
    config,
    csid,
    recordType,
  } = ownProps;

  const {
    idGeneratorTransform: transform,
  } = config;

  return {
    generateID: (idGeneratorName, path) => {
      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      dispatch(createID(recordTypeConfig, idGeneratorName, csid, path, transform));
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
    config,
    csid,
    source,
    intl,
    recordType,
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
  mergeProps,
)(IDGeneratorInput);

const IntlizedConnectedIDGeneratorInput = injectIntl(
  withCsid(withConfig(withRecordType(ConnectedIDGeneratorInput))),
);

IntlizedConnectedIDGeneratorInput.propTypes = IDGeneratorInput.propTypes;

export default IntlizedConnectedIDGeneratorInput;
