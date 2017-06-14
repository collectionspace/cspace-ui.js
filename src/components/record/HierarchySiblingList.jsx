import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import AutocompleteInputContainer from '../../containers/input/AutocompleteInputContainer';
import styles from '../../../styles/cspace-ui/HierarchySiblingList.css';


const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  parentCsid: PropTypes.string,
  recordType: PropTypes.string,
  title: PropTypes.node,
  findResult: PropTypes.instanceOf(Immutable.Map),
  findRelations: PropTypes.func,
};

export default class HierarchySiblingList extends Component {
  componentDidMount() {
    this.findRelations();
  }

  componentDidUpdate(prevProps) {
    const {
      parentCsid,
    } = this.props;

    const {
      parentCsid: prevParentCsid,
    } = prevProps;

    if (parentCsid !== prevParentCsid) {
      this.findRelations();
    }
  }

  findRelations() {
    const {
      config,
      parentCsid,
      recordType,
      findRelations,
    } = this.props;

    if (parentCsid && findRelations) {
      const subject = {
        recordType,
      };

      const object = {
        recordType,
        csid: parentCsid,
      };

      findRelations(config, subject, object, 'hasBroader');
    }
  }

  render() {
    const {
      csid,
      findResult,
      title,
    } = this.props;

    let siblings;

    if (findResult) {
      const list = findResult.get('ns2:relations-common-list') || findResult.get('ns3:relations-common-list');

      let items = list.get('relation-list-item');

      if (items) {
        if (!Immutable.List.isList(items)) {
          items = Immutable.List.of(items);
        }

        items = items
          .filter(item => item.getIn(['subject', 'csid']) !== csid)
          .sort((itemA, itemB) =>
            itemA.getIn(['subject', 'number']).localeCompare(itemB.getIn(['subject', 'number'])));

        const lastIndex = items.size - 1;

        siblings = items.map((item, index) => {
          const subject = item.get('subject');

          return (
            <li key={subject.get('csid')}>
              <AutocompleteInputContainer
                source=""
                value={subject.get('refName')}
                readOnly
              />{index < lastIndex ? ', ' : ''}
            </li>
          );
        }).toJS();
      }
    }

    return (
      <div className={styles.common}>
        <header>{title}</header>
        <ul>
          {siblings}
        </ul>
      </div>
    );
  }
}

HierarchySiblingList.propTypes = propTypes;
