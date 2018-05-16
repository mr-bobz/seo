/*
    Main App, client entry point
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './css/index.css';
import 'carbon-components/css/carbon-components.css';

render(<App />, document.getElementById('root'));
