import React, { PropTypes } from 'react';

export default function ProtectedPage(props) {
  const {
    username,
    children,
  } = props;

  return (
    <div>
      <div>Protected: {username}</div>

      {children}
    </div>
  );
}

ProtectedPage.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};
