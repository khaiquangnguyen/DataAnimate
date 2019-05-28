import React from 'react';

import interact from "interactjs";

import { SVG_OFFSET } from "../../constants";
import './style.css';

class Track extends React.Component {
  initiateInteractJS() {
    interact('#interact-test')
      .draggable({
        onmove: this.dragMoveListener,
        startAxis: 'x',
        lockAxis: 'x',
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          })
        ]
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true},

        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 1 },
          }),
        ],

        //inertia: true
      })
      .on('resizemove', function (event) {
        let target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      });
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

  componentDidMount() {
    this.initiateInteractJS();
  }

  render() {
    //TODO add a is-last-track check for bottom border rendering
    return (
      <div className="column is-12 track">
        <div className="track-border" style={{height: '1em', width: '100%', marginLeft: `${SVG_OFFSET}px`}}>
          <div id="interact-test"/>
        </div>
      </div>
    )
  }
}





export default Track;