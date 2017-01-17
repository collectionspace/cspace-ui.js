import React from 'react';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/JoinedInputRow.css';

const {
  TabularCompoundInput,
} = inputComponents;

export default function JoinedInputRow(props) {
  // For now use a TabularCompoundInput just for layout.

  // TODO: This should be a separate, layout-only component not based on an input, since it
  // should have no effect on data. This works, as long as a name prop is not supplied, but
  // it's brittle, and TabularCompoundInput does extra work that's not needed.

  return (
    <TabularCompoundInput className={styles.common} {...props} name={undefined} />
  );
}

JoinedInputRow.propTypes = TabularCompoundInput.propTypes;
