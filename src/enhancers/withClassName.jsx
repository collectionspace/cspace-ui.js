import React from 'react';

export default function withClassName(BaseComponent, className) {
  function WithClassName(props) {
    return (
      <BaseComponent
        {...props}
        className={className}
      />
    );
  }

  return WithClassName;
}
