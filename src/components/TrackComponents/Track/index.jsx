import React from 'react';

import interact from "interactjs";

import {PIXELS_PER_SECOND, TRACK_HEIGHT} from "../../../constants";
import { SVG_OFFSET } from "../../../constants";
import { connect } from 'react-redux';
import { edit_effect_stack, setObject } from '../../../actions/index'
import './style.css';

class Track extends React.Component {

    dragMoveListener = (event) => {
        let target = event.target,
            x = Math.max(0, (parseFloat(target.getAttribute('data-x')) || 0) + event.dx),
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        this.props.edit_effect_stack((x) / PIXELS_PER_SECOND * 1000, this.props.obj.effect_stacks[0].duration);
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    componentDidMount = () => {
        const self = this;
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
                edges: { left: true, right: true },

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
                target.style.height = event.rect.height + 'px';
                let duration = event.rect.width / PIXELS_PER_SECOND * 1000;

                self.props.edit_effect_stack(self.props.obj.effect_stacks[0].start_time, duration);
                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            });
    }

    render() {
        //TODO add a is-last-track check for bottom border rendering
        const time_stamp = (this.props.obj.effect_stacks[0].start_time);
        const duration = (this.props.obj.effect_stacks[0].duration);
        const pixels = time_stamp / 1000 * PIXELS_PER_SECOND - 1;
        const translate = 'translate(' + pixels + 'px, ' + 0 + 'px)';

        return (
            <div className="column is-12 track" onMouseOver={() => {
                this.props.setObject(this.props.obj.reference_object.value);

            }}>
                <div className="track-border" style={{ height: `${TRACK_HEIGHT}px`, width: `${PIXELS_PER_SECOND * this.props.duration / 1000}px`, marginLeft: `${SVG_OFFSET}px` }}>
                    <div id="interact-test" style={{ transform: translate, width: `${PIXELS_PER_SECOND * duration / 1000}px` }} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({ duration: state.duration });
export default connect(mapStateToProps, { edit_effect_stack, setObject })(Track);