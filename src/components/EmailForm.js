import React, { Component } from 'react';
import axios from 'axios';
import validate from 'validate.js';

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
      body: '',
      errorMessage: ''
    };

    this.stateValidation = {
      to: {
        email: true
      },
      copy: {
        emailList: true
      },
      subject: {
        presence: {
          allowEmpty: false
        }
      },
      body: {
        presence: {
          allowEmpty: false
        }
      }
    };
  }

  setMessage(message, error=false) {
    const state = {};
    state[error ? 'errorMessage' : 'successMessage'] = message;
    this.setState(state);

    setTimeout(() => {
      this.setState({
        errorMessage: '',
        successMessage: ''
      })
    }, 5000);
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    if (!validate(this.state, this.stateValidation)) {
      axios.post('http://localhost:8081/email', this.state)
        .then((response) => {
          this.setState({
            to: '',
            copy: '',
            subject: '',
            body: ''
          })
          this.setMessage('Email sent successfully!');
        })
        .catch((error) => {
          this.setMessage(error.response.data.message, true);
        });
    }
  }

  handleChange(ev, value, name) {
    this.setState({
      [name || ev.target.name]: value || ev.target.value
    });
  }

  render() {
    return(
      <form
        className="EmailForm"
        onSubmit={this.handleFormSubmit}>
          {this.state.errorMessage && <p className="alert alert-danger">{this.state.errorMessage}</p>}
          {this.state.successMessage && <p className="alert alert-success">{this.state.successMessage}</p>}
          <div className="form-group">
            <label>
              To:
            </label>
            <AutocompleteInput
              name="to"
              value={this.state.to}
              maxValues={1}
              onChange={this.handleChange}
              placeholder="hr@trunkclub.com" />
          </div>
          <div className="form-group">
            <label>
              CC:
            </label>
            <AutocompleteInput
              name="copy"
              value={this.state.copy}
              onChange={this.handleChange}
              placeholder="me@imjoshdean.com" />
          </div>
          <div className="form-group">
            <label>
              Subject:
            </label>
            <TextInput
              name="subject"
              autoComplete="off"
              value={this.state.subject}
              onChange={this.handleChange}
              placeholder="Welcome To Trunk Club!"
              />
          </div>
          <div className="form-group">
            <label>
              Body:
            </label>
            <TextInput
              name="body"
              type="textarea"
              rows="6"
              value={this.state.body}
              onChange={this.handleChange}
              placeholder="Welcome To Trunk Club!"
              />
          </div>
          <input type="submit" />
      </form>
    );
  }
}

export default EmailForm;