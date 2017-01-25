import React from 'react';

export default function withListType(BaseComponent, listType) {
  function WithListType(props) {
    return (
      <BaseComponent
        {...props}
        listType={listType}
      />
    );
  }

  return WithListType;
}
