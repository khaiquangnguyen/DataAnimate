import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { rootReducer } from "./reducers";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { scene } from './lib/Scene';
export const store = createStore(rootReducer, scene.export_state(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
