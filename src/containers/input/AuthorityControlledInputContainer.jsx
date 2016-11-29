import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import warning from 'warning';
import parseAuthoritySpec from '../../helpers/parseAuthoritySpec';
import AuthorityControlledInput from '../../components/input/AuthorityControlledInput';

import {
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../actions/partialTermSearch';

import withRecordPlugins from '../../enhancers/withRecordPlugins';
import { getPartialTermSearchMatches } from '../../reducers';

const mapStateToProps = state => ({
  matches: getPartialTermSearchMatches(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    authority,
    recordPlugins,
  } = ownProps;

  const authorities = parseAuthoritySpec(authority);

  return {
    addTerm: (authorityName, vocabularyName, displayName) => {
      const recordType = recordPlugins[authorityName];

      warning(recordType, `The authority record type '${authorityName}' is not configured. Check the authority prop of the input with name '${ownProps.name}'.`);

      if (recordType) {
        const serviceConfig = recordType.serviceConfig;

        if (
          serviceConfig &&
          serviceConfig.vocabularies &&
          serviceConfig.vocabularies[vocabularyName]
        ) {
          dispatch(addTerm(serviceConfig, vocabularyName, displayName));
        }
      }
    },
    findMatchingTerms: (partialTerm) => {
      authorities.forEach((authoritySpec) => {
        const {
          authorityName,
          vocabularyName,
        } = authoritySpec;

        const recordType = recordPlugins[authorityName];

        warning(recordType, `The authority record type '${authorityName}' is not configured. Check the authority prop of the input with name '${ownProps.name}'.`);

        if (recordType) {
          const serviceConfig = recordType.serviceConfig;

          if (
            serviceConfig &&
            serviceConfig.vocabularies &&
            serviceConfig.vocabularies[vocabularyName]
          ) {
            dispatch(findMatchingTerms(serviceConfig, vocabularyName, partialTerm));
          }
        }
      });
    },
    onClose: () => {
      dispatch(clearMatchedTerms());
    },
  };
};

export const ConnectedAuthorityControlledInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorityControlledInput);

const IntlAwareConnectedAuthorityControlledInput =
  injectIntl(withRecordPlugins(ConnectedAuthorityControlledInput));

IntlAwareConnectedAuthorityControlledInput.propTypes = {
  ...AuthorityControlledInput.propTypes,
  authority: PropTypes.string.isRequired,
  recordPlugins: PropTypes.object,
};

export default IntlAwareConnectedAuthorityControlledInput;
