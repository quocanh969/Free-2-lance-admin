import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducers/reducer';
import { Provider } from 'react-redux';


export const MyStore = createStore(
  reducer,
  applyMiddleware(
      thunkMiddleware,
  )
)

ReactDOM.render(
  <Provider store={MyStore}>
      <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
