import React from 'react';
import { connect } from 'react-redux';
import interact from "interactjs";

import './style.css';
import { BULMA_COLUMNS_OFFSET, PIXELS_PER_SECOND, SVG_OFFSET } from "../../constants";

import { reachTo } from "../../actions";
import Track from '../Track';



class TrackContainer extends React.Component {

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }
  componentDidMount() {
    interact('#ruler')
      .draggable({
        autoScroll: { container: '#yo' },
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
      x = Math.max(0, (parseFloat(target.getAttribute('data-x')) || 0) + event.dx),
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    this.props.reachTo((x + 1) / PIXELS_PER_SECOND * 1000);
    console.log(event.dx);
    // // translate the element
    // const time_stamp = this.props.currTimestamp;
    // x = time_stamp / 1000 * PIXELS_PER_SECOND - 1;
    // target.style.webkitTransform =
    //   target.style.transform =
    //   'translate(' + x + 'px, ' + y + 'px)';
    // // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  render() {
    const time_stamp = this.props.currTimestamp;
    const pixels = time_stamp / 1000 * PIXELS_PER_SECOND - 1;
    const translate = 'translate(' + pixels + 'px, ' + 0 + 'px)';
    return (
      <div id="yo" className="column is-10 track-container is-relative">
        <div id="abc" style={{ position: 'absolute', height: '100%', width: '100%', zIndex: '-190', marginLeft: `${SVG_OFFSET}px` }} />
        <div id="ruler" data-x={pixels} style={{ left: `${SVG_OFFSET + BULMA_COLUMNS_OFFSET}px`, transform: translate }} />
        <div className="columns is-multiline">
          <div className="column is-12">
            <svg className="timeline" />
          </div>

          <Track />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currTimestamp: state.curr_timestamp });

export default connect(mapStateToProps, { reachTo })(TrackContainer);