import React from 'react';
import { connect } from 'react-redux';
import $ from "jquery";

import './style.css';
import {BULMA_COLUMNS_OFFSET, TIMELINE_HEIGHT, TRACK_HEIGHT} from "../../../constants";

import TrackControlContainer from '../TrackControlContainer';
import TrackLabel from "./TrackLabel";


class TrackNameContainer extends React.Component {
  componentDidMount() {
    $("#scrollSync2").scroll(function () {
      $("#scrollSync1").scrollTop($(this).scrollTop());
    });
  }

  render() {
    let content_els = [];
    this.props.objs.forEach(obj => {
      let new_el = (
        <TrackLabel obj={obj} />
      );
      content_els.push(new_el);
    });
    return (
      <div className="column is-2 track-name-container">
        <div className="columns is-multiline">
          <div className="column is-12" style={{ height: `${TIMELINE_HEIGHT + 5.5 + 2 * BULMA_COLUMNS_OFFSET}px` }}>
            <TrackControlContainer />
          </div>
              <div  id="scrollSync2" style={{height: '230px', width: '100%', overflow: 'auto'}}>
                {content_els}
              </div>
        </div>
      </div >
    )
  }
}

export default TrackNameContainer;