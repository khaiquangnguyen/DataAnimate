import React from 'react';
import { connect } from 'react-redux';
import { playpauseresume, stop } from '../../actions/index';
import { scene_action } from '../../lib/Scene';
class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.word = 'PLAY';
    }

    handleClick() {
        this.props.playpauseresume();
    }
    render() {
        switch (this.props.current_action) {
            case scene_action.PLAY:
                this.word = 'PAUSE';
                break;
            case scene_action.PAUSE:
                this.word = 'RESUME';
                break;
            case scene_action.STOP:
                this.word = 'PLAY';
                break;
            default:
                this.word = 'PAUSE';
                break;
        }
        console.log(this.word);
        // This syntax ensures `this` is bound within handleClick
        return (
            <button className="button is-dark" onClick={(e) => this.handleClick(e)}>
                {this.word}
            </button>
        );
    }
}
const mapStateToProps = state => ({ current_action: state.current_action });
export default connect(mapStateToProps, { playpauseresume })(PlayButton);
