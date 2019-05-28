import React from 'react';
import { connect } from 'react-redux';
import { addObject } from '../../actions';

import './style.css';

const TrackNameContainer = props => (
  <div className="column is-2 track-name-container">
    <div className="columns is-multiline">
      <div className="column is-12" style={{height: '60px'}}>
        <button className="button is-dark" onClick={() => props.addObject("hi")}><i className="fas fa-plus"/></button>
      </div>
      <div className="column is-12" style={{paddingBottom: '0', paddingTop: '0'}}>
        <div style={{borderBottom: '1px solid grey', borderTop: '1px solid grey'}}>
          Track 1
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state =>({ object: state.currentSomething });
export default connect(mapStateToProps, {addObject})(TrackNameContainer);