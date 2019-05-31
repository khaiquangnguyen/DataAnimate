import React from 'react';
import { connect } from 'react-redux';
import BluePrintIcon from './BluePrintIcon'

const BluePrintContainer = function (props) {
    const content_el = [];
    var new_el;
    Object.keys(props.blueprints).forEach(key => {
        console.log(props.blueprints);
        new_el = <BluePrintIcon blueprint={props.blueprints[key]}></BluePrintIcon>
        content_el.push(new_el);
    });
    return (
        <div className="panel">
            {content_el}
        </div>
    )
};
const mapStateToProps = state => ({ blueprints: state.effect_blueprints });
export default connect(mapStateToProps, null)(BluePrintContainer);