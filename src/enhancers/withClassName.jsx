import React from 'react';

export default function withClassName(BaseComponent, className) {
  function WithClassName(props) {
    return (
      <BaseComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={className}
      />
    );
  }

  return WithClassName;
}
