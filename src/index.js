import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Component/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(<App
//         headerTitle = "welcome!"
//         contentTitle = "Stranger, "
//         contentBody = "Welcome to example app!"
//     />, document.getElementById('root'));

serviceWorker.unregister();
