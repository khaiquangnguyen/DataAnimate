import React from 'react';

import './style.css';

import Track from '../Track';

const TrackContainer = () => (
  <div className="column is-10 track-container">
    <div className="columns is-multiline">
      <div className="column is-12" >
        <svg className="timeline" />
      </div>

      <Track />
    </div>
  </div>
);

export default TrackContainer;