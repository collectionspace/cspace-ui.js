import React from 'react';

export default function ProtectedPage(props) {
  return (
    <div>
      <div>Protected: {props.username}</div>
    
      {props.children}
    </div>
  );
};

ProtectedPage.propTypes = {
  username: React.PropTypes.string.isRequired,
};
