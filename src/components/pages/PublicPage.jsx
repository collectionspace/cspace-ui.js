import React, { PropTypes } from 'react';

export default function PublicPage(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

PublicPage.propTypes = {
  children: PropTypes.node,
};
