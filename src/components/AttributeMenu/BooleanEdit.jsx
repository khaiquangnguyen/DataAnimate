import React from 'react';
import { editAttribute } from "../../actions/index";
import { connect } from 'react-redux';




// const IntEdit = function (props) {
//     return (<><label> {props.attribute.key}</label>
//         <input type="text" value={props.attribute.desc.value} pattern="[0-9]*" onChange={(event) => {
//             props.editAttribute(props.attribute.key, event.target.value)
//         }} /></>);
// }

class BooleanEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.editAttribute(this.props.attribute.key, 1 - event.target.value)
    }


    render() {
        return (<><label> {this.props.attribute.key}</label>
            <input type="checkbox" value={this.props.attribute.desc.value} checked={this.props.attribute.desc.value === 1} onChange={this.handleChange} /></>);
    }
}

export default connect(null, { editAttribute })(BooleanEdit);
