import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import validate from 'validate.js';

import EmailForm from './components/EmailForm';
import registerServiceWorker from './registerServiceWorker';

validate.validators.emailList = (value, options, key, attributes)  => {
  const emails = value.split(', ');
  // Borrowed from https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emails.every((email) => emailRegex.test(email));
};



ReactDOM.render(<EmailForm />, document.getElementById('root'));
registerServiceWorker();
