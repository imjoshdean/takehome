import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EmailForm from './components/EmailForm';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<EmailForm />, document.getElementById('root'));
registerServiceWorker();
