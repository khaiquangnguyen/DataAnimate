
import React from 'react';
import { connect } from 'react-redux';
import { playpauseresume, stop } from '../../../actions/index'
import PlayButton from './PlayButton'
import StopButton from './StopButton'

const TrackControlContainer = function (props) {
    return (
        <div class="field has-addons">
            <p class="control">
                <PlayButton> </PlayButton>

            </p>
            <p class="control">
                <StopButton ></StopButton>
            </p>
        </div>
    )
};
export default TrackControlContainer;

