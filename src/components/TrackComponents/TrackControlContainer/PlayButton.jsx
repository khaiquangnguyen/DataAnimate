import React from 'react';
import { connect } from 'react-redux';
import { playpauseresume } from '../../../actions/index';
import { scene_action } from '../../../lib/Scene';
class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.word = 'PLAY';
        this.icon = 'fa-play';
    }

    handleClick() {
        this.props.playpauseresume();
    }
    render() {
        switch (this.props.current_action) {
            case scene_action.PLAY:
                this.word = 'PAUSE';
                this.icon = 'fa-pause';

                break;
            case scene_action.PAUSE:
                this.word = 'RESUME';
                this.icon = 'fa-play';
                break;
            case scene_action.STOP:
                this.word = 'PLAY';
                this.icon = 'fa-play';
                break;
            default:
                this.word = 'PAUSE';
                this.icon = 'fa-pause';
                break;
        }
        console.log(this.word);
        // This syntax ensures `this` is bound within handleClick
        return (
            <button className="button is-dark" onClick={(e) => this.handleClick(e)}>
                <span class="icon is-small">
                    <i class={"fas " + this.icon} ></i>
                </span>
            </button>
        );
    }
}
const mapStateToProps = state => ({ current_action: state.current_action });
export default connect(mapStateToProps, { playpauseresume })(PlayButton);
