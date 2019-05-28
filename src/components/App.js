import React from 'react';

import './App.css'
import MenuItem from "./MenuItem";
import Timeline from "./Timeline";

function App() {
  return (
    <section className="hero is-fullheight is-relative">
      <div className="columns is-paddingless is-marginless is-multiline is-background-div">
        <div className="column is-12 is-view-element-container is-header-container">
          <div className="columns is-centered" data-controls="dropdown-menu">
            <button className="button is-dark">Library</button>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">
                  Dropdown item
                </a>
                <a className="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" className="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" className="dropdown-item">
                  Other dropdown item
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-10 is-view-container">
          <div className="columns is-multiline">
            <div className="column is-12 is-view-element-container is-screen-container">
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
