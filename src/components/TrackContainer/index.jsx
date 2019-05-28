import React from 'react';


import './style.css';

import Track from '../Track';
import {connect} from "react-redux";
import {addObject} from "../../actions";

const TrackContainer = props => (
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