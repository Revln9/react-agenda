import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Agenda from './agenda/agenda.js'
import Agenda2 from './agenda/agenda2.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Agenda/>, document.getElementById('root'));
registerServiceWorker();
