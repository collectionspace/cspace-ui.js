import React, { PropTypes } from 'react';
import Header from '../sections/Header';

export default function ProtectedPage(props) {
  const {
    username,
    children,
  } = props;

  return (
    <div>
      <Header username={username} />

      {children}
    </div>
  );
}

ProtectedPage.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};
