import React, { PropTypes } from 'react';

export default function PublicPage(props) {
  const {
    children,
  } = props;
  
  return (
    <div>
      <div>Public</div>

      {children}
    </div>
  );
}

PublicPage.propTypes = {
  children: PropTypes.any,
};

