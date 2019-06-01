import React from 'react';
import { connect } from 'react-redux';
import { stop } from '../../../actions/index'
class StopButton extends React.Component {

    handleClick() {
        this.props.stop();
    }
    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button className="button is-dark" onClick={(e) => this.handleClick(e)}>
                <span class="icon is-small">
                    <i class="fas fa-stop"></i>
                </span>
            </button>
        );
    }
}
export default connect(null, { stop })(StopButton);
