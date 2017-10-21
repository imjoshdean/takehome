import React, { Component } from 'react';
import axios from 'axios';

import AutocompleteInput from './AutocompleteInput';
import TextInput from './TextInput';

class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      to: '',
      copy: '',
      subject: '',
      body: ''
    };
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    axios.post('http://localhost:8081/email', this.state)
      .then(() => {
        debugger;
      });
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <label>
          To:
          <AutocompleteInput
            name="to"
            value={this.state.to}
            onChange={this.handleChange}
            placeholder="hr@trunkclub.com" />
        </label>
        <label>
          CC:
          <AutocompleteInput
            name="copy"
            value={this.state.copy}
            onChange={this.handleChange}
            placeholder="me@imjoshdean.com" />
        </label>
        <label>
          Subject:
          <TextInput
            name="subject"
            value={this.state.subject}
            onChange={this.handleChange}
            placeholder="Welcome To Trunk Club!"
            />
        </label>
        <label>
          Body:
          <TextInput
            name="body"
            type="textarea"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Welcome To Trunk Club!"
            />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

export default EmailForm;