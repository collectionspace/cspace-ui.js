import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import RecordForm from './RecordForm';
import { getCsid } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/MiniView.css';

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  intl: intlShape,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  readRecord: PropTypes.func,
};

const messages = defineMessages({
  authority: {
    id: 'miniView.authority',
    description: 'For authority items, the record type and vocabulary displayed next to the title.',
    defaultMessage: '({recordType} - {vocabulary})',
  },
});

export default class MiniView extends Component {
  componentDidMount() {
    this.initRecord();
  }

  componentDidUpdate(prevProps) {
    const {
      csid,
    } = this.props;

    const {
      csid: prevCsid,
    } = prevProps;

    if (csid !== prevCsid) {
      this.initRecord();
    }
  }

  initRecord() {
    const {
      csid,
      readRecord,
    } = this.props;

    if (csid && readRecord) {
      readRecord();
    }
  }

  renderTitle() {
    const {
      config,
      intl,
      recordType,
      vocabulary,
      data,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];
    const title = recordTypeConfig.title(data, { config, intl });

    if (!title) {
      return <h3><br /></h3>;
    }

    const csid = getCsid(data);
    const path = ['/record', recordType, vocabulary, csid].filter((part) => !!part).join('/');

    let secondary;
    if (vocabulary) {
      const values = {
        recordType: <FormattedMessage {...recordTypeConfig.messages.record.name} />,
        vocabulary: <FormattedMessage
          {...recordTypeConfig.vocabularies[vocabulary].messages.name}
        />,
      };

      secondary = (
        <span className={styles.secondaryTitle}>
          <FormattedMessage {...messages.authority} values={values} />
        </span>
      );
    }

    return (
      <h3>
        <Link to={path}>{title}</Link>
        {secondary}
      </h3>
    );
  }

  render() {
    const {
      vocabulary,
      ...remainingProps
    } = this.props;

    const {
      config,
      recordType,
    } = this.props;

    const className = vocabulary ? styles.authority : styles.procedure;
    const recordTypeConfig = config.recordTypes[recordType];

    return (
      <div className={className}>
        {this.renderTitle()}
        <RecordForm
          readOnly
          formName="mini"
          recordTypeConfig={recordTypeConfig}
          vocabulary={vocabulary}
          {...remainingProps}
        />
      </div>
    );
  }
}

MiniView.propTypes = propTypes;
