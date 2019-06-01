import React from 'react';
import { connect } from 'react-redux';
import DefaultObjIcon from './DefaultObjIcon';
import SelectionIcon from './SelectionIcon';
import MoreObjIcon from './MoreObjIcon';
const ActionMenu = function (props) {
    const content_el = [];
    var new_el;
    // generate the generic objects, such empty selection
    new_el = <SelectionIcon />
    content_el.push(new_el);

    Object.keys(props.blueprints).forEach(key => {
        console.log(props.blueprints);
        new_el = <DefaultObjIcon blueprint={props.blueprints[key]}></DefaultObjIcon>
        content_el.push(new_el);
    });
    new_el = <MoreObjIcon />
    content_el.push(new_el);
    return (
        <div className="panel" style={{ position: 'absolute', left: '0', top: '10%' }}>
            {content_el}
        </div>
    )
};
const mapStateToProps = state => ({ blueprints: state.default_blueprints });
export default connect(mapStateToProps, null)(ActionMenu);