import React from 'react';

import './style.css';

const TrackNameContainer = () => (
  <div className="column is-2 track-name-container">
    <div className="columns is-multiline">
      <div className="column is-12" style={{height: '60px'}}>
        <button className="button is-dark"><i className="fas fa-plus"/></button>
      </div>
      <div className="column is-12" style={{paddingBottom: '0', paddingTop: '0'}}>
        <div style={{borderBottom: '1px solid grey', borderTop: '1px solid grey'}}>
          Track 1
        </div>
      </div>
    </div>
  </div>
);

export default TrackNameContainer;