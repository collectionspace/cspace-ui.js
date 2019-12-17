import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOptionList } from '../../reducers';
import OptionPickerInput from '../../components/record/OptionPickerInput';

const mapStateToProps = (state, ownProps) => {
  const {
    source,
  } = ownProps;

  return {
    options: getOptionList(state, source),
  };
};

const mapDispatchToProps = {};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    source,
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

const ConnectedOptionPickerInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(OptionPickerInput);

ConnectedOptionPickerInput.propTypes = {
  ...OptionPickerInput.propTypes,
  source: PropTypes.string,
};

export default ConnectedOptionPickerInput;
