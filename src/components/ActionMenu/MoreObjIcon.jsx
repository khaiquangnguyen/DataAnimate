import React from 'react';
import { showMoreObjects } from "../../actions/index";
import { connect } from 'react-redux';
class MoreObjIcon extends React.Component {
    render() {
        return (
            <div className="panel-block" onClick={() => this.props.showMoreObjects()}>
                <span className="panel-icon is-marginless">
                    <i className="fas fa-mouse-pointer" aria-hidden="true" />
                </span>
            </div>
        )
    }
} export default connect(null, { showMoreObjects })(MoreObjIcon);
