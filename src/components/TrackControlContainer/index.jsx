
import React from 'react';
import { connect } from 'react-redux';
import { playpauseresume, stop } from '../../actions/index'
import PlayButton from './PlayButton'
import StopButton from './StopButton'

const TrackControlContainer = function (props) {
    return (
        <div style={{ position: 'absolute', bottom: '12px', width: '100%', justifyContent: 'center', display: 'flex' }}>
            <PlayButton> </PlayButton>
            <StopButton ></StopButton>
        </div>
    )
};
export default TrackControlContainer;

