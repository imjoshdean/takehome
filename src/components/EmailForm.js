import React, { Component } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TextInput from './TextInput';

class EmailForm extends Component {
  render() {
    return(
      <form>
        <label>
          To:
          <AutocompleteInput 
            placeholder="hr@trunkclub.com" />
        </label>
        <label>
          CC:
          <AutocompleteInput 
            placeholder="me@imjoshdean.com" />
        </label>
        <label>
          Subject:
          <TextInput 
            placeholder="Welcome To Trunk Club!"
            />
        </label>
        <label>
          Body:
          <TextInput
            type="textarea"
            placeholder="Welcome To Trunk Club!"
            />
        </label>
      </form>
    );
  }
}

export default EmailForm;