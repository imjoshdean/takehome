import React from 'react';

const TextInput = (props) => {
  const {
    type,
    ...rest
  } = props;

  if (type === 'textarea') {
    return (
      <textarea
        {...rest} />
    );
  }

  return (
    <input
      type={type}
      {...rest} />
  );

};

TextInput.defaultProps = {
  type: 'text'
}

export default TextInput;