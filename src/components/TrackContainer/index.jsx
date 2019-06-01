import React from 'react';
import { connect } from 'react-redux';
import interact from "interactjs";

import './style.css';
import {BULMA_COLUMNS_OFFSET, PIXELS_PER_SECOND, SVG_OFFSET} from "../../constants";

import { reachTo } from "../../actions";
import Track from '../Track';



class TrackContainer extends React.Component {

  componentDidMount() {
    interact('#ruler')
      .draggable({
        autoScroll: {container: '#yo'},
        onmove: this.dragMoveListener,
        startAxis: 'x',
        lockAxis: 'x',
        modifiers: [
          interact.modifiers.restrict({
            restriction: document.getElementById('abc'),
          })
        ]
      });
  }

  dragMoveListener = (event) => {
    let target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = Math.max(0, (parseFloat(target.getAttribute('data-x')) || 0) + event.dx),
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    this.props.reachTo((x + 1) / PIXELS_PER_SECOND * 1000);
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  render() {
    return (
      <div id="yo" className="column is-10 track-container is-relative">
        <div id="abc" style={{position: 'absolute', height: '100%', width: '100%', zIndex: '-190', marginLeft: `${SVG_OFFSET}px`}} />
        <div id="ruler" style={{left: `${SVG_OFFSET + BULMA_COLUMNS_OFFSET}px`}}/>
        <div className="columns is-multiline">
          <div className="column is-12">
            <svg className="timeline"/>
          </div>

          <Track/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currTimestamp: state.scene.curr_timestamp });

export default connect(mapStateToProps, { reachTo })(TrackContainer);