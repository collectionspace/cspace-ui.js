import React from 'react';

export default function withListType(BaseComponent, listType) {
  function WithListType(props) {
    return (
      <BaseComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        listType={listType}
      />
    );
  }

  return WithListType;
}
