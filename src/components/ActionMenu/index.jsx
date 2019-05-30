import React from 'react';
import { connect } from 'react-redux';
import DefaultObjIcon from './DefaultObjIcon';
import SelectionIcon from './SelectionIcon';
const ActionMenu = function (props) {
    const content_el = [];
    var new_el;
    // generate the generic objects, such empty selection
    new_el = <SelectionIcon ></SelectionIcon>
    content_el.push(new_el);
    const content = Object.keys(props.blueprints).forEach(key => {
        console.log(props.blueprints);
        new_el = <DefaultObjIcon blueprint={props.blueprints[key]}></DefaultObjIcon>
        content_el.push(new_el);
    });
    return (
        <div className="panel">
            {content_el}
        </div>
    )
};
const mapStateToProps = state => ({ blueprints: state.default_blueprints });
export default connect(mapStateToProps, null)(ActionMenu);