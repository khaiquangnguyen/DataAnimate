import React from 'react';

import './style.css';
import TrackControlContainer from '../TrackControlContainer';

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

        </div>
      </div >
    )
  }
};

export default TrackNameContainer;