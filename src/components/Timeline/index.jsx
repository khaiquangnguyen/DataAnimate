import React from 'react';
import * as d3 from 'd3';

import './style.css';
import { PIXELS_PER_SECOND, SVG_OFFSET } from '../../constants';

import TrackNameContainer from "../TrackNameContainer";
import TrackContainer from "../TrackContainer";


class Timeline extends React.Component {
  renderAxis = () => {
    const svg = d3.select(".timeline")
      .attr("width", PIXELS_PER_SECOND * 60 + 4 * SVG_OFFSET)
      .attr("height", 30);


    const x = d3.scaleLinear()
      .domain([0, 60000])
      .range([0, PIXELS_PER_SECOND * 60]);

    svg
      .append("g")
      .attr("transform", `translate(${SVG_OFFSET},25)`)
      .call(d3.axisTop(x).ticks(20));
  };

  componentDidMount() {
    this.renderAxis();
  }

  render() {
    return (
    <div className="hero" style={{height: '100%'}}>
      <div className="hero-body columns is-paddingless" style={{overflowY: "auto", alignItems: 'start'}}>
        <TrackNameContainer  />
        <TrackContainer  />
      </div>
    </div>
    )
  }

};

export default Timeline;