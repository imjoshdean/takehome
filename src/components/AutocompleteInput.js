import React, { Component } from 'react';
import TextInput from './TextInput';

class AutocompleteInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} />
    );
  }
}

export default AutocompleteInput;