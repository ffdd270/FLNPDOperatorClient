import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import socketio from 'socket.io-client';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

const socket = socketio.connect('http://localhost:3000');
(() => {
    socket.emit('init', { name: 'bella' });

    socket.on('welcome', (msg) =>
    {
        console.log(msg);
    });
})();

serviceWorker.unregister();
