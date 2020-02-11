import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import socketio from 'socket.io-client';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import BattleHome from "./components/routes/battle_home";

ReactDOM.render(
<Router>
    <Route path="/list" component={App}/>
    <Route path="/battle" component={BattleHome}/>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



serviceWorker.unregister();
