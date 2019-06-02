import React from 'react';
import { connect } from 'react-redux';
import interact from "interactjs";
import $ from 'jquery';

import './style.css';
import { BULMA_COLUMNS_OFFSET, PIXELS_PER_SECOND, SVG_OFFSET } from "../../../constants";

import { reachTo } from "../../../actions";
import Track from '../Track';

class TrackContainer extends React.Component {
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
    $("#scrollSync1").scroll(function () {
      $("#scrollSync2").scrollTop($(this).scrollTop());
    });
  }

  dragMoveListener = (event) => {
    let target = event.target,
      x = Math.max(0, (parseFloat(target.getAttribute('data-x')) || 0) + event.dx),
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    this.props.reachTo((x + 1) / PIXELS_PER_SECOND * 1000);
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  render() {
    const time_stamp = this.props.currTimestamp;
    const pixels = time_stamp / 1000 * PIXELS_PER_SECOND - 1;
    const translate = 'translate(' + pixels + 'px, ' + 0 + 'px)';

    let content_els = [];
    this.props.objs.forEach(obj => {
      let new_el = (
        <Track obj={obj} />

      );
      content_els.push(new_el);
    });

    return (
      <div id="yo" className="column is-10 track-container is-relative">
        <div id="abc" style={{ position: 'absolute', height: '100%', width: '100%', zIndex: '-190', marginLeft: `${SVG_OFFSET}px` }} />
        <div id="ruler" data-x={pixels} style={{ left: `${SVG_OFFSET + BULMA_COLUMNS_OFFSET}px`, transform: translate }} />
        <div className="columns is-multiline">
          <div className="column is-12">
            <svg className="timeline" />
          </div>

              <div id="scrollSync1" style={{height: '230px', width: '100%', overflow: 'auto'}}>
                {content_els}
              </div>


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currTimestamp: state.curr_timestamp });

export default connect(mapStateToProps, { reachTo })(TrackContainer);