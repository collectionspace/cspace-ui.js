import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import { getRecordTypeNameByUri } from '../../helpers/configHelpers';
import { canRelate } from '../../helpers/permissionHelpers';
import SearchToSelectModalContainer from '../../containers/search/SearchToSelectModalContainer';
import relateButtonStyles from '../../../styles/cspace-ui/RelateButton.css';

const isSingleSubject = subjects => (Array.isArray(subjects) && subjects.length === 1);

const messages = defineMessages({
  label: {
    id: 'searchToRelateModal.label',
    defaultMessage: 'Relate records',
  },
  accept: {
    id: 'searchToRelateModal.accept',
    description: 'Label of the accept selection button in the search to relate modal.',
    defaultMessage: 'Relate selected',
  },
  relating: {
    id: 'searchToRelateModal.relating',
    defaultMessage: 'Relating…',
  },
  multipleSubjectsRelated: {
    id: 'searchToRelateModal.multipleSubjectsRelated',
    description: 'Message shown when the record(s) selected in the search to relate modal were related to multiple (> 1) subject records.',
    defaultMessage: `{objectCount, plural,
      =0 {No records}
      one {# record}
      other {# records}
    } related to each of {subjectCount, number} search results.`,
  },
  title: {
    id: 'searchToRelateModal.title',
    defaultMessage: 'Relate {typeName} {query}',
  },
  errorTitle: {
    id: 'searchToRelateModal.errorTitle',
    defaultMessage: 'Can\'t Relate',
  },
});

const errorMessages = defineMessages({
  locked: {
    id: 'searchToRelateModal.error.locked',
    defaultMessage: 'Locked records are selected. Relations cannot be made to locked records.',
  },
  notPermitted: {
    id: 'searchToRelateModal.error.notPermitted',
    defaultMessage: '{name} records are selected. You are not permitted to create relations to {collectionName}.',
  },
});

const renderRelatingMessage = () => (
  <p><FormattedMessage {...messages.relating} /></p>
);

const propTypes = {
  config: PropTypes.object,
  error: PropTypes.object,
  isOpen: PropTypes.bool,
  perms: PropTypes.instanceOf(Immutable.Map),
  subjects: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        /* eslint-disable react/no-unused-prop-types */
        csid: PropTypes.string,
        recordType: PropTypes.string,
        /* eslint-enable react/no-unused-prop-types */
      })
    ),
    PropTypes.func,
  ]),
  createRelations: PropTypes.func,
  showRelationNotification: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRelationsCreated: PropTypes.func,
};

export default class SearchToRelateModal extends Component {
  constructor(props) {
    super(props);

    this.customizeSearchDescriptor = this.customizeSearchDescriptor.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.shouldShowCheckbox = this.shouldShowCheckbox.bind(this);
  }

  customizeSearchDescriptor(searchDescriptor) {
    const {
      subjects,
    } = this.props;

    if (isSingleSubject(subjects)) {
      return searchDescriptor.setIn(['searchQuery', 'mkRtSbj'], subjects[0].csid);
    }

    return searchDescriptor;
  }

  relate(selectedItems, searchDescriptor) {
    const {
      createRelations,
      onRelationsCreated,
    } = this.props;

    if (createRelations) {
      let {
        subjects,
      } = this.props;

      if (typeof subjects === 'function') {
        subjects = subjects();
      }

      if (subjects && subjects.length > 0) {
        const objects = selectedItems.valueSeq().map(item => ({
          csid: item.get('csid'),
          recordType: searchDescriptor.get('recordType'),
        })).toJS();

        return Promise.all(subjects.map(subject => createRelations(subject, objects, 'affects')))
          .then(() => {
            if (subjects.length > 1) {
              const { showRelationNotification } = this.props;

              if (showRelationNotification) {
                showRelationNotification(messages.multipleSubjectsRelated, {
                  objectCount: objects.length,
                  subjectCount: subjects.length,
                });
              }
            }

            if (onRelationsCreated) {
              onRelationsCreated();
            }
          });
      }
    }

    return undefined;
  }

  shouldShowCheckbox(item) {
    if (item.get('workflowState') === 'locked') {
      return false;
    }

    if (item.get('related') === 'true') {
      return false;
    }

    const {
      config,
      perms,
      subjects,
    } = this.props;

    if (isSingleSubject(subjects) && item.get('csid') === subjects[0].csid) {
      return false;
    }

    return canRelate(getRecordTypeNameByUri(config, item.get('uri')), perms, config);
  }

  handleAccept(selectedItems, searchDescriptor) {
    return this.relate(selectedItems, searchDescriptor);
  }

  render() {
    const {
      error,
      /* eslint-disable no-unused-vars */
      subjects,
      createRelations,
      showRelationNotification,
      onRelationsCreated,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    if (this.props.isOpen && error) {
      return (
        <Modal
          isOpen
          showCancelButton={false}
          title={<h1><FormattedMessage {...messages.errorTitle} /></h1>}
          onAcceptButtonClick={this.props.onCancelButtonClick}
          onCloseButtonClick={this.props.onCloseButtonClick}
        >
          <FormattedMessage {...errorMessages[error.code]} values={error.values} />
        </Modal>
      );
    }

    return (
      <SearchToSelectModalContainer
        acceptButtonClassName={relateButtonStyles.common}
        acceptButtonLabel={<FormattedMessage {...messages.accept} />}
        customizeSearchDescriptor={this.customizeSearchDescriptor}
        titleMessage={messages.title}
        renderAcceptPending={renderRelatingMessage}
        shouldShowCheckbox={this.shouldShowCheckbox}
        onAccept={this.handleAccept}
        {...remainingProps}
      />
    );
  }
}

SearchToRelateModal.propTypes = propTypes;
