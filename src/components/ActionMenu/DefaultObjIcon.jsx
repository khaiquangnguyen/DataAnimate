import React from 'react';
import { connect } from 'react-redux';
import { createObject } from '../../actions';

class DefaultObjIcon extends React.Component {
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
} export default connect(null, { createObject })(DefaultObjIcon);
