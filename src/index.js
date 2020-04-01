import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './Chat';
import Auth from './Auth';

ReactDOM.render(
  <React.StrictMode>
    <Auth>

      <Chat />
    </Auth>

  </React.StrictMode>,
  document.getElementById('root')
);


