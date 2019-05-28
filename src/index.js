import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {objectReducer, objectReducer2} from "./reducers/objectReducer";

class Scene {
  constructor(duration) {
    this.duration = duration;
    this.actors = [];
  }

  add_object(type, self=this) {
    this.actors.push(type);
  }

  export_state(self=this) {
    return { scene: this, currentSomething: self.actors }
  }
}

const test_scene = new Scene(0);
const init_state = test_scene.export_state();
const store = createStore({objectReducer, objectReducer2}, init_state,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  , document.getElementById('root'));

// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'Read the docs'
// });

console.log(store.getState())
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
