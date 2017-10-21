import React from 'react';

const TextInput = (props) => {
  const {
    type,
    ...rest
  } = props;

  if (type === 'textarea') {
    return (
      <textarea
        className="form-control"
        {...rest} />
    );
  }

  return (
    <input
      type={type}
      className="form-control"
      {...rest} />
  );

};

TextInput.defaultProps = {
  type: 'text'
}

export default TextInput;