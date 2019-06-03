import React from 'react';

import './App.css'
import Timeline from "./TrackComponents/Timeline";

import { connect } from 'react-redux';
import { createObject } from '../actions';
import AttributeMenu from './AttributeComponents';
import ActionMenu from './LeftPanel/index';


function App(props) {
  return (
    <section className="hero is-fullheight is-relative">
      <div className="columns is-paddingless is-marginless is-multiline is-background-div">
        <div className="is-view-element-container is-header-container">
        </div>

        <div className="column is-four-fifths is-view-container">
          <div className="columns is-multiline">
            <div className="column is-12 is-view-element-container is-screen-container is-relative">
              <svg style={{ position: 'absolute', left: '50px' }} id="canvas" width={'90%'} height={'90%'} />
              <ActionMenu />
            </div>
            <div className="column is-12 is-view-element-container is-timeline-container">
              <Timeline />
            </div>
          </div>
        </div>
        <div className="column is-view-element-container is-menu-container">
          <AttributeMenu />
        </div>
      </div>
    </section>
  );
}

export default connect(null, { createObject })(App);
