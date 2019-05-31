import React from 'react';
import { connect } from 'react-redux';
import { playpauseresume, stop } from '../../actions/index'
class StopButton extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        this.props.stop();
    }
    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <>
                <button className="button is-dark" onClick={(e) => this.handleClick(e)}>
                    Stop
                </button>
            </>
        );
    }
}
export default connect(null, { stop })(StopButton);
