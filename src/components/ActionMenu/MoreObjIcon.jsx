import React from 'react';
import { editAttribute } from "../../actions/index";
import { connect } from 'react-redux';

class MoreObjIcon extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <a className="panel-block" onClick={() => this.props.createObject(this.props.blueprint)}>
                <span className="panel-icon is-marginless">
                    <i className="fas fa-book" aria-hidden="true" />
                </span>
            </a>
        )
    }
} export default connect(null, { createObject })(MoreObjIcon);
