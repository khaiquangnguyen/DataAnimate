import React from 'react';

import './style.css';

import Track from '../Track';
import interact from "interactjs";
import {SVG_OFFSET} from "../../constants";

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
      })
  }

  dragMoveListener (event) {
    let target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  render() {
    return (
      <div id="yo" className="column is-10 track-container is-relative">
        <div id="abc" style={{position: 'absolute', height: '100%', width: '100%', zIndex: '-190', marginLeft: `${SVG_OFFSET}px`}} />
        <div id="ruler"/>
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

export default TrackContainer;