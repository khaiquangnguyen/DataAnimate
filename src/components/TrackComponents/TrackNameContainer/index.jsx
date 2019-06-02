import React from 'react';

import './style.css';
import TrackControlContainer from '../TrackControlContainer';
import {BULMA_COLUMNS_OFFSET, TIMELINE_HEIGHT, TRACK_HEIGHT} from "../../../constants";
import $ from "jquery";

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
        <div className="column is-12">
          <div className="level" style={{ height: `${TRACK_HEIGHT}px`, borderBottom: '1px solid grey', borderTop: '1px solid grey' }}>
            <div className="level-left">
              {obj.name.value}
            </div>
            <div className="level-right">
              <a className="delete-button">
                <span className="icon is-small">
                  <i className="fas fa-trash" />
                </span>
              </a>
            </div>
          </div>
        </div>
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
};

export default TrackNameContainer;