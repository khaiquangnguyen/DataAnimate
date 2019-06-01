import React from 'react';
import { addEffect } from "../../actions/index";
import { connect } from 'react-redux';
class BluePrintIcon extends React.Component {
    render() {
        const name = this.props.blueprint.type;
        const description = this.props.blueprint.tooltips;

        return (
            <div className="panel-block" onClick={() => this.props.addEffect(this.props.blueprint)}>
                <span className="panel-icon is-marginless">
                    <i className="fas fa-mouse-pointer" aria-hidden="true" />
                </span>
                <span>
                    {name}
                </span>
                <span>
                    {description}
                </span>
            </div>
        )
    }
} export default connect(null, { addEffect })(BluePrintIcon);
