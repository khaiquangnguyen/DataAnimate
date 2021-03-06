import React from 'react';
import { showMoreObjects } from "../../actions/index";
import { connect } from 'react-redux';
class MoreObjIcon extends React.Component {
    render() {
        return (
            <a className="panel-block" onClick={() => this.props.showMoreObjects()}>
                <span className="panel-icon is-marginless">
                    <i className="fas fa-chart-bar" aria-hidden="true" />
                </span>
            </a>
        )
    }
} export default connect(null, { showMoreObjects })(MoreObjIcon);
