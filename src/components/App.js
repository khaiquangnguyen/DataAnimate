import React from 'react';

import './App.css'
import Timeline from "./Timeline";

import { connect } from 'react-redux';
import { createObject } from '../actions';
import AttributeMenu from './AttributeMenu';
import ActionMenu from './ActionMenu/index';
import TrackControlContainer from './TrackControlContainer';
function App(props) {
  return (
    <section className="hero is-fullheight is-relative">
      <div className="columns is-paddingless is-marginless is-multiline is-background-div">
        <div className="is-view-element-container is-header-container">
          <button className="button is-dark" onClick={() => props.createObject()}>Library</button>
        </div>

        <div className="column is-10 is-view-container">
          <div className="columns is-multiline">
            <div className="column is-12 is-view-element-container is-screen-container is-relative">
              <svg id="canvas" width={960} height={540} />
              <div className="columns is-vcentered is-multiline"
                style={{ height: '100%', width: '5%', margin: '0 0 0 -12px' }}>
                <ActionMenu></ActionMenu>
                <TrackControlContainer></TrackControlContainer>
                {/* <div style={{ position: 'absolute', background: 'red', bottom: '12px', width: '100%', justifyContent: 'center', display: 'flex' }} >
                  <button className="button is-dark">Library</button>
                  <button className="button is-dark">Library</button>
                  <button className="button is-dark">Library</button>
                </div> */}
              </div>

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
