import React from 'react';
import { connect } from 'react-redux';
import { emptySelection } from '../../actions';

class SelectionIcon extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <a className="panel-block" onClick={() => this.props.emptySelection()}>
                <span className="panel-icon is-marginless">
                    <i className="fas fa-book" aria-hidden="true" />
                </span>
            </a>
        )
    }
} export default connect(null, { emptySelection })(SelectionIcon);
