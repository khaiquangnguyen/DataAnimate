import React from 'react';

import {connect} from "react-redux";
import {deleteObject} from "../../../actions";
import {TRACK_HEIGHT} from "../../../constants";

const TrackLabel = props => {
  return(
  <div className="column is-12">
    <div className="level" style={{ height: `${TRACK_HEIGHT}px`, borderBottom: '1px solid grey', borderTop: '1px solid grey' }}>
      <div className="level-left">
        {props.obj.name.value}
      </div>
      <div className="level-right">
        <a className="delete-button" >
                <span className="icon is-small">
                  <i className="fas fa-trash" onClick={() => props.deleteObject(props.obj.reference_object.value)}/>
                </span>
        </a>
      </div>
    </div>
  </div>
)
};

export default connect(null, { deleteObject })(TrackLabel);