import React from 'react';

import PlayButton from './PlayButton'
import StopButton from './StopButton'
import {BULMA_COLUMNS_OFFSET, TIMELINE_HEIGHT} from "../../../constants";

const TrackControlContainer = function (props) {
    return (
        <div class="field has-addons">
            <p class="control">
                <PlayButton> </PlayButton>

            </p>
            <p className="control">
                <StopButton />
            </p>
        </div>
    )
};


export default TrackControlContainer;

