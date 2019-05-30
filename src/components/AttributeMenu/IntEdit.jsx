import React from 'react';
import { editAttribute } from "../../actions/index";
import { connect } from 'react-redux';




const IntEdit = function (props) {
    return (<><label> {props.attribute.key}</label> <input type="text" value={props.attribute.desc.value} onChange={(event) => {
        props.editAttribute(props.attribute.key, event.target.value)
    }} /></>);
}

export default connect(null, { editAttribute })(IntEdit);
