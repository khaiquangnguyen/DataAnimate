import React from 'react';

import './App.css'
import MenuItem from "./MenuItem";
import Timeline from "./Timeline";

function App() {
  return (
    <section className="hero is-fullheight is-relative">
      <div className="columns is-paddingless is-marginless is-multiline is-background-div">
        <div className="is-view-element-container is-header-container">
            <button className="button is-dark">Library</button>
        </div>

        <div className="column is-10 is-view-container">
          <div className="columns is-multiline">
            <div className="column is-12 is-view-element-container is-screen-container is-relative">
              <div className="columns is-vcentered is-multiline"
                   style={{height: '100%', width: '5%', margin: '0 0 0 -12px'}}>
                <div className="panel">
                  <a className="panel-block">
                    <span className="panel-icon is-marginless">
                      <i className="fas fa-book" aria-hidden="true"/>
                    </span>
                  </a>
                  <a className="panel-block">
                    <span className="panel-icon is-marginless">
                      <i className="fas fa-book" aria-hidden="true"/>
                    </span>
                  </a>
                  <a className="panel-block">
                    <span className="panel-icon is-marginless">
                      <i className="fas fa-book" aria-hidden="true"/>
                    </span>
                  </a>
                  <a className="panel-block">
                    <span className="panel-icon is-marginless">
                      <i className="fas fa-book" aria-hidden="true"/>
                    </span>
                  </a>
                </div>
                <div style={{position: 'absolute', background: 'red', bottom: '12px', width: '100%', justifyContent: 'center', display: 'flex' }} >
                  <button className="button is-dark">Library</button>
                  <button className="button is-dark">Library</button>
                  <button className="button is-dark">Library</button>
                </div>
              </div>

            </div>
            <div className="column is-12 is-view-element-container is-timeline-container">
              <Timeline/>
            </div>
          </div>
        </div>
        <div className="column is-view-element-container is-menu-container">
          <MenuItem/>
        </div>
      </div>
    </section>
  );
}

export default App;
