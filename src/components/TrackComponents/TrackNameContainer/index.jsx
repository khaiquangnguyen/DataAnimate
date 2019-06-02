import React from 'react';

import './style.css';
import TrackControlContainer from '../TrackControlContainer';
import {BULMA_COLUMNS_OFFSET, TIMELINE_HEIGHT, TRACK_HEIGHT} from "../../../constants";

{/*<<<<<<< HEAD*/}
{/*const TrackNameContainer = props => (*/}
{/*  <div className="column is-2 track-name-container">*/}
{/*    <div className="columns is-multiline">*/}
{/*      <div className="column is-12" style={{ height: `${TIMELINE_HEIGHT + 5.5 + 2 * BULMA_COLUMNS_OFFSET}px` }}>*/}
{/*        <TrackControlContainer />*/}

{/*      </div>*/}
{/*      <div className="column is-12">*/}
{/*        <div className="level" style={{ height: `${TRACK_HEIGHT}px`, borderBottom: '1px solid grey', borderTop: '1px solid grey' }}>*/}
{/*          <div className="level-left">*/}
{/*            Track 1*/}
{/*          </div>*/}
{/*          <div className="level-right">*/}
{/*            <a className="delete-button">*/}
{/*              <span className="icon is-small">*/}
{/*                <i className="fas fa-trash" />*/}
{/*              </span>*/}
{/*              </a>*/}
{/*          </div>*/}
{/*=======*/}
class TrackNameContainer extends React.Component {
  render() {
    let content_els = [];
    this.props.objs.forEach(obj => {
      let new_el = (
        <div className="column is-12" style={{ paddingBottom: '0', paddingTop: '0' }}>
          <div style={{ borderBottom: '1px solid grey', borderTop: '1px solid grey' }}>
            {obj.name.value}
          </div>
        </div>
      );
      content_els.push(new_el);
    });
    return (
      <div className="column is-2 track-name-container">
        <div className="columns is-multiline">
          <div className="column is-12" style={{ height: '60px' }}>
            <TrackControlContainer />
          </div>
          {content_els}

>>>>>>> f08f937ec6df89c9cb7c56e887061888c29efa64
        </div>
      </div >
    )
  }
};

export default TrackNameContainer;